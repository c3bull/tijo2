import mongoose from 'mongoose';
import config from '../config'
import business from '../business/business.container';

describe("Test product functions", () => {
    beforeAll(async () => {
        await mongoose.connect(config.databaseUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
    });

    test("Retrieve all products", async () => {
        let allProducts = await business.getProductManager().get();
        expect(allProducts.length).toBe(33);
    });

    test("Retrieve products from category 'juices'", async () => {
        let products = await business.getProductManager().getProductsByCategory('juices');
        expect(products.length).toBe(5);
    });

    afterAll(async done => {
        mongoose.disconnect();
        done();
    });

});
