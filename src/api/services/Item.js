import REQUEST_METHODS from "../config/methodsDefinitions.js";
import API_URLS from "../config/apiConfig.js";
import request from "./requestManager.js";

const { GET } = REQUEST_METHODS;
const { ITEMS, SEARCH } = API_URLS;

export const searchItems = (query) =>
    request(GET, SEARCH, { params: { q: query ?? "laptop" } });

export const getItem = (id) => request(GET, `${ITEMS}/${id}`);

export const getItemDescription = (id) =>
    request(GET, `${ITEMS}/${id}/description`);
