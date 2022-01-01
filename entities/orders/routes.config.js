const OrdersController = require('./controllers/orders.controller'),
    config = require('../../common/config/env.config'),
    ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware'),
    PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware'),
    ADMIN = config.permissionLevels.ADMIN,
    PAID = config.permissionLevels.PAID_USER,
    FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get(`${config.api.uri}orders`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrdersController.listOfOrders
    ]);
}
