const GoodsModel = require('../models/goods.model'),
    utility = require('../../utility')

exports.listOfCatalog = (req, res) => {
    let opt = utility.getOptions(req)
    GoodsModel.listOfCatalog(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.updateOrCreateCatalog = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    GoodsModel.updateOrCreateCatalog(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.deleteCatalog = (req, res) => {
    let where = utility.where(req)
    GoodsModel.deleteCatalog(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.listOfGoods = (req, res) => {
    let opt = utility.getOptions(req)
    GoodsModel.listOfGoods(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateGoods = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    GoodsModel.updateOrCreateGoods(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.deleteGoods = (req, res) => {
    let where = utility.where(req)
    GoodsModel.deleteGoods(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.listOfGroups = (req, res) => {
    let opt = utility.getOptions(req)
    GoodsModel.listOfGroups(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateGroup = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    GoodsModel.updateOrCreateGroup(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.deleteGroup = (req, res) => {
    let where = utility.where(req)
    GoodsModel.deleteGroup(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
