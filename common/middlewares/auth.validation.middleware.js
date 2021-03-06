const jwt = require('jsonwebtoken'),
    secret = require('config').get('jwt_secret'),
    crypto = require('crypto'),
    //fs = require("fs"),
    //path = require("path"),
    //cert = fs.readFileSync(path.join(__dirname, '../../certs/', 'server.key')),
    AuthError = {error: "Authorization failed"},
    permError = {error: 'Permission error'}

exports.verifyRefreshBodyField = (req, res, next) => {
    if (req.body && req.body.refresh_token) {
        return next();
    } else {
        return res.status(400).send({error: 'need to pass refresh_token field'});
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = Buffer.from(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        return res.status(400).send({error: 'Invalid refresh token'});
    }
};


exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send(AuthError);
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send(permError);
        }
    } else {
        return res.status(401).send(AuthError);
    }
};
