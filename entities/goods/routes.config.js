const GoodsController = require('./controllers/goods.controller');
const config = require('../../common/config/env.config');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware'),
    PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware'),
    ADMIN = config.permissionLevels.ADMIN,
    PAID = config.permissionLevels.PAID_USER,
    FREE = config.permissionLevels.NORMAL_USER;

exports.routesConfig = function (app) {
    app.get(`${config.api.uri}goods`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfCatalog
    ]);
    app.get(`${config.api.uri}groups`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfGroups
    ]);
    app.get(`${config.api.uri}price`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfGoods
    ]);
}
