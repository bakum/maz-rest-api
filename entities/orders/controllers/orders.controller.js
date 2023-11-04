const OrdersModel = require('../models/orders.model'),
    utility = require('../../utility')


exports.listOfOrders = (req, res) => {
    let opt = utility.getOptions(req)
    OrdersModel.listOfOrders(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.listOfOrderItems = (req, res) => {
    let opt = utility.getOptions(req)
    OrdersModel.listOfOrderItems(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.listOfDelivery = (req, res) => {
    let opt = utility.getOptions(req)
    OrdersModel.listOfDelivery(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateOrder = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    OrdersModel.updateOrCreateOrder(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.clearSyncOrders = async (req, res) => {
    let where = utility.where(req)
    try {
        let result = await OrdersModel.clearSyncOrders(where)
        res.status(200).send(result)
    } catch (e) {
        res.status(500).send(e.message)
    }
}
exports.updateOrCreateOrderItem = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    OrdersModel.updateOrCreateOrderItem(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateDelivery = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    OrdersModel.updateOrCreateDelivery(where, req.body).then((result) => {
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
exports.deleteOrderItem = (req, res) => {
    let where = utility.where(req)
    OrdersModel.deleteOrderItem(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.deleteDelivery = (req, res) => {
    let where = utility.where(req)
    OrdersModel.deleteDelivery(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
