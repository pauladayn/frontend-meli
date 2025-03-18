import { AUTHOR, DECIMALS_QUANTITY } from "./constants";

type GenericItem = Record<string, any>;
type CategoryDTO = {
  id: string;
  name: string;
  type: string;
  values: Array<{ [key: string]: string }>;
}

type SanitizedItem = {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  categories: string[];
};

type Author = {
  name: string;
  lastname: string;
}

type SanitizedItems = {
  author: Author;
  items: SanitizedItem[];
};

type SanitizedItemDetails = {
  author: Author;
  item: SanitizedItem & {
    sold_quantity: number;
    description: string;
  };
}

const sanitizeCategories = (filters: CategoryDTO[]): Array<string> =>
  filters.map(filter =>
    Array.isArray(filter.values)
      ? filter.values.find(value => value.name)?.name || ""
      : filter.name || ""
  );


const sanitizeItemsList = <T extends GenericItem>(items: T[], filters: CategoryDTO[]): SanitizedItems => {
  return {
    author: AUTHOR,
    items: items.map((item) => ({
      id: item.id,
      title: item.title,
      price: { amount: item.price, currency: item.currency_id, decimals: DECIMALS_QUANTITY },
      picture: item.thumbnail || "",
      condition: item.condition || "unknown",
      free_shipping: item.shipping.free_shipping || false,
      categories: sanitizeCategories(filters),
    })),
  };
};

const sanitizeItemDetails = <T extends GenericItem>(singleItem: T): SanitizedItemDetails => ({
  author: AUTHOR,
  item: {
    id: singleItem.id,
    title: singleItem.title,
    price: { amount: singleItem.price, currency: singleItem.currency_id, decimals: DECIMALS_QUANTITY },
    picture: singleItem.thumbnail || "",
    condition: singleItem.condition || "unknown",
    free_shipping: singleItem.shipping.free_shipping || false,
    categories: singleItem.category_id,
    description: '',
    sold_quantity: singleItem.sold_quantity || 0,
  }
})

export { sanitizeItemsList, sanitizeItemDetails };