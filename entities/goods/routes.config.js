const GoodsController = require('./controllers/goods.controller'),
    config = require('config'), uri = config.get('api.uri'),
    ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware'),
    PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware'),
    SettingsMiddleware = require('../../common/middlewares/settings.middleware'),
    ADMIN = config.get('permissionLevels.ADMIN'),
    PAID = config.get('permissionLevels.PAID_USER')

exports.routesConfig = function (app) {
    app.get(`${uri}goods`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfCatalog
    ]);
    app.post(`${uri}goods`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.updateOrCreateCatalog
    ]);
    app.delete(`${uri}goods`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.deleteCatalog
    ]);
    app.delete(`${uri}goods/nullvalue`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.deleteCatalogWhenUUIDNull
    ]);
    app.get(`${uri}groups`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfGroups
    ]);
    app.post(`${uri}groups`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.updateOrCreateGroup
    ]);
    app.delete(`${uri}groups`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.deleteGroup
    ]);
    app.get(`${uri}price`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        GoodsController.listOfGoods
    ]);
    app.post(`${uri}price`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.updateOrCreateGoods
    ]);
    app.delete(`${uri}price`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.deleteGoods
    ]);
    app.delete(`${uri}price/nullvalue`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        GoodsController.deleteGoodsWhenUUIDNull
    ]);
    app.post(`${uri}:whatis/:ids/:img/upload`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        SettingsMiddleware.SettingsIsSet,
        GoodsController.uploadImg
    ]);
}
