const OrdersModel = require('../models/orders.model'),
    utility = require('../../utility')


exports.listOfOrders = (req, res) => {
    let opt= utility.getOptions(req)
    OrdersModel.listOfOrders(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateOrder = (req, res) => {
    let where = utility.where(req)
    where.uuid = req.body.uuid
    OrdersModel.updateOrCreateOrder(where,req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.deleteOrder = (req, res) => {
    let where = utility.where(req)
    OrdersModel.deleteOrder(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
