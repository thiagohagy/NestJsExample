import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class CreateCarInput {
  @Field()
  plate: string

  @Field()
  year: number
}
