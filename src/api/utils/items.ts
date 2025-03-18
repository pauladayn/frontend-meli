import { CategoryDTO, GenericItem, ItemsList, ItemDescription, ItemDetails, Item } from "../types";
import { AUTHOR, DECIMALS_QUANTITY } from "./constants";

const sanitizeCategories = (filters: CategoryDTO[]): Array<string> =>
  filters.map(filter =>
    Array.isArray(filter.values)
      ? filter.values.find(value => value.name)?.name || ""
      : filter.name || ""
  );

const sanitizeItem = <T extends GenericItem>(
  item: T,
  filters?: CategoryDTO[]
): Item => ({
  id: item.id,
  title: item.title,
  price: {
    amount: item.price,
    currency: item.currency_id,
    decimals: DECIMALS_QUANTITY,
  },
  picture: item.thumbnail || "",
  condition: item.condition || "",
  free_shipping: item.shipping.free_shipping || false,
  categories: filters ? sanitizeCategories(filters) : [item.category_id],
});

const sanitizeItemsList = <T extends GenericItem>(items: T[], filters: CategoryDTO[]): ItemsList => ({
  author: AUTHOR,
  items: items.map((item) => sanitizeItem(item, filters))

});

const sanitizeItemDetails = <T extends GenericItem>(singleItem: T, itemDescription: ItemDescription): ItemDetails => ({
  author: AUTHOR,
  item: { ...sanitizeItem(singleItem), description: itemDescription.plain_text, sold_quantity: singleItem.sold_quantity }
})

export { sanitizeItemsList, sanitizeItemDetails };