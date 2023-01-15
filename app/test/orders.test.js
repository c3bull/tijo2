import mongoose from 'mongoose';
import config from '../config'
import business from '../business/business.container';

describe("Test order functions", () => {
    beforeAll(async () => {
        await mongoose.connect(config.databaseUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        })
    });

    test("Retrieve all orders", async () => {
        let allOrders = await business.getOrderManager().get();
        expect(allOrders.length).toBe(8);
    });

    test("Retrieve orders for email 'jakub.cebula9@gmail.com'", async () => {
        let allOrders = await business.getOrderManager().getOrderByUserEmail('jakub.cebula9@gmail.com');
        expect(allOrders.length).toBe(1);
    });

    test("Make an order", async () => {
        let newOrder = await business.getOrderManager().makeOrder({
            orderedProducts: [
                {
                    amount: 3,
                    hint: "[NIEGAZ]",
                    name: "jablko - brzoskwinia",
                    productId: 4,
                }
            ],
            placementDate: "15/01/2023",
            totalPrice: 15.69,
            email: "pkielbasa@gmail.com",
        });
        expect(newOrder.email).toBe("pkielbasa@gmail.com");
        expect(newOrder.orderedProducts[0].hint).toBe("[NIEGAZ]");
        expect(newOrder.orderedProducts[0].amount).toBe(3);
        expect(newOrder.orderedProducts[0].name).toBe("jablko - brzoskwinia");
        expect(newOrder.placementDate).toBe("15/01/2023");
    });

    test("Delete recently added order", async () => {
        let removedOrder = await business.getOrderManager().deleteLastOrder();
        expect(removedOrder.email).toBe("pkielbasa@gmail.com");
        expect(removedOrder.orderedProducts[0].hint).toBe("[NIEGAZ]");
        expect(removedOrder.orderedProducts[0].amount).toBe(3);
        expect(removedOrder.orderedProducts[0].name).toBe("jablko - brzoskwinia");
        expect(removedOrder.placementDate).toBe("15/01/2023");
    });

    afterAll(async done => {
        mongoose.disconnect();
        done();
    });

});
