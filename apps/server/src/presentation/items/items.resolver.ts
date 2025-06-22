import { Query, Args, Resolver, Int } from '@nestjs/graphql';
import { ItemConnection } from '../../application/item.service';
import { createItemService } from '../../application/item.factory';

@Resolver()
export class ItemsResolver {
  private readonly service = createItemService();

  @Query(() => ItemConnection)
  items(
    @Args('first', { type: () => Int }) first: number,
    @Args('after', { nullable: true }) after?: string,
  ) {
    return this.service.getItems(first, after);
  }
}
