import { BodyParams, Controller, Get, Inject, PathParams, Post, View } from '@tsed/common';
import { ReportLocationService } from '../modules/report/report-location/ReportLocationService';

const {
  BASE_URL
} = process.env;

export interface ILocationData {
  accuracy: number | null,
  altitude: number | null,
  altitudeAccuracy: number | null,
  heading: number | null,
  latitude: number | null,
  longitude: number | null,
  speed: number | null
}

@Controller('')
export class LocationController {
  @Inject(ReportLocationService)
  private reportLocationService: ReportLocationService;

  @Get('/:token')
  @View('location.ejs')
  public async getLocationPage(
    @PathParams('token') token: string
  ) {
    const locationMessage = await this.reportLocationService.getLocationMessage(token);

    return {
      url: `${BASE_URL}/location/${locationMessage.token}`
    };
  }

  @Post('/:token')
  public async saveLocation(
    @PathParams('token') token: string,
    @BodyParams() locationData: ILocationData
  ) {
    await this.reportLocationService.setLocationData(token, locationData);

    return {};
  }
}
