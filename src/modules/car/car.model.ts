import { Field, ObjectType } from '@nestjs/graphql'

@ObjectType()
export class Car {
  @Field({ nullable: true })
  plate: string

  @Field({ nullable: true })
  plateHash?: string

  @Field({ nullable: true })
  year?: string

  @Field({ nullable: true })
  cdate: string
}
