const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('../config/env.config');

const filterDjango = (pathname, req) => {
    const apiPath = config.api.uri.slice(0, -1)
    //let isNotApi = !req.url.includes(api)
    // return req.headers.hasOwnProperty('Authorization')
    return !req.url.includes(apiPath)
}

const filterWebmin = (pathname, req) => {
    const apiPath = config.api.uri.slice(0, -1)
    //let isNotApi = !req.url.includes(api)
    // return req.headers.hasOwnProperty('Authorization')
    return !req.url.includes(apiPath)
}


exports.useProxyIfNeeded = (app) => {
    if (config.proxy.use) {
        if (config.proxy.useWebmin) {
            app.use('/webmin', createProxyMiddleware({
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
        app.use('/', createProxyMiddleware(filterDjango, {
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
