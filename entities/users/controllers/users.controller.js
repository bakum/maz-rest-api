const UserModel = require('../models/users.model'),
    utility = require("../../utility")

exports.list = (req, res) => {
    let opt = utility.getOptions(req)
    UserModel.list(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(
            {error: reason.message}
        )
    })
};

exports.updateProfile = async (req, res) => {
    let where = utility.where(req)
    try {
        let result = await UserModel.updateUser(where, req.body)
        res.status(200).send(result)
    } catch (reason) {
        res.status(500).send(
            {error: reason.message}
        )
    }
}
exports.getById = (req, res) => {
    UserModel.findById(req.params.userId)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(
            {error: reason.message}
        )
    })
}
