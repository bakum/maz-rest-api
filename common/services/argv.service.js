const yargs = require('yargs')
    .option('env', {
        describe: "Client app build environment, either 'development' or 'production'",
        choice: ['development', 'production'],
        default: 'development'
    })
    .help()
    .argv;

exports.getYargs = () => {
    return yargs
}

exports.env = () => {
    return yargs['env']
}
