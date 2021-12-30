const config = require('../../../common/config/env.config');
const {Sequelize, Model, DataTypes} = require('sequelize');
const sequelize = new Sequelize(config.mysql.database, config.mysql.username, config.mysql.password, {
    host: config.mysql.host,
    dialect: "mysql",
    define: {
        timestamps: false
    }
})

const Catalog = sequelize.define("Catalog",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(6),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        name_ru: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        name_uk: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        img: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        img1: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        img2: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        img3: {
            type: Sequelize.STRING(100),
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
        title: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        title_ru: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        title_uk: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        description: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        description_ru: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        description_uk: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        cod: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        cod1: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        cod2: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        cod3: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        cod4: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        duble: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        search: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        search1: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        search2: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        search3: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        search4: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        main: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sale: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false
        },
        sp_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        catalog_group: {
            type: DataTypes.BIGINT,
            allowNull: true
        },
        uuid: {
            type: Sequelize.STRING(36),
            allowNull: true
        }
    },
    {
        tableName: 'catalog'
    })
exports.listOfCatalog = async (options) => {
    return await Catalog.findAndCountAll(options);
}
const CatalogGoods = sequelize.define("CatalogGoods",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cod: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        index: {
            type: Sequelize.STRING(100),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(6),
            allowNull: false
        },
        catalogue: {
            type: DataTypes.INTEGER,
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
        uuid: {
            type: Sequelize.STRING(36),
            allowNull: true
        }
    },
    {
        tableName: 'catalog_goods'
    }
)
exports.listOfGoods = async (options) => {
    return await CatalogGoods.findAndCountAll(options);
}

const CatalogGroup = sequelize.define("CatalogGroup",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: Sequelize.STRING(12),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        name_ru: {
            type: Sequelize.STRING(300),
            allowNull: true
        },
        name_uk: {
            type: Sequelize.STRING(300),
            allowNull: true
        },
        forid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING(6),
            allowNull: false
        },
        alias: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        description_ru: {
            type: Sequelize.STRING(300),
            allowNull: true
        },
        description_uk: {
            type: Sequelize.STRING(300),
            allowNull: true
        },
        order: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        marker: {
            type: Sequelize.STRING(50),
            allowNull: false
        },
        img: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        order2: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        menu: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        sale: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        inmain: {
            type: Sequelize.STRING(6),
            allowNull: false
        },
        brend: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        title: {
            type: Sequelize.STRING(200),
            allowNull: false
        },
        title_ru: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        title_uk: {
            type: Sequelize.STRING(200),
            allowNull: true
        },
        keywords: {
            type: Sequelize.STRING(300),
            allowNull: false
        },
        keywords_ru: {
            type: Sequelize.STRING(300),
            allowNull: true
        },
        keywords_uk: {
            type: Sequelize.STRING(300),
            allowNull: true
        },
        seo_text: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        uuid: {
            type: Sequelize.STRING(36),
            allowNull: true
        }
    },
    {
        tableName: 'catalog_group'
    }
)

exports.listOfGroups = async (options) => {
    return await CatalogGroup.findAndCountAll(options);
}
