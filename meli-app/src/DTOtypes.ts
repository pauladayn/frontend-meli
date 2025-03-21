// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericItem = Record<string, any>;
type CategoryDTO = {
  id: string;
  name: string;
  type: string;
  values: Array<{ [key: string]: string }>;
}

type ImageDetails = {
  id: string;
  url: string;
  secure_url: string;
  size: string;
  max_size: string;
  quality: string;
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
  detail_image?: ImageDetails;
  condition: string;
  free_shipping: boolean;
  seller_address: string;
};

type Author = {
  name: string;
  lastname: string;
}

type ItemsList = {
  author: Author;
  items: Array<Item>;
  categories?: Array<string>;
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

type BaseApiResponse = Partial<{
  loggedIn: boolean;
  query: string;
  categories: Array<string>;
}>;
interface ApiListResponse extends Partial<BaseApiResponse>, ItemsList {
  type: 'list';
}

interface ApiDetailResponse extends Partial<BaseApiResponse>, ItemDetails {
  type: 'detail';
}

type ApiResponseData = ApiListResponse | ApiDetailResponse;

export type { Author, GenericItem, CategoryDTO, ItemsList, Item, ItemDetails, ItemDescription, SearchResponseData, ApiResponseData }