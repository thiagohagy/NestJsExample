import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Car, CarDocument } from './car.schema'
import { Model } from 'mongoose'
import { CarService } from './car.service'
import { CreateCarDto } from './dto/create-car.dto'
import { UpdateCarDto } from './dto/update-car.dto'
import { FileInterceptor } from '@nestjs/platform-express'

@Controller('car')
export class CarController {
  constructor(
    @InjectModel(Car.name) private carModel: Model<CarDocument>,
    private readonly carService: CarService,
  ) {}

  @Post()
  create(@Body() createCarDto: CreateCarDto) {
    return this.carService.create(createCarDto)
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file: Express.Multer.File) {
    return this.carService.upload(file)
  }

  @Get()
  findAll() {
    return this.carService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.carService.findOne(id)
  }

  @Patch()
  update(@Body() updateCarDto: UpdateCarDto) {
    return this.carService.update(updateCarDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.carService.remove(id)
  }
}
