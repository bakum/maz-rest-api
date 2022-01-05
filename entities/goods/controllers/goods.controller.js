const GoodsModel = require('../models/goods.model'),
    utility = require('../../utility'),
    path = require("path"),
    pathUpload = path.join(__dirname, '../../../uploads');

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

exports.FileUpload = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    let file = path.join(pathUpload, req.files.file.name);
    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let uplFl = req.files.file;

    // Use the mv() method to place the file somewhere on your server
    uplFl.mv(file).then(result => {
        res.send('File uploaded!');
    }).catch(err => {
        res.status(500).send(err);
    })
}
