const utility = require("../../utility");
const ProfilesModel = require("../../profiles/models/profiles.model");

exports.listOfProfiles = (req, res) => {
    let opt = utility.getOptions(req)
    ProfilesModel.listOfProfiles(opt)
        .then((result) => {
            res.status(200).send(result)
        }).catch(reason => {
        res.status(500).send(reason)
    })
}
exports.updateOrCreateProfile = (req, res) => {
    let where = utility.where(req)
    //where.uuid = req.body.uuid
    ProfilesModel.updateOrCreateProfile(where, req.body).then((result) => {
        res.status(200).send(result)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}

exports.deleteProfile = (req, res) => {
    let where = utility.where(req)
    ProfilesModel.deleteProfile(where).then(result => {
        res.sendStatus(204)
    }).catch(reason => {
        res.status(500).send(reason)
    })
}
