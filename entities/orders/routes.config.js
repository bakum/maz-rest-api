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
    app.post(`${uri}orders/clearsync`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.clearSyncOrders
    ]);
    app.delete(`${uri}orders`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.deleteOrder
    ]);
    app.get(`${uri}orderitems`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrdersController.listOfOrderItems
    ]);
    app.post(`${uri}orderitems`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.updateOrCreateOrderItem
    ]);
    app.delete(`${uri}orderitems`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.deleteOrderItem
    ]);
    app.get(`${uri}delivery`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        OrdersController.listOfDelivery
    ]);
    app.post(`${uri}delivery`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.updateOrCreateDelivery
    ]);
    app.delete(`${uri}delivery`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        OrdersController.deleteDelivery
    ]);
}
