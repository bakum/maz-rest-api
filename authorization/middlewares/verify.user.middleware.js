const UserModel = require('../../entities/users/models/users.model');
const crypto = require('crypto');
const ADMIN = require('../../common/config/env.config').permissionLevels.ADMIN;
const NORMAL_USER = require('../../common/config/env.config').permissionLevels.NORMAL_USER;
const PAID_USER = require('../../common/config/env.config').permissionLevels.PAID_USER

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isPasswordAndUserMatch = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user) => {
            if (!user.dataValues) {
                res.status(404).send({});
            } else {
                let passwordFields = user.dataValues.password.split('$');
                //let salt = passwordFields[1];
                //let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (req.body.password === passwordFields[3]) {
                    req.body = {
                        userId: user.dataValues.id,
                        email: user.dataValues.email,
                        username: user.dataValues.username,
                        permissionLevel: (user.dataValues.is_superuser ? ADMIN : (user.dataValues.is_staff ? PAID_USER : NORMAL_USER)),
                        provider: 'email',
                        name: user.dataValues.first_name + ' ' + user.dataValues.last_name,
                    };
                    return next();
                } else {
                    return res.status(400).send({errors: ['Invalid e-mail or password']});
                }
            }
        }).catch(reason => {
        return res.status(400).send({
            error: 'No user found',
            reason: reason
        })
    });
};
