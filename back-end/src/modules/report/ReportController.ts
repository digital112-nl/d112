import { ContentType, Controller, Get, PathParams, Returns, ReturnsArray, Req, Use } from '@tsed/common';
import { Inject } from '@tsed/di';
import { MongooseModel } from '@tsed/mongoose';
import { Report } from './Report';
import { ReportMessage } from './ReportMessage';


@Controller('/reports')
export class ReportController {
  @ContentType('application/json')
  @Inject(Report)
  private reportModel: MongooseModel<Report>;

  @ReturnsArray(Report)
  @Get()
  findAll() {
    return this.reportModel.find()
      .populate('messages')
      .sort('-createdAt')
      .exec();
  }

  @Get('/:id')
  @Returns(Report)
  findOne(@PathParams('id') id: string) {
    return this.reportModel.findById(id)
      .populate('messages')
      .exec();
  }

  @ReturnsArray(ReportMessage)
  @Get('/:id/messages')
  async findAllMessages(@PathParams('id') id: string) {
    console.log(`${id}`);
    const report = await this.reportModel.findById(id)
      .populate('messages')
      .exec();

    return report.messages;
  }
}
