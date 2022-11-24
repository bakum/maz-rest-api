const DivisionsModel = require('../models/divisions.model'),
    utility = require('../../utility')

exports.listOfDevisions = (req, res) => {
    let opt = utility.getOptions(req)
    DivisionsModel.listOfDevisions(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateDivision = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    DivisionsModel.updateOrCreateDivision(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.deleteDivision = (req, res) => {
    let where = utility.where(req)
    DivisionsModel.deleteDivision(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
