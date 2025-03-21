import { ApiResponseData, Item, ItemDetails } from "../../DTOtypes";
export declare const getProductDetailProps: (data: ApiResponseData) => ItemDetails;
export declare const getProductListProps: (data: ApiResponseData) => {
    items: Array<Item>;
    query: string;
};
