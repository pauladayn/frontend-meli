import { CategoryDTO, GenericItem, ItemsList, ItemDescription, ItemDetails, Item } from "../../types";
import { AUTHOR, DECIMALS_QUANTITY } from "./constants";

export const sanitizeCategories = (filters: CategoryDTO[] | Array<{ [key: string]: string }>): Array<string> => {
  const uniqueCategories = new Set<string>();
  filters.forEach(filter => {
    if (Array.isArray(filter.values)) {
      const valueName = filter.values.find(value => value.name)?.name || "";
      if (valueName) uniqueCategories.add(valueName);
    } else {
      if (filter.name) uniqueCategories.add(filter.name);
    }
  });
  return Array.from(uniqueCategories);
};

const sanitizeItem = <T extends GenericItem>(
  item: T,
): Item => ({
  id: item.id,
  title: item.title,
  price: {
    amount: item.price,
    currency: item.currency_id,
    decimals: DECIMALS_QUANTITY,
  },
  picture: item.thumbnail || "",
  detail_image: Array.isArray(item?.pictures) && item.pictures[0] || "",
  condition: item.condition || "",
  free_shipping: item.shipping?.free_shipping || false,
  seller_address: item.address?.state_name || ''
});

const sanitizeItemsList = <T extends GenericItem>(items: T[], filters: CategoryDTO[]): ItemsList => {
  return ({
    author: AUTHOR,
    items: items.map((item) => sanitizeItem(item)),
    categories: sanitizeCategories(filters)

  })
};

const sanitizeItemDetails = <T extends GenericItem>(singleItem: T, itemDescription: ItemDescription): ItemDetails => ({
  author: AUTHOR,
  item: { ...sanitizeItem(singleItem), description: itemDescription.plain_text, sold_quantity: singleItem.sold_quantity }
})

export { sanitizeItemsList, sanitizeItemDetails };