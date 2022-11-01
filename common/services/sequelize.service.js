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

exports.list = async (model, opt) => {
    if (model === null) return err.no_model
    let result = await model.findAndCountAll(opt)
    let page = opt.offset / opt.limit
    result.nexPage = (result.count / opt.offset) > 1.0 ? page + 1 : null
    result.currentPage = page
    result.prevPage = (page = 0.0) ? null : page - 1
    let lastPage = Math.ceil(result.count / opt.limit)
    result.lastPage = lastPage === 0 ? null : lastPage
    return result
}

exports.delete = async (model, where) => {
    return await model.destroy({where})
}

exports.updateOrCreate = async (model, where, newItem) => {
    let foundItem = await model.findOne({where})
    if (!foundItem) {
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
