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
    return await model.findAndCountAll(opt);
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
