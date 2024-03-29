const https = require('https')
const fs = require('fs')
const path = require('path')
const config = require('config')
const fileUpload = require('express-fileupload')
const bodyParser = require('body-parser')
const errorHundler = require('../errorHundler/error.hundler')
const AuthorizationRouter = require('../../authorization/routes.config');
const UsersRouter = require('../../entities/users/routes.config');
const GoodsRouter = require('../../entities/goods/routes.config');
const OrdersRouter = require('../../entities/orders/routes.config')
const DivisionRouter = require('../../entities/divisions/routes.config')
const ProfilesRouter = require('../../entities/profiles/routes.config')
const DiscountsRouter= require('../../entities/discount/routes.config')

const authHeader = (req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
        res.header('Access-Control-Expose-Headers', 'Content-Length');
        res.header('Access-Control-Allow-Headers', 'Origin, Accept, Authorization, Content-Type, X-Requested-With, Range');
        if (req.method === 'OPTIONS') {
            return res.sendStatus(200);
        } else {
            return next();
        }
    }
    /**
     * @param req express http request
     * @returns true if the http request is secure (comes form https)
     */
    , isSecure = (req) => {
        if (req.headers['x-forwarded-proto']) {
            return req.headers['x-forwarded-proto'] === 'https';
        }
        return req.secure;
    }

    , error404 = (req, res, next) => {
        res.status(404)
        if (req.accepts('json')) {
            res.json({error: `404: url - ${req.url} not found`});
        } else {
            res.send(`404: url - ${req.url} not found`)
        }
    }
    , createServer = (app) => {
        let Server
        app.on('error', errorHundler.onError)
        Server = app.listen(config.get('port'), () => {
            if (app.get('env') !== 'testing') console.log('server listening at port %s', config.get('port'));
        })
        app.set('server', Server)
    }

    , createSSLServer = (app) => {
        let Server
        let certificates = {}
        let errors = 0
        let finder = require('findit')(path.join(__dirname, '../../certs'))
        finder.on('file', (file, stat) => {
            errors++
            if (!certificates.ca)
                certificates.ca = file.includes('ca_bundle') && file.includes('.crt') ? fs.readFileSync(file) : undefined
            if (!certificates.cert)
                certificates.cert = file.includes('.crt') && !file.includes('ca_bundle') ? fs.readFileSync(file) : undefined
            if (!certificates.key)
                certificates.key = file.includes('.key') ? fs.readFileSync(file) : undefined
            console.log(file);
        })
        finder.on('error', (err) => {
            console.error(err)
            process.exit(1)
        })
        finder.on('end', () => {
            if (errors < 2) {
                console.error('No certificates found for SSL')
                process.exit(1)
            }
            try {
                Server = https.createServer(certificates, app);
                Server.on('error', errorHundler.onError);

                Server.listen(config.get('portSSL'), () => {
                    if (app.get('env') !== 'testing')
                        console.log(`server listening (SSL) at port ${config.get('portSSL')}`)
                })
            } catch (e) {
                console.error(e)
                process.exit(1)
            }
        })
        app.set('server', Server)
    }

exports.set404 = (app) => {
    app.use(error404)
}

exports.setHeader = (app) => {
    app.use(authHeader)
    app.use(fileUpload())
    app.use(bodyParser.json({limit: '50mb'}))
    app.disable('x-powered-by')
}

exports.setEnv = (app, env_var, env_val) => {
    app.set(env_var, config.get(env_val))
}

exports.setRoutes = (app) => {
    AuthorizationRouter.routesConfig(app);
    UsersRouter.routesConfig(app);
    GoodsRouter.routesConfig(app);
    OrdersRouter.routesConfig(app);
    DivisionRouter.routesConfig(app);
    ProfilesRouter.routesConfig(app);
    DiscountsRouter.routesConfig(app)

}

exports.redirectFromHttpToHttps = (app, argv) => {
    const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
    if (argv.env() !== 'development' && argv.env() !== 'test')
        if (config.get('production.secure_connection'))
            app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301))
    // redirect any page form http to https
    // app.use((req, res, next) => {
    //     if (argv.env() !== 'development' && argv.env() !== 'test' && !isSecure(req)) {
    //         res.redirect(301, `https://${req.headers.host}${req.url}`);
    //     } else {
    //         next();
    //     }
    // })
}

exports.run = (app, argv) => {
    if ((argv.env() === 'production') && (config.get('production.useSSL'))) {
        createSSLServer(app)
    } else {
        createServer(app)
    }
}
