import { ApiResponseData, Item, ItemDetails } from "../../types";

export const getProductDetailProps=(data: ApiResponseData): ItemDetails=>  {
  if (data.type === "detail") {
      return { author: data.author, item: data.item };
  }
  return {
      author: { name: "", lastname: "" },
      item: {
          id: "",
          title: "",
          price: {
              amount: 0,
              currency: "",
              decimals: 0,
          },
          picture: "",
          condition: "",
          free_shipping: false,
          sold_quantity: 0,
          description: "",
          seller_address: ''
      },
  };
}

export const getProductListProps =(data: ApiResponseData): {
  items: Array<Item>;
  query: string;
} =>{
  if (data.type === "list") {
      return { items: data.items, query: data.query };
  }

  return { items: [], query: data.query };
}