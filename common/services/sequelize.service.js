const config = require('config').get('mysql'),
    {Sequelize} = require('sequelize'),
    logg = (process.env.NODE_ENV !== 'production'),
    err = require('../../common/errorHundler/error.hundler')

const options = {
    host: config.host,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    logging: msg => {
        if (logg) console.log(msg)
    }
}
const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0
}

exports.opjectIsEmpty = isObjectEmpty

exports.list = async (model, opt) => {
    if (model === null) return err.no_model
    //if (!opt.include) opt.include = {all: true, nested: true}
    let result = await model.findAndCountAll(opt)
    let page = opt.offset / opt.limit
    result.nexPage = (result.count / opt.offset) > 1.0 ? page + 2 : null
    result.currentPage = page + 1
    result.prevPage = (page === 0.0) ? null : page
    let lastPage = Math.ceil(result.count / opt.limit)
    result.lastPage = lastPage === 0 ? null : lastPage
    result.nexPage = (result.currentPage === result.lastPage) ? null : result.nexPage
    return result
}

exports.delete = async (model, where) => {
    return await model.destroy({where})
}

exports.deleteWhenNull = async (model) => {
    return await model.destroy({
        where: {
            uuid: null
        },
    })
}

exports.updateOrCreate = async (model, where, newItem) => {
    let foundItem = await model.findOne({where})
    if (!foundItem || isObjectEmpty(where)) {
        return model.create(newItem);
    }

    return await model.update(newItem, {where: where})
}

exports.update = async (model, where, newItem) => {
    return await model.update(newItem, {where: where})
}

exports.db = new Sequelize(
    config.database,
    config.username,
    config.password,
    options
);
