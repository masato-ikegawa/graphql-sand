import { Item } from "../domain/item.entity";

export class ItemRepository {
  private data: Item[] = Array.from({ length: 50 }, (_, i) => ({
    id: String(i + 1),
    text: `Item ${i + 1}`,
  }));

  fetch(first: number, after?: string) {
    let start = 0;
    if (after) {
      const index = this.data.findIndex((i) => i.id === after);
      if (index >= 0) {
        start = index + 1;
      }
    }
    const items = this.data.slice(start, start + first);
    const hasNextPage = start + first < this.data.length;
    return { items, hasNextPage };
  }
}
