const config = require('../../../common/config/env.config');
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: "mysql",
    define: {
        timestamps: false
    }
})

const Orders = sequelize.define("Orders",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        num: {
            type: Sequelize.STRING(50),
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
            type: Sequelize.STRING(3),
            allowNull: false
        },
        dost: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        otdel: {
            type: Sequelize.STRING(200),
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
            type: Sequelize.STRING(300),
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    },
    {
        tableName: 'orders'
    }
)

const OrderItems = sequelize.define("OrderItems",
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
        order_id:{
            type: DataTypes.BIGINT,
            allowNull: true
        }
    },
    {
        tableName: 'orders_items'
    }
)
OrderItems.belongsTo(Orders, {foreignKey: 'order_id'})
Orders.hasMany(OrderItems, {foreignKey: 'order_id'})

exports.listOfOrders = async (options) => {
    return await Orders.findAndCountAll(options);
}
