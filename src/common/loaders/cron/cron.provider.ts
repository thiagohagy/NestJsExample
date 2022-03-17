import { Injectable, Logger } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'

@Injectable()
export class CronSchedule {
  private readonly logger = new Logger(CronSchedule.name)

  @Cron('*/1 * * * *')
  handleCron() {
    this.logger.debug('Called via cron')
  }
}
