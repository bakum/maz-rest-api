const UsersController = require('./controllers/users.controller');
const PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware');
const config = require('config'),  uri = config.get('api.uri'),
    ADMIN = config.get('permissionLevels.ADMIN'),
    PAID = config.get('permissionLevels.PAID_USER'),
    FREE = config.get('permissionLevels.NORMAL_USER')

exports.routesConfig = function (app) {
    app.get(`${uri}users`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        UsersController.list
    ]);
    app.get(`${uri}users/:userId`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(FREE),
        PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
        UsersController.getById
    ]);
    app.post(`${uri}users`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        UsersController.updateProfile
    ]);
};
