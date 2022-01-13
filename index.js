#!/usr/bin/env node
const argv = require('./common/services/argv.service')
const appLogger = require('./common/services/logger.service')
const express = require('express');
const app = express();
const runner = require('./common/services/runner.service'),
    proxy = require('./common/services/proxy.service')

argv.getYargs()
appLogger.setLogger(app, argv)
runner.setHeader(app)
runner.setRoutes(app)
proxy.useProxyIfNeeded(app)
runner.set404(app)
runner.run(app, argv)

exports.app = app
