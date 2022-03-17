import { Args, Mutation, Query, Resolver } from '@nestjs/graphql'
import { CreateCarInput } from './car.inputs'
import { Car } from './car.model'
import { CarService } from './car.service'

@Resolver((of) => Car)
export class CarResolver {
  constructor(private readonly carService: CarService) {}

  @Query((returns) => [Car])
  async getCars() {
    return this.carService.findAll()
  }

  @Mutation((returns) => Car)
  async createCar(@Args('createCarData') createCarData: CreateCarInput) {
    return this.carService.create(createCarData)
  }
}
