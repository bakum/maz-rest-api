const {DataTypes} = require('sequelize'),
    connection = require('../../../common/services/sequelize.service'),
    DB = connection.db,
    Users = require('../../users/models/users.model').user,
    Divisions = require('../../divisions/models/divisions.model').division

const Profiles = DB.define("Profiles",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        company: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(7),
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        text_ru: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        text_uk: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        okpo: {
            type: DataTypes.STRING(20),
            allowNull: true
        },
        fio: {
            type: DataTypes.STRING(50),
            allowNull: true
        },
        sale: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        sum_time: {
            type: DataTypes.DATE,
            allowNull: true
        },
        sum: {
            type: DataTypes.DOUBLE,
            allowNull: true
        },
        mod_date: {
            type: DataTypes.DATE,
            allowNull: true
        },
        user_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        permission_level: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        division_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },

    },
    {
        tableName: 'uprofile_userprofile'
    }
)

Profiles.belongsTo(Divisions, {foreignKey: 'division_id'})
Divisions.hasOne(Profiles, {foreignKey: 'division_id'})

Profiles.belongsTo(Users, {foreignKey: 'user_id'})
Users.hasOne(Profiles, {foreignKey: 'user_id'})

exports.listOfProfiles = (options) => {
    return connection.list(Profiles, options)
}
exports.updateOrCreateProfile = (where, newItem) => {
    return connection.updateOrCreate(Profiles, where, newItem)
}
exports.deleteProfile = (where) => {
    return connection.delete(Profiles, where)
}
