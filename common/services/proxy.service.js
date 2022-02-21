const {createProxyMiddleware} = require('http-proxy-middleware');
const config = require('config'), errHundler = require('../errorHundler/error.hundler'),
    api = config.get('api.uri'), proxy = config.get('proxy')

const filterDjango = (pathname, req) => {
    let apiPath = api.slice(0, -1)
    let isNotWebmin = req.headers.hasOwnProperty('referer') ? !req.headers['referer'].includes('/webmin') : pathname.includes('/webmin') ? !pathname.includes('/webmin') : true
    return !req.url.includes(apiPath) && isNotWebmin
}

const filterWebmin = (pathname, req) => {
    const apiPath = api.slice(0, -1)
    return !req.url.includes(apiPath)
}

const djangoProxy = createProxyMiddleware(filterDjango, {
    target: `${proxy.proxyEndpoint}:${proxy.port}/`,
    changeOrigin: true,
    ws: true,
    logLevel: process.env.NODE_ENV !== 'production' ? 'error' : 'silent',
    // onError(err, req, res) {
    //     errHundler.onProxyError(err, req, res)
    // }
    onError : errHundler.onProxyError
})

const webminProxy = createProxyMiddleware(filterWebmin, {
    target: `${proxy.webminEndpoint}/`,
    changeOrigin: true,
    //secure: false,
    ws: true,
    pathRewrite: {
        [`^/webmin`]: '/webmin',
    },
    logLevel: process.env.NODE_ENV !== 'production' ? 'error' : 'silent',
    // onError(err, req, res) {
    //     errHundler.onProxyError(err, req, res)
    // }
    onError : errHundler.onProxyError
})

exports.useProxyIfNeeded = (app) => {
    if (proxy.use) {
        app.use('/', djangoProxy)
        if (proxy.useWebmin) {
            app.use('/webmin', webminProxy)
        }
    }
}
