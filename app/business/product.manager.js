import ProductsDAO from '../DAO/productDAO';

function create() {

  function get() {
    return ProductsDAO.getAll();
  }

  function getProductsByCategory(category) {
    return ProductsDAO.getProductsByCategory(category);
  }

  return {
    get: get,
    getProductsByCategory: getProductsByCategory,
  };
}

export default {
  create: create
};
