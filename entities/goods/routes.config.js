const GoodsController = require('./controllers/goods.controller');
const config = require('../../common/config/env.config');

exports.routesConfig = function (app) {
    app.get(`${config.api.uri}goods`, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfCatalog
    ]);
    app.get(`${config.api.uri}groups`, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfGroups
    ]);
    app.get(`${config.api.uri}price`, [
        // ValidationMiddleware.validJWTNeeded,
        // PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfGoods
    ]);
}
