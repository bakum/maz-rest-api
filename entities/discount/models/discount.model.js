const {DataTypes} = require('sequelize'),
    connection = require('../../../common/services/sequelize.service'),
    DB = connection.db


const Discount = DB.define("Discount",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        discount: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        use_from: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'discounts'
    }
)
exports.listOfDiscounts = (options) => {
    return connection.list(Discount, options)
}
exports.updateOrCreateDiscounts = (where, newItem) => {
    return connection.updateOrCreate(Discount, where, newItem)
}
exports.deleteDiscount = (where) => {
    return connection.delete(Discount, where)
}