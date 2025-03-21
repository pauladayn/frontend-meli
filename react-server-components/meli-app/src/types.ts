type GenericItem = Record<string, any>;
type CategoryDTO = {
  id: string;
  name: string;
  type: string;
  values: Array<{ [key: string]: string }>;
}

type Item = {
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
  // categories: string[];
  seller_address: string;
};

type Author = {
  name: string;
  lastname: string;
}

type ItemsList = {
  author: Author;
  items: Array<Item>;
  categories: Array<string>;
};

type ItemDetails = {
  author: Author;
  item: Item & {
    sold_quantity: number;
    description: string;
  };
}

type ItemDescription = {
  text: string;
  plain_text: string;
}

type SearchResponseData = ItemsList & {
  query: string;
}

export type { Author, GenericItem, CategoryDTO, ItemsList, Item, ItemDetails, ItemDescription, SearchResponseData }