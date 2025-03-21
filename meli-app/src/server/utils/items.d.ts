import { CategoryDTO, GenericItem, ItemsList, ItemDescription, ItemDetails } from "../../DTOtypes";
export declare const sanitizeCategories: (filters: CategoryDTO[] | Array<{
    [key: string]: string;
}>) => Array<string>;
declare const sanitizeItemsList: <T extends GenericItem>(items: T[], filters: CategoryDTO[]) => ItemsList;
declare const sanitizeItemDetails: <T extends GenericItem>(singleItem: T, itemDescription: ItemDescription) => ItemDetails;
export { sanitizeItemsList, sanitizeItemDetails };
