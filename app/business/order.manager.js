import OrderDAO from '../DAO/orderDAO';


function create() {

  function get() {
    return OrderDAO.get();
  }

  function getOrderByUserEmail(email) {
    return OrderDAO.getByUserEmail(email);
  }

  function makeOrder(orderDetails) {
    return OrderDAO.makeOrder(orderDetails);
  }

  function deleteLastOrder() {
    return OrderDAO.deleteLastOrder();
  }

  return {
    get: get,
    getOrderByUserEmail: getOrderByUserEmail,
    makeOrder: makeOrder,
    deleteLastOrder: deleteLastOrder,
  };
}

export default {
  create: create
};
