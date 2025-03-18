import request from "./requestManager.js";
import REQUEST_METHODS from '../config/methodsDefinitions.js';
import API_URLS from '../config/apiConfig.js';

const { GET } = REQUEST_METHODS;
const { CATEGORIES } = API_URLS;

const getCategory = (id) => request(GET, `${CATEGORIES}/${id}`);

export default getCategory;
