import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Item {
  @Field(() => ID)
  id!: string;

  @Field()
  text!: string;

  @Field()
  name!: string;

  @Field()
  address!: string;
}
