import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { NextFunction, Request, Response } from 'express'

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP')

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, baseUrl } = req

    const log = `${method} to ${baseUrl}`
    console.log('Middleware Logger: ', log)

    next()
  }
}
