import { IsDefined, IsNotEmpty, IsString, Length } from 'class-validator'

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  @IsDefined()
  plate: string

  @IsNotEmpty()
  @IsString()
  @IsDefined()
  @Length(4, 4)
  year: number
}
