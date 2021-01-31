import axios from "axios";
import { cacheAdapterEnhancer } from "axios-extensions";

const cacheConfig = {
  enabledByDefault: false,
  cacheFlag: "useCache",
};

const httpClient = axios.create({
  headers: {
    "Cache-Control": "no-cache",
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter, cacheConfig),
});
export { httpClient }
