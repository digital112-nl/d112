import { Client, Language } from '@googlemaps/google-maps-services-js';
import { Inject, Service } from '@tsed/di';
import { NotFound } from '@tsed/exceptions';
import { MongooseModel } from '@tsed/mongoose';
import { isNil } from 'lodash';
import { Document } from 'mongoose';
import { Twilio } from 'twilio';
import { ILocationData } from '../../../location/LocationController';
import Message from '../../emergency/handlers/speech/messages/Message';
import { Report, ReportMode } from '../Report';
import { ReportCallMessageService } from '../report-call-message/ReportCallMessageService';
import { ReportService } from '../ReportService';
import { ReportLocation } from './ReportLocation';

const {
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_MESSAGING_PHONE_NUMBER,
  BASE_URL,
  GOOGLE_API_TOKEN
} = process.env;


@Service()
export class ReportLocationService {
  public isDisabled: boolean = isNil(TWILIO_ACCOUNT_SID) || isNil(TWILIO_AUTH_TOKEN);
  @Inject(ReportService)
  private reportService: ReportService;
  private client: Twilio = this.isDisabled ? null : new Twilio(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
  private googleClient = new Client({});

  @Inject(ReportCallMessageService)
  private reportCallMessageService: ReportCallMessageService;
  @Inject(ReportLocation)
  private reportLocationModel: MongooseModel<ReportLocation>;

  constructor() {
  }

  public async sendLocationMessage(report: Report & Document) {
    const location = await new this.reportLocationModel({
      report: report._id
    } as ReportLocation)
      .save();

    if (
      isNil(TWILIO_MESSAGING_PHONE_NUMBER) ||
      `${TWILIO_MESSAGING_PHONE_NUMBER || ''}`.trim() === '' ||
      report.caller === 'client:Anonymous'
    ) {
      console.log(`Not sending SMS message... Location url is: ${BASE_URL}/location/${location.token}`);
    } else {
      setTimeout(() => this.client.messages.create({
        body: `Click this url to share your location with the operator: ${BASE_URL}/location/${location.token}`,
        from: TWILIO_MESSAGING_PHONE_NUMBER,
        to: report.caller
      }), 4000);
    }

    report.location = location;
    await report.save();
    this.reportService.updateReport(report);

    return location;
  }

  public async getLocationMessage(token: string) {
    const reportLocation = await this.reportLocationModel.findOne({
      token
    });

    if ( isNil(reportLocation) ) {
      throw new NotFound('Report not found...');
    }

    return reportLocation;
  }

  public async setLocationData(
    token: string,
    {
      latitude,
      longitude,
      accuracy
    }: ILocationData
  ) {
    const locationMessage = await this.getLocationMessage(token);

    locationMessage.lat = latitude;
    locationMessage.lon = longitude;
    locationMessage.accuracy = accuracy;
    await locationMessage.save();

    // Update report mode to questionnaire
    await this.reportService.setReportMode(await this.reportService.getReportById(locationMessage.report), ReportMode.Questionnaire);

    const geocode = await this.googleClient.reverseGeocode({
      params: {
        key: GOOGLE_API_TOKEN,
        language: Language.en,
        latlng: {
          latitude,
          longitude
        }
      }
    });

    await this.reportCallMessageService.sendMessageById(locationMessage.report, Message(`We have received your location. Your approximate location is around ${geocode.data.results[ 0 ].formatted_address}.`).toString());
  }
}
