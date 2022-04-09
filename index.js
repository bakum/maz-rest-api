#!/usr/bin/env node
const argv = require('./common/services/argv.service')
const appLogger = require('./common/services/logger.service')
const express = require('express');
const app = express(), httpApp = express();
const runner = require('./common/services/runner.service'),
    proxy = require('./common/services/proxy.service')
    //proxy = require('./common/services/proxy_express.service')

argv.getYargs()
appLogger.setLogger(app, argv)
// app.enable('trust proxy')
// runner.setEnv(httpApp,'port','port')
// runner.setEnv(app,'port','portSSL')
runner.setHeader(app)
runner.setRoutes(app)
proxy.useProxyIfNeeded(app)
runner.set404(app)
runner.run(app, argv)
//runner.redirectFromHttpToHttps(app, argv)

exports.app = app
