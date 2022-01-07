const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('../config/env.config')

const filter = (pathname, req) => {
        return !req.headers.hasOwnProperty('Authorization')
    }

exports.useProxyIfNeeded = (app) => {
    if (config.proxy.use) {
        app.use('/', createProxyMiddleware(filter, {
                    target: `${config.proxy.proxyEndpoint}:${config.proxy.port}/`,
                    changeOrigin: true
                }
            )
        )
    }
}
