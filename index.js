#!/usr/bin/env node
const config = require('./common/config/env.config.js')
const argv = require('./common/services/argv.service')
const appLogger = require('./common/services/logger.service')
const express = require('express');
const app = express();
const runner = require('./common/services/runner.service');

argv.getYargs()
appLogger.setLogger(app, argv)
runner.setHeader(app)
runner.setRoutes(app)
runner.run(app, argv)

exports.app = app
