const ValidationMiddleware = require("../../common/middlewares/auth.validation.middleware");
const PermissionMiddleware = require("../../common/middlewares/auth.permission.middleware");
const DiscountController = require('../discount/controllers/discount.controller')
const config = require("config"), uri = config.get('api.uri'),
    ADMIN = config.get('permissionLevels.ADMIN'),
    PAID = config.get('permissionLevels.PAID_USER')

exports.routesConfig = (app) => {
    app.get(`${uri}discount`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        DiscountController.listOfDiscounts
    ]);
    app.post(`${uri}discount`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        DiscountController.updateOrCreateDiscounts
    ]);
}