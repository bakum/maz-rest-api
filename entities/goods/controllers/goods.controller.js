const GoodsModel = require('../models/goods.model'),
    utility = require('../../utility'),
    path = require("path"),
    config = require('config'),
    connection = require('../../../common/services/sequelize.service')

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

exports.deleteCatalogWhenUUIDNull = (req, res) => {
    GoodsModel.deleteCatalogWhenUUIDNull().then(result => {
        res.send({
            deleted: result
        })
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

exports.createPrice = (req, res) => {
    GoodsModel.createPrice(req.body).then(result => {
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

exports.deleteGoodsWhenUUIDNull = (req, res) => {
    GoodsModel.deleteGoodsWhenUUIDNull().then(result => {
        res.send({
            deleted: result
        })
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

exports.uploadImg = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({error: 'No files were uploaded.'});
    }

    if (req.params.whatis !== 'goods' && req.params.whatis !== 'groups') {
        return res.status(400).send({error: `I do not know what to do with it - ${req.params.whatis}`})
    }
    try {
        let result = await GoodsModel.findByUUID(req.params.whatis, req.params.ids)
        if (result.count === 0) {
            return res.status(400).send({error: `There is no record for uuid - ${req.params.ids}`})
        }
        let imgval = GoodsModel.getImgPathStr(req.params.whatis, req.files.file.name)
        let file = path.join(req.dir_sett, config.get('media_location'), imgval);
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let uplFl = req.files.file;
        try {
            await uplFl.mv(file)
            let item = result.rows[0].get({plain: true})
            item[req.params.img] = imgval
            delete item.id
            try {
                let r = await connection.update(
                    GoodsModel.getModelFromStr(req.params.whatis),
                    {uuid: req.params.ids},
                    item)
                res.status(200).send(r);
            } catch (e) {
                res.status(500).send(e);
            }
        } catch (e) {
            res.status(500).send(e);
        }
    } catch (err) {
        return res.status(400).send(err)
    }

}

exports.FileUpload = (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({error: 'No files were uploaded.'});
    }

    if (req.params.whatis !== 'catalog' && req.params.whatis !== 'group') {
        return res.status(400).send({error: `I do not know what to do with it - ${req.params.whatis}`})
    }

    GoodsModel.findByUUID(req.params.whatis, req.params.ids)
        .then(result => {
            if (result.count === 0) {
                return res.status(400).send({error: `There is no record for uuid - ${req.params.ids}`})
            }
            let imgval = GoodsModel.getImgPathStr(req.params.whatis, req.files.file.name)
            let file = path.join(req.dir_sett, config.get('media_location'), imgval);
            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            let uplFl = req.files.file;
            // Use the mv() method to place the file somewhere on your server
            uplFl.mv(file).then(result1 => {
                let item = result.rows[0].get({plain: true})
                item[req.params.img] = imgval
                delete item.id
                connection.update(
                    GoodsModel.getModelFromStr(req.params.whatis),
                    {uuid: req.params.ids},
                    item)
                    .then(r => {
                        res.status(200).send(r);
                    }).catch(err => {
                    res.status(500).send(err);
                })
            }).catch(err => {
                res.status(500).send(err);
            })
        })
        .catch(err => {
            return res.status(400).send(err)
        })

}
