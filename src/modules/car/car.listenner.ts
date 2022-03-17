import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'

@Injectable()
export class CarListener {
  @OnEvent('car.listed')
  handleOrderCreatedEvent(event) {
    console.log('Handler car list event')
    console.log(event)
  }
}
