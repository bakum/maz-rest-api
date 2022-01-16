const UserModel = require('../../entities/users/models/users.model');
const crypto = require('crypto');
const ADMIN = require('config').permissionLevels.ADMIN;
const NORMAL_USER = require('config').permissionLevels.NORMAL_USER;
const PAID_USER = require('config').permissionLevels.PAID_USER

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
        .then((data) => {
            if (data.count === 0) {
                res.status(404).send({});
            } else {
                let passwordFields = data.rows[0].dataValues.password.split('$');
                //let salt = passwordFields[1];
                //let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
                if (req.body.password === passwordFields[3]) {
                    req.body = {
                        userId: data.rows[0].dataValues.id,
                        email: data.rows[0].dataValues.email,
                        username: data.rows[0].dataValues.username,
                        permissionLevel: (data.rows[0].dataValues.is_superuser ? ADMIN : (data.rows[0].dataValues.is_staff ? PAID_USER : NORMAL_USER)),
                        provider: 'email',
                        name: data.rows[0].dataValues.first_name + ' ' + data.rows[0].dataValues.last_name,
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
