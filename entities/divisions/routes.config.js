const ValidationMiddleware = require("../../common/middlewares/auth.validation.middleware");
const PermissionMiddleware = require("../../common/middlewares/auth.permission.middleware");
const DivisionsController = require('../divisions/controllers/divisions.controller')
const config = require("config"), uri = config.get('api.uri'),
    ADMIN = config.get('permissionLevels.ADMIN'),
    PAID = config.get('permissionLevels.PAID_USER');

exports.routesConfig = function (app) {
    app.get(`${uri}divisions`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        DivisionsController.listOfDevisions
    ]);
    app.post(`${uri}divisions`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        DivisionsController.updateOrCreateDivision
    ]);
    app.delete(`${uri}divisions`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        DivisionsController.deleteDivision
    ]);
}
