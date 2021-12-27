const config = require('../../../common/config/env.config');
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: "mysql",
    define: {
        timestamps: false
    }
});

const User = sequelize.define("User",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING[128],
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATETIME,
            allowNull: false
        },
        is_superuser: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING[150],
            allowNull: false
        },
        first_name: {
            type: Sequelize.STRING[150],
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING[150],
            allowNull: false
        },
        email: {
            type: Sequelize.STRING[254],
            allowNull: false
        },
        is_staff: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date_joined: {
            type: DataTypes.DATETIME,
            allowNull: false
        }
    },
    {
        tableName: 'auth_user'
    }
);
