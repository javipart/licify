import { Item } from "./items";
import { Provider } from "./provider";

export interface Propousal {
  project: string,
  provider: Provider,
  items: Item,
}