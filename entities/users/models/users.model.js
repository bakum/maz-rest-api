const {Sequelize, DataTypes} = require('sequelize'),
    connection = require('../../../common/services/sequelize.service'),
    DB = connection.db

const User = DB.define("User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING(128),
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_superuser: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        first_name: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        last_name: {
            type: Sequelize.STRING(150),
            allowNull: false
        },
        email: {
            type: Sequelize.STRING(254),
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
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'auth_user'
    }
)

exports.user = User

exports.list = (options) => {
    return connection.list(User,options)
}

exports.findById = (id) => {
    return connection.list(User,{
        where: {
            id: id
        }
    })
}

exports.findByEmail = (email) => {
    return connection.list(User,{
        where: {
            email: email,
            is_active : true
        }
    })
}
