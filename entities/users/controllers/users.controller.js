const UserModel = require('../models/users.model'),
    utility = require("../../utility")

exports.list = (req, res) => {
    let opt = utility.getOptions(req)
    UserModel.list(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
            res.status(500).send(reason)
    })
};

exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
