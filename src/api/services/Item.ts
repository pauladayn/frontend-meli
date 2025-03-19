import REQUEST_METHODS from "../config/methodsDefinitions";
import API_URLS from "../config/apiConfig";
import request from "./helpers/requestManager";
import { RESULT_LIMIT } from "../utils/constants";

const { GET } = REQUEST_METHODS;
const { ITEMS, SEARCH } = API_URLS;

export const searchItems = (query: string) =>
    request(GET, SEARCH, { params: { q: query ?? "iphone", limit: RESULT_LIMIT } });

export const getItem = (id:string) => request(GET, `${ITEMS}/${id}`);

export const getItemDescription = (id: string) =>
    request(GET, `${ITEMS}/${id}/description`);
