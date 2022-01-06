const GoodsModel = require('../../entities/goods/models/goods.model')

exports.SettingsIsSet = (req, res, next) => {
    GoodsModel.findMainSetting()
        .then(result => {
            if (result.count === 0) {
                return res.status(400).send({error:'Setting is not set'});
            }
            let dir = process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'testing' ? result.rows[0].dataValues['host_dir_dev'] : result.rows[0].dataValues['host_dir_prod']
            req.dir_sett = dir
            return next()
        }).catch(err => {
        return res.status(400).send();
    })
}
