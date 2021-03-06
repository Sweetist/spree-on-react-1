import APP_DEFAULTS from '../constants/app-defaults';
import SpreeAPIProductAdapter from './ams-adapters/spree-api-product-adapter';

var request = require('superagent');

const ProductsAPI = {

  getList: (params = {}) => {
    let apiBase = process.env.REACT_APP_AMS_API_BASE;
    let sanitizedQueryParams = {};

    sanitizedQueryParams.page = params.page_no || 1;
    sanitizedQueryParams.per_page = APP_DEFAULTS.perPage;
    sanitizedQueryParams['q[name_cont]'] = params.searchTerm || '';

    if (params['taxonId']){
      sanitizedQueryParams.taxon_id = params.taxonId;
    }

    return request
      .get(`${ apiBase }/products`)
      .query(sanitizedQueryParams)
      .set('Accept', 'application/json')
      .then(
        (response) => {
          let processedResponse = SpreeAPIProductAdapter.processList(response.body);
          response.body = processedResponse;

          return response;
        }
      );
  },

  getItem: (productId) => {
    return request
      .get(`${process.env.REACT_APP_AMS_API_BASE}/products/` + productId)
      .set('Accept', 'application/json')
      .then(
        (response) => {
          let processedResponse = SpreeAPIProductAdapter.processItem(response.body);
          response.body = processedResponse;

          return response;
        }
      );
  }
};

export default ProductsAPI;
