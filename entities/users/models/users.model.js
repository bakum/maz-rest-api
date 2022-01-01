const {Sequelize, DataTypes} = require('sequelize');
const DB = require('../../../common/services/sequelize.service').db

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

exports.list = async (options) => {
    return await User.findAndCountAll(options);
}

exports.findById = async (id) => {
    return await User.findByPk(id)
}

exports.findByEmail = (email) => {
    return User.findOne({
        where: {
            email: email,
            is_active : true
        }
    })
}
