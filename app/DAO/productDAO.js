import mongoose from 'mongoose';
import applicationException from '../service/applicationException';
import mongoConverter from '../service/mongoConverter';


const productSchema = new mongoose.Schema({
    bottle: String,
    name: String,
    tableLabels: [
        {
        wartoscOdzywcza: String,
        wartoscEnergetyczna: String,
        tluszcz: String,
        wTymKwasyNasycone: String,
        weglowodany: String,
        wTymCukry: String,
        bialko: String,
        sol: String,
    }
    ],
    tableValues: [
        {
            wartoscOdzywcza: String,
            wartoscEnergetyczna: String,
            tluszcz: String,
            wTymKwasyNasycone: String,
            weglowodany: String,
            wTymCukry: String,
            bialko: String,
            sol: String,
        }
    ],
    category: String,
    price: Number,
    netPrice: Number,
    vat: Number,
    hint: String,
}, {
    collection: 'product'
});

const ProductModel = mongoose.model('products', productSchema);

async function get() {
    const result = await ProductModel.find();
    if (result) {
        return result;
    }
  throw applicationException.new(applicationException.BAD_REQUEST, 'Could not find any orders');
}

async function getProductsByCategory(category) {
    const result = await ProductModel.find({category: category});
    if (result) {
        return mongoConverter(result);
    }
    throw applicationException.new(applicationException.BAD_REQUEST, 'No orders for user with that email');
}

export default {
    get: get,
    getProductsByCategory: getProductsByCategory,
};
