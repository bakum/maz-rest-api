const ProfilesController = require('./controllers/profiles.controller'),
    config = require('config'), uri = config.get('api.uri'),
    ValidationMiddleware = require('../../common/middlewares/auth.validation.middleware'),
    PermissionMiddleware = require('../../common/middlewares/auth.permission.middleware'),
    ADMIN = config.get('permissionLevels.ADMIN'),
    PAID = config.get('permissionLevels.PAID_USER')

exports.routesConfig = function (app) {
    app.get(`${uri}profiles`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(PAID),
        ProfilesController.listOfProfiles
    ]);
    app.post(`${uri}profiles`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProfilesController.updateOrCreateProfile
    ]);
    app.delete(`${uri}profiles`, [
        ValidationMiddleware.validJWTNeeded,
        PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
        ProfilesController.deleteProfile
    ]);
}
