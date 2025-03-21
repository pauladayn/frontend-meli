import { SearchResponseData } from "../../DTOtypes";
import getCategory from "../services/Category";
import { searchItems, getItem, getItemDescription } from "../services/Item";
import { sanitizeItemsList, sanitizeItemDetails, sanitizeCategories } from "../utils/items";

export const getCategoryPath = async (categoryId: string): Promise<Array<{ [key: string]: string }>> => {
    if (!categoryId) return [];
    const category = await getCategory(categoryId);
    return category?.path_from_root ?? [];
};
export const searchResponseHandler = async (searchTerm: string): Promise<SearchResponseData> => {
    const { results, filters } = await searchItems(searchTerm);
    const categoryId = filters?.[0]?.values?.[0]?.id;
    const path_from_root: Array<{ [key: string]: string }> = await getCategoryPath(categoryId);

    const sanitized = sanitizeItemsList(results, [...filters, ...path_from_root]);

    return {
        ...sanitized,
        query: searchTerm,
    };

}

export const itemDetailResponseHandler = async (itemId: string) => {
    const itemData = await getItem(itemId);
    const itemDescription = await getItemDescription(itemId);
  
 
    const path_from_root = await getCategoryPath(itemData.category_id);
  
    const detail = sanitizeItemDetails(itemData, itemDescription);
  
    return {
      ...detail,
      categories: sanitizeCategories(path_from_root),
    };
  };