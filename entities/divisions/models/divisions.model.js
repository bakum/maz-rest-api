const {DataTypes} = require('sequelize'),
    connection = require('../../../common/services/sequelize.service'),
    DB = connection.db

const Divisions = DB.define("Divisions",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        name_ru: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        name_uk: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false
        },
        uuid: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        sync: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'divisions'
    }
)
exports.division = Divisions

exports.listOfDevisions = (options) => {
    return connection.list(Divisions,options)
}
exports.updateOrCreateDivision = (where, newItem) => {
    return connection.updateOrCreate(Divisions, where, newItem)
}
exports.deleteDivision = (where) => {
    return connection.delete(Divisions, where)
}
