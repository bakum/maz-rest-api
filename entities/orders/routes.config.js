const OrdersController = require('./controllers/orders.controller'),
    config = require('config'), uri = config.get('api.uri'),
    ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware'),
    PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware'),
    ADMIN = config.get('permissionLevels.ADMIN'),
    PAID = config.get('permissionLevels.PAID_USER')

exports.routesConfig = function (app) {
    app.get(`${uri}orders`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrdersController.listOfOrders
    ]);
    app.post(`${uri}orders`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.updateOrCreateOrder
    ]);
    app.delete(`${uri}orders`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.deleteOrder
    ]);
}
