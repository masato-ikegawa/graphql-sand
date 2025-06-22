import { ItemService } from "./item.service";
import { ItemRepository } from "../infrastructure/item.repository";

export function createItemService() {
  const repo = new ItemRepository();
  return new ItemService(repo);
}
