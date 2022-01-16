const path = require('path'),
    yargs = require('yargs')
    .option('env', {
        describe: "Client app build environment, either 'development' or 'production'",
        choice: ['development', 'production'],
        default: 'development'
    })
    .help()
    .argv

process.env.NODE_ENV = yargs['env']
process.env["NODE_CONFIG_DIR"] = path.join(__dirname, '../config/')
exports.getYargs = () => {
    return yargs
}

exports.env = () => {
    return yargs['env']
}
