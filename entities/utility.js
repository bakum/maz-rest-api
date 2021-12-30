const limit = (req) => {
    return req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 25;
}

const page = (req) => {
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    return page
}

const replaceAll = (str, find, replace) => {
    let escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);
}

const getWhere = (req) => {
    let where = {}
    if (req.query) {
        where = req.query
        delete where.limit
        delete where.page
        delete where.order
    }
    return where
}

exports.getOptions = (req) => {
    let options = {}
    options.limit = limit(req)
    options.offset = page(req) * options.limit
    options.where = getWhere(req)
    return options
}

exports.limit = limit
exports.page = page

exports.offset = (req) => {
    return page(req) * limit(req);
}

exports.paginate = (req) => {
    let ret = {}
    ret.limit = limit(req);
    ret.offset = page(req) * ret.limit;
    return ret;
}
