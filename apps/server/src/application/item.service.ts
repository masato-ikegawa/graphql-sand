import { Field, ObjectType } from "@nestjs/graphql";
import { Item } from "../domain/item.entity";
import { ItemRepository } from "../infrastructure/item.repository";

@ObjectType()
export class ItemEdge {
  @Field(() => Item)
  node!: Item;
  @Field()
  cursor!: string;
}

@ObjectType()
export class PageInfo {
  @Field({ nullable: true })
  endCursor?: string;
  @Field()
  hasNextPage!: boolean;
}

@ObjectType()
export class ItemConnection {
  @Field(() => [ItemEdge])
  edges!: ItemEdge[];
  @Field(() => PageInfo)
  pageInfo!: PageInfo;
}

export class ItemService {
  constructor(private readonly repo: ItemRepository) {}

  getItems(first: number, after?: string): ItemConnection {
    const { items, hasNextPage } = this.repo.fetch(first, after);
    const edges = items.map((i) => ({ node: i, cursor: i.id }));
    const endCursor =
      edges.length > 0 ? edges[edges.length - 1].cursor : undefined;
    return { edges, pageInfo: { endCursor, hasNextPage } };
  }
}
