import REQUEST_METHODS from "../config/methodsDefinitions.js";
import API_URLS from "../config/apiConfig.js";
import request from "./helpers/requestManager.js";
import { RESULT_LIMIT } from "../utils/constants.js";

const { GET } = REQUEST_METHODS;
const { ITEMS, SEARCH } = API_URLS;

export const searchItems = (query: string) =>
    request(GET, SEARCH, { params: { q: query ?? "iphone", limit: RESULT_LIMIT } });

export const getItem = (id:string) => request(GET, `${ITEMS}/${id}`);

export const getItemDescription = (id: string) =>
    request(GET, `${ITEMS}/${id}/description`);
