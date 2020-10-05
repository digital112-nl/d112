import {
  Controller,
  Get,
  Returns,
  ContentType,
  PathParams,
  ReturnsArray
} from '@tsed/common';
import {
  Inject
} from '@tsed/di';
import {
  MongooseModel
} from '@tsed/mongoose';
import {
  Report
} from '../emergency/Report';
import {
  ReportMessage
} from '../emergency/ReportMessage';

@Controller("/reports")
export class ReportsController {
  @ContentType("application/json")
  @Inject(Report)
  private reportModel: MongooseModel < Report > ;

  @ReturnsArray(Report)
  @Get()
  findAll() {
    return this.reportModel.find()
      .populate('messages')
      .exec();
  }

  @Get("/:id")
  @Returns(Report)
  findOne(@PathParams("id") id: string) {
    return this.reportModel.findById(id)
      .populate('messages')
      .exec();
  }

  @ReturnsArray(ReportMessage)
  @Get("/:id/messages")
  async findAllMessages(@PathParams("id") id: string) {
    console.log(`${id}`)
    const report = await this.reportModel.findById(id)
      .populate('messages')
      .exec();

    return report.messages;
  }
}