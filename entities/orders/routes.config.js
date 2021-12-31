const OrdersController = require('./controllers/orders.controller');
const config = require('../../common/config/env.config');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.get(`${config.api.uri}orders`, [
        ValidationMiddleware.validJWTNeeded,
        OrdersController.listOfOrders
    ]);
}
