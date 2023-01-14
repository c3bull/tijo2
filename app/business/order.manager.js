import PasswordDAO from '../DAO/passwordDAO';
import TokenDAO from '../DAO/tokenDAO';
import UserDAO from '../DAO/userDAO';
import OrderDAO from '../DAO/orderDAO';
import applicationException from '../service/applicationException';
import sha1 from 'sha1';

function create(context) {

  function get() {
    OrderDAO.get();
  }

  function getOrderByUserEmail(email) {
    return OrderDAO.getByUserEmail(email);
  }

  function makeOrder(orderDetails) {
    return OrderDAO.makeOrder(orderDetails);
  }

  return {
    get: get,
    getOrderByUserEmail: getOrderByUserEmail,
    makeOrder: makeOrder,
  };
}

export default {
  create: create
};
