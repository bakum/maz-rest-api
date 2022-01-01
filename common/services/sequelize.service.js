const config = require('../../common/config/env.config'),
    {Sequelize} = require('sequelize'),
    argv = require('./argv.service'),
    logg = (argv.env() === 'development');

const options = {
    host: config.mysql.host,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    logging: logg
}

exports.delete = async (model,where) =>{
    let foundItem = await model.findOne({where})
    if (!foundItem) {
        return {error: 'row not found'};
    }
    return await model.destroy({where})
}

exports.updateOrCreate = async (model, where, newItem) => {
    let foundItem = await model.findOne({where})
    if (!foundItem) {
        return model.create(newItem);
    }

    return await model.update(newItem, {where: where})

    // First try to find the record
    // return model
    //     .findOne({where: where})
    //     .then(foundItem => {
    //         if (!foundItem) {
    //             // Item not found, create a new one
    //             return model
    //                 .create(newItem)
    //                 .then(function (item) {
    //                     return {item: item, created: true};
    //                 })
    //         }
    //         // Found an item, update it
    //         return model
    //             .update(newItem, {where: where})
    //             .then(item => {
    //                 return {item: item, created: false}
    //             });
    //     })
}


exports.db = new Sequelize(
    config.mysql.database,
    config.mysql.username,
    config.mysql.password,
    options
);
