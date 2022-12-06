const {DataTypes} = require('sequelize'),
    connection = require('../../../common/services/sequelize.service'),
    DB = connection.db,
    Users = require('../../users/models/users.model').user,
    Catalog = require('../../goods/models/goods.model').catalog

const Orders = DB.define("Orders",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        num: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        text_ru: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        text_uk: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        status: {
            type: DataTypes.STRING(3),
            allowNull: false
        },
        dost: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        otdel: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        sum: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        coment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        nomdek: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sync: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        uuid: {
            type: DataTypes.STRING(36),
            allowNull: true
        },
        city_code: {
            type: DataTypes.STRING(38),
            allowNull: true
        },
        warehouse_code: {
            type: DataTypes.STRING(38),
            allowNull: true
        }
    },
    {
        tableName: 'orders'
    }
)

const OrderItems = DB.define("OrderItems",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        product_id: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        coment: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        coment_ru: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        coment_uk: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        order_id: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        sync: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },
    {
        tableName: 'orders_items'
    }
)
OrderItems.belongsTo(Orders, {foreignKey: 'order_id'})
Orders.hasMany(OrderItems, {foreignKey: 'order_id'})

Orders.belongsTo(Users, {foreignKey: 'user_id'})
Users.hasMany(Orders, {foreignKey: 'user_id'})

OrderItems.belongsTo(Catalog, {foreignKey: 'product_id'})
Catalog.hasMany(OrderItems, {foreignKey: 'product_id'})

exports.listOfOrders = (options) => {
    options.include = {all: true, nested: true}
    return connection.list(Orders, options)
}
exports.updateOrCreateOrder = (where, newItem) => {
    return connection.updateOrCreate(Orders, where, newItem)
}
exports.deleteOrder = (where) => {
    return connection.delete(Orders, where)
}
