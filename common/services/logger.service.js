const path = require('path')
const pathLog = path.join(__dirname, '../../log');
const morgan = require('morgan');

const pad = num => (num > 9 ? "" : "0") + num;
const generator = (time, index) => {
    if (!time) return "access.log";

    const month = time.getFullYear() + "" + pad(time.getMonth() + 1);
    const day = pad(time.getDate());
    const hour = pad(time.getHours());
    const minute = pad(time.getMinutes());

    return `${month}/${month}${day}-${hour}${minute}-${index}-access.log`;
};

const rfs = require("rotating-file-stream");
const stream = rfs.createStream(generator, {
    size: "10M",
    interval: "1d",
    path: pathLog
})

exports.setLogger = (app, argv) => {
    if (argv.env() === 'development')
        app.use(morgan('combined'))
    else
        app.use(morgan('combined', {stream: stream}))
}
