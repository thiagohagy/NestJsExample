import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { UploadModule } from 'src/common/helpers/upload/upload.module'
import { CarController } from './car.controller'
import { CarListener } from './car.listenner'
import { Car, CarSchema } from './car.schema'
import { CarService } from './car.service'
import { CarResolver } from './car.resolver'

@Module({
  imports: [
    UploadModule,
    MongooseModule.forFeatureAsync([
      {
        name: Car.name,
        useFactory: () => {
          const schema = CarSchema
          schema.pre<Car>('save', function (next) {
            // doesn't work with arrow functions
            console.log('pre save car hook')

            this.plateHash = `##${this.plate}##`
            console.log(this)

            next()
          })
          return schema
        },
        // schema: CarSchema,
      },
    ]),
    CarModule,
  ],
  controllers: [CarController],
  providers: [CarService, CarListener, CarResolver],
})
export class CarModule {}
