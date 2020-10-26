import { ContentType, Controller, Get, PathParams, Property, Returns, ReturnsArray } from '@tsed/common';
import { isNil } from 'lodash';
import { Inject } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Report } from './Report';
import { ReportLocation } from './report-location/ReportLocation';

export class ReportModel extends Report {
  @Property()
  public location: ReportLocation;
}

@Controller('/reports')
export class ReportController {
  @ContentType('application/json')
  @Inject(Report)
  private reportModel: MongooseModel<Report>;

  @ReturnsArray(ReportModel)
  @Get()
  findAll() {
    return this.reportModel.find()
      .populate('location')
      .select('-callMessages')
      .sort('-createdAt')
      .exec() as Promise<ReportModel[]>;
  }

  @ReturnsArray(ReportModel)
  @Get('/locations')
  async findAllWithLocation() {
    const reportWithLocations: ReportModel[] = await this.reportModel.find({
      location: { $ne: null }
    })
      .populate('location')
      .select('-callMessages')
      .sort('-createdAt')
      .exec() as ReportModel[];

    return reportWithLocations
      .filter((report) => !isNil(report.location.lon) && !isNil(report.location.lon));
  }

  @Get('/:id')
  @Returns(ReportModel)
  findOne(@PathParams('id') id: string) {
    return this.reportModel.findById(id)
      .populate('location')
      .select('-callMessages')
      .exec() as Promise<ReportModel>;
  }
}
