import { ContentType, Controller, Get, PathParams, Returns, ReturnsArray } from '@tsed/common';
import { Inject } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Report } from './Report';

@Controller('/reports')
export class ReportController {
  @ContentType('application/json')
  @Inject(Report)
  private reportModel: MongooseModel<Report>;

  @ReturnsArray(Report)
  @Get()
  findAll() {
    return this.reportModel.find()
      .select('-callMessages')
      .sort('-createdAt')
      .exec();
  }

  @Get('/:id')
  @Returns(Report)
  findOne(@PathParams('id') id: string) {
    return this.reportModel.findById(id)
      .select('-callMessages')
      .exec();
  }
}
