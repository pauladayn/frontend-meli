import { SearchResponseData } from "../../DTOtypes";
export declare const getCategoryPath: (categoryId: string) => Promise<Array<{
    [key: string]: string;
}>>;
export declare const searchResponseHandler: (searchTerm: string) => Promise<SearchResponseData>;
export declare const itemDetailResponseHandler: (itemId: string) => Promise<{
    categories: string[];
    author: import("../../DTOtypes").Author;
    item: import("../../DTOtypes").Item & {
        sold_quantity: number;
        description: string;
    };
}>;
