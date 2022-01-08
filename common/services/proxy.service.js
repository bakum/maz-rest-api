const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('../config/env.config');

const filter = (pathname, req) => {
    return !req.headers.hasOwnProperty('Authorization')
}


exports.useProxyIfNeeded = (app) => {
    if (config.proxy.use) {
        if (config.proxy.useWebmin) {
            app.use('/webmin', createProxyMiddleware({
                target: `${config.proxy.webminEndpoint}/`,
                changeOrigin: true,
                secure: false,
                ws: true,
                pathRewrite: {
                    [`^/webmin`]: '',
                },
                onError(err, req, res) {
                    res.writeHead(500, {
                        'Content-Type': 'text/plain'
                    });
                    res.end('' + err);
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
                        res.end('' + err);
                    }
                }
            )
        )
    }
}
