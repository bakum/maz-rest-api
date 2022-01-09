const config = require('../../common/config/env.config'),
    {Sequelize} = require('sequelize'),
    logg = (process.env.NODE_ENV !== 'production'),
    err = require('../../common/errorHundler/error.hundler')

const options = {
    host: config.mysql.host,
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

exports.db = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    options
);
