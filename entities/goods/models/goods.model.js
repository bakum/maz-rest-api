const {DataTypes} = require('sequelize'),
    connection = require('../../../common/services/sequelize.service'),
    DB = connection.db,
    goods_img_store_to = '/images/goods/',
    group_img_store_to = '/images/group/'

const Catalog = DB.define("Catalog",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        name_ru: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        name_uk: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        img: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: ''
        },
        img1: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: ''
        },
        img2: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: ''
        },
        img3: {
            type: DataTypes.STRING(100),
            allowNull: true,
            defaultValue: ''
        },
        text: {
            type: DataTypes.TEXT,
            allowNull: false,
            defaultValue: ''
        },
        text_ru: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        text_uk: {
            type: DataTypes.TEXT,
            allowNull: true,
            defaultValue: ''
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        title_ru: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        title_uk: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        description: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        description_ru: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        description_uk: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        order: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 999999999
        },
        cod: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        cod1: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        cod2: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        cod3: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        cod4: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        duble: {
            type: DataTypes.STRING(200),
            allowNull: true,
            defaultValue: ''
        },
        search: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        search1: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        search2: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        search3: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        search4: {
            type: DataTypes.STRING(50),
            allowNull: true,
            defaultValue: ''
        },
        main: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        sale: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0.00
        },
        sp_price: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        catalog_group: {
            type: DataTypes.BIGINT,
            allowNull: true,
            defaultValue: 0
        },
        uuid: {
            type: DataTypes.STRING(36),
            allowNull: true
        }
    },
    {
        tableName: 'catalog'
    })
// exports.goods_img = goods_img_store_to
// exports.group_img = group_img_store_to

exports.listOfCatalog = (options) => {
    return connection.list(Catalog, options)
}
exports.updateOrCreateCatalog = (where, newItem) => {
    return connection.updateOrCreate(Catalog, where, newItem)
}
exports.deleteCatalog = (where) => {
    return connection.delete(Catalog, where)
}

exports.getImgPathStr = (modelname, filename) => {
    let imgval = modelname === 'goods' ? goods_img_store_to :  modelname === 'groups' ? group_img_store_to : null
    imgval += filename
    return imgval
}

const getModelFromStr = (modelname) => {
    return modelname === 'goods' ? Catalog :  modelname === 'groups' ? CatalogGroup : modelname === 'price' ? CatalogGoods : null
}

exports.getModelFromStr = getModelFromStr

exports.findByUUID = (modelname, uuid) => {
    return connection.list(getModelFromStr(modelname), {
        where: {
            uuid: uuid
        }
    })
}

exports.findByCod = (modelname, cod) => {
    return connection.list(getModelFromStr(modelname), {
        where: {
            cod: cod
        }
    })
}

exports.catalog = Catalog

const CatalogGoods = DB.define("CatalogGoods",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        cod: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        index: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(6),
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
            type: DataTypes.STRING(36),
            allowNull: true
        }
    },
    {
        tableName: 'catalog_goods'
    }
)
exports.listOfGoods = (options) => {
    return connection.list(CatalogGoods, options)
}
exports.updateOrCreateGoods = (where, newItem) => {
    return connection.updateOrCreate(CatalogGoods, where, newItem)
}
exports.deleteGoods = (where) => {
    return connection.delete(CatalogGoods, where)
}

const CatalogGroup = DB.define("CatalogGroup",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING(12),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        name_ru: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        name_uk: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        forid: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING(6),
            allowNull: false
        },
        alias: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        description_ru: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        description_uk: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        order: {
            type: DataTypes.SMALLINT,
            allowNull: false
        },
        marker: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        img: {
            type: DataTypes.STRING(200),
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
            type: DataTypes.STRING(6),
            allowNull: false
        },
        brend: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        title_ru: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        title_uk: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        keywords: {
            type: DataTypes.STRING(300),
            allowNull: false
        },
        keywords_ru: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        keywords_uk: {
            type: DataTypes.STRING(300),
            allowNull: true
        },
        seo_text: {
            type: DataTypes.TEXT,
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
        tableName: 'catalog_group'
    }
)
exports.group = CatalogGroup

exports.listOfGroups = (options) => {
    return connection.list(CatalogGroup, options)
}
exports.updateOrCreateGroup = (where, newItem) => {
    return connection.updateOrCreate(CatalogGroup, where, newItem)
}
exports.deleteGroup = (where) => {
    return connection.delete(CatalogGroup, where)
}

const SyncSettings = DB.define("SyncSettings",
    {
        id: {
            type: DataTypes.BIGINT,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(200),
            allowNull: false
        },
        name_ru: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        name_uk: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        host_dir_prod: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        host_dir_dev: {
            type: DataTypes.STRING(200),
            allowNull: true
        },
        is_main: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    },{
        tableName: 'settings_sync'
    }
)

exports.findMainSetting = () => {
    return connection.list(SyncSettings,{
        where: {
            is_main: true
        }
    })
}
