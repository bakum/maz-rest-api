const OrdersModel = require('../models/orders.model'),
    utility = require('../../utility')
const GoodsModel = require("../../goods/models/goods.model");


exports.listOfOrders = (req, res) => {
    let opt= utility.getOptions(req)
    OrdersModel.listOfOrders(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
