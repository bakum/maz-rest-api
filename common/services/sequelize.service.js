const config = require('../../common/config/env.config');
const {Sequelize} = require('sequelize');

const options = {
    host: config.mysql.host,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    logging: false

};

exports.db = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, options);
