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
