const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('../config/env.config');

const filter = (pathname, req) => {
    return !req.headers.hasOwnProperty('Authorization')
}


exports.useProxyIfNeeded = (app) => {
    if (config.proxy.use) {
        if (config.proxy.useWebmin) {
            app.use(createProxyMiddleware(['/webmin/**'],{
                target: `${config.proxy.webminEndpoint}/`,
                //changeOrigin: true,
                secure: false,
                ws: true,
                //pathRewrite: {
                //    [`^/webmin`]: '',
                //},
                onError(err, req, res) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    switch (err.code) {
                        case 'ECONNREFUSED':
                            res.end('Site is offline now. Sorry!');
                            break;
                        case 'CERT_HAS_EXPIRED':
                            res.end('SSL certificate has expired');
                            break;
                        default:
                            res.end('' + err);
                    }
                }
            }))
        }
        app.use('/', createProxyMiddleware(filter, {
                    target: `${config.proxy.proxyEndpoint}:${config.proxy.port}/`,
                    changeOrigin: true,
                    ws: true,
                    onError(err, req, res) {
                        res.writeHead(500, {
                            'Content-Type': 'text/plain'
                        });
                        switch (err.code) {
                            case 'ECONNREFUSED':
                                res.end('Site is offline now. Sorry!');
                                break;
                            case 'CERT_HAS_EXPIRED':
                                res.end('SSL certificate has expired');
                                break;
                            default:
                                res.end('' + err);
                        }
                    }
                }
            )
        )
    }
}
