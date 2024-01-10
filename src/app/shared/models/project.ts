import { Item } from "./items";

export interface Project {
  name?: string;
  initialDate?: string;
  finalDate?: string;
  items?: Item;
}
