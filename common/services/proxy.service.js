const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('config'), errHundler = require('../errorHundler/error.hundler')

const filterDjango = (pathname, req) => {
    let apiPath = config.api.uri.slice(0, -1)
    let isNotWebmin = req.headers.hasOwnProperty('referer') ? !req.headers['referer'].includes('/webmin') : pathname.includes('/webmin') ? !pathname.includes('/webmin') : true
    //let isNotWebmin = !req.url.includes(api)
    // return req.headers.hasOwnProperty('Authorization')
    return !req.url.includes(apiPath) && isNotWebmin
}

const filterWebmin = (pathname, req) => {
    const apiPath = config.api.uri.slice(0, -1)
    return !req.url.includes(apiPath)
}

const djangoProxy = createProxyMiddleware(filterDjango, {
    target: `${config.proxy.proxyEndpoint}:${config.proxy.port}/`,
    changeOrigin: true,
    ws: true,
    onError(err, req, res) {
        errHundler.onProxyError(err, req, res)
    }
})

const webminProxy = createProxyMiddleware(filterWebmin, {
    target: `${config.proxy.webminEndpoint}/`,
    changeOrigin: true,
    //secure: false,
    ws: true,
    pathRewrite: {
        [`^/webmin`]: '/webmin',
    },
    onError(err, req, res) {
        errHundler.onProxyError(err, req, res)
    }
})

exports.useProxyIfNeeded = (app) => {
    if (config.proxy.use) {
        app.use('/', djangoProxy)
        if (config.proxy.useWebmin) {
            app.use('/webmin', webminProxy)
        }
    }
}
