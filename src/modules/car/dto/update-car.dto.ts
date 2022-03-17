import { PartialType } from '@nestjs/mapped-types'
import { IsMongoId, IsNotEmpty } from 'class-validator'
import { CreateCarDto } from './create-car.dto'

export class UpdateCarDto extends PartialType(CreateCarDto) {
  @IsMongoId()
  @IsNotEmpty()
  id: string
}
