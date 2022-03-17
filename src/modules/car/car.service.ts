import { Injectable, Logger, NotFoundException } from '@nestjs/common'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'
import { Car, CarDocument } from './car.schema'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class CarService {
  private readonly logger = new Logger(CarService.name)

  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    private eventEmitter: EventEmitter2,
  ) {}

  create(createCarDto: CreateCarDto) {
    return this.carModel.create({ ...createCarDto, cdate: new Date() })
  }

  findAll() {
    this.eventEmitter.emit('car.listed', { teste: 'testes de event emission' })
    return this.carModel.find()
  }

  findOne(id: string) {
    return this.carModel.findById(id)
  }

  upload(file) {
    this.logger.log('on the service')
    this.logger.log(file)
  }

  async update(updateCarDto: UpdateCarDto) {
    const car = await this.findOne(updateCarDto.id)

    if (!car) throw new NotFoundException('Car not found for editing')

    return this.carModel.updateOne(
      { _id: updateCarDto.id },
      {
        $set: {
          plate: updateCarDto.plate,
          year: updateCarDto.year,
        },
      },
    )
  }

  remove(id: string) {
    return this.carModel.deleteOne({ _id: id })
  }
}
