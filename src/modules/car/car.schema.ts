import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CarDocument = Document & Car

@Schema()
export class Car {
  @Prop({ required: true })
  plate: string

  @Prop()
  plateHash: string

  @Prop({ required: true })
  year: number

  @Prop({ required: true })
  cdate: Date
}

export const CarSchema = SchemaFactory.createForClass(Car)
