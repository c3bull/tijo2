import mongoose from 'mongoose';
import config from '../config'
import business from '../business/business.container';
import jwt_decode from 'jwt-decode';

describe("Test user functions", () => {
    beforeAll(async () => {
        await mongoose.connect(config.databaseUrl, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        })
    });

    test("Password hashing", async () => {
        let hashedPassword = await business.getUserManager().hashString('1234');
        expect(hashedPassword).toBe('7110eda4d09e062aa5e4a390b0a572ac0d2c0220');
    });

    test("Create and authenticate a new user", async () => {
        await business.getUserManager().createNewOrUpdate({
            email: 'test@user.com',
            name: 'Test name',
            lastName: 'Test lastName',
            password: '1234',
        });

        let loggedInUser = await business.getUserManager().authenticate('test@user.com', '1234');
        let decodedTokenOfLoggedInUser = jwt_decode(loggedInUser.token);

        expect(decodedTokenOfLoggedInUser.email).toBe('test@user.com');
        expect(decodedTokenOfLoggedInUser.name).toBe('Test name');
        expect(decodedTokenOfLoggedInUser.lastName).toBe('Test lastName');

        let removedUser = await business.getUserManager().removeUserByEmail('test@user.com')

        expect(removedUser.email).toBe('test@user.com');
        expect(removedUser.name).toBe('Test name');
        expect(removedUser.lastName).toBe('Test lastName');
    });

    afterAll(async done => {
        mongoose.disconnect();
        done();
    });

});
