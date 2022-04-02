const httproxy = require('express-http-proxy'),
    config = require('config'), errHundler = require('../errorHundler/error.hundler'),
    api = config.get('api.uri'), proxy = config.get('proxy'),
    filterDjango = (req, res) => {
        let apiPath = api.slice(0, -1), result
        let isNotWebmin = req.headers.hasOwnProperty('referer') ? !req.headers['referer'].includes('/webmin') : req.url.includes('/webmin') ? !req.url.includes('/webmin') : true
        result = !req.url.includes(apiPath) && isNotWebmin
        return result
    }, djangoProxy = httproxy(`${proxy.proxyEndpoint}:${proxy.port}/`, {
            filter: filterDjango,
            limit: '10mb',
            proxyErrorHandler: errHundler.onProxyErrorExpress
        }
    )

exports.useProxyIfNeeded = (app) => {
    if (proxy.use) {
        app.use('/', djangoProxy)
        // if (proxy.useWebmin) {
        //     app.use('/webmin', webminProxy)
        // }
    }
}
