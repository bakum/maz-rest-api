const DiscountModel = require('../models/discount.model'),
    utility = require('../../utility')

exports.listOfDiscounts = (req, res) => {
    let opt = utility.getOptions(req)
    DiscountModel.listOfDiscounts(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateDiscounts = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    DiscountModel.updateOrCreateDiscounts(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.deleteDiscount = (req, res) => {
    let where = utility.where(req)
    DiscountModel.deleteDiscount(where).then(result => {
        res.send({
            deleted: result
        })
    }).catch(reason => {
        res.status(500).send(
            {error: reason.message}
        )
    })
}