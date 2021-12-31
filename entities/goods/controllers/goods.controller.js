const GoodsModel = require('../models/goods.model'),
    utility = require('../../utility')

exports.listOfCatalog = (req, res) => {
    let opt= utility.getOptions(req)
    GoodsModel.listOfCatalog(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.listOfGoods = (req, res) => {
    let opt= utility.getOptions(req)
    GoodsModel.listOfGoods(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.listOfGroups = (req, res) => {
    let opt= utility.getOptions(req)
    GoodsModel.listOfGroups(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
