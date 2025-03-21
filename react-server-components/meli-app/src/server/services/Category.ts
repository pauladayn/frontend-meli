import request from "./helpers/requestManager";
import REQUEST_METHODS from '../config/methodsDefinitions';
import API_URLS from '../config/apiConfig';

const { GET } = REQUEST_METHODS;
const { CATEGORIES } = API_URLS;

const getCategory = (id:string) => request(GET, `${CATEGORIES}/${id}`);

export default getCategory;
