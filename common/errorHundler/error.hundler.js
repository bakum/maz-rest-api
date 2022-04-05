exports.onError = (error) => {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof error.port === 'string' ? 'Pipe ' + error.port : 'Port ' + error.port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
exports.no_model = new Error('No model found')
exports.onProxyError = (err, req, res) => {
    const path = require('path')
    res.writeHead(500, {
        'Content-Type': 'text/plain'
    });
    switch (err.code) {
        case 'ECONNREFUSED':
            //res.end('Site is offline now. Sorry!');
            res.sendFile(path.join(__dirname+'/parking.html'));
            break;
        case 'CERT_HAS_EXPIRED':
            res.end('SSL certificate has expired');
            break;
        default:
            res.end('' + err);
    }
}
exports.onProxyErrorExpress = (err, res, next) => {
    const path = require('path')
    switch (err.code) {
        case 'ECONNREFUSED':
            //res.end('Site is offline now. Sorry!');
            res.sendFile(path.join(__dirname+'/parking.html'));
            break;
        case 'CERT_HAS_EXPIRED':
            res.end('SSL certificate has expired');
            break;
        default:
            //res.end('' + err);
            console.log(err.code)
            next(err)
    }
}
