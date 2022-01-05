const https = require('https')
const fs = require('fs')
const path = require('path')
const config = require('../config/env.config')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const errorHundler = require('../errorHundler/error.hundler')
const AuthorizationRouter = require('../../authorization/routes.config');
const UsersRouter = require('../../entities/users/routes.config');
const GoodsRouter = require('../../entities/goods/routes.config');
const OrdersRouter = require('../../entities/orders/routes.config')

const authHeader = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    } else {
        return next();
    }
}

exports.setHeader = (app) => {
    app.use(authHeader)
    app.use(fileUpload())
    app.use(bodyParser.json({limit: '50mb'}))
    app.disable('x-powered-by')
}

exports.setRoutes = (app) => {
    AuthorizationRouter.routesConfig(app);
    UsersRouter.routesConfig(app);
    GoodsRouter.routesConfig(app);
    OrdersRouter.routesConfig(app);
}

exports.run = (app, argv) => {
    let Server
    if ((argv.env() === 'production') && (config.production.useSSL)) {
        try {
            Server = https.createServer({
                cert: fs.readFileSync(path.join(__dirname, '../../certs', 'server.crt')),
                key: fs.readFileSync(path.join(__dirname, '../../certs', 'server.key'))
            }, app);
            Server.on('error', errorHundler.onError);

            Server.listen(config.portSSL, () => {
                if (app.get('env') !== 'testing') console.log(`server listening (SSL) at port ${config.portSSL}`);
            });
        } catch (e) {
            console.error(e)
            process.exit(1)
        }
    } else {
        app.on('error', errorHundler.onError)
        Server = app.listen(config.port, function () {
            if (app.get('env') !== 'testing') console.log('server listening at port %s', config.port);
        })
    }

    app.set('server', Server)
}
