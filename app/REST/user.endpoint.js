import business from '../business/business.container';
import applicationException from '../service/applicationException';


const userEndpoint = (router) => {
    router.get('/orders', async (request, response) => {
        try {
            let result = await business.getOrderManager().get();
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/orders/', async (request, response) => {
        try {
            let result = await business.getOrderManager().getOrderByUserEmail(request.body.userEmail);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/makeOrder/', async (request, response) => {
        try {
            let result = await business.getOrderManager().makeOrder(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.get('/products/:category', async (request, response) => {
        try {
            let result = await business.getProductManager().getProductsByCategory(request.query.category);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/loginUser', async (request, response, next) => {
        try {
            let result = await business.getUserManager().authenticate(request.body.email, request.body.password);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.post('/registerUser', async (request, response) => {
        try {
            const result = await business.getUserManager().createNewOrUpdate(request.body);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });

    router.delete('/api/user/logout/:userId',  async (request, response, next) => {
        try {
            console.log(request.body.userId)
            let result = await business.getUserManager(request).removeHashSession(request.body.userId);
            response.status(200).send(result);
        } catch (error) {
            applicationException.errorHandler(error, response);
        }
    });


};

export default userEndpoint;
