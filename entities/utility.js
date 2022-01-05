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

const filterInt = (value) => {
    if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
        return Number(value);
    return NaN;
}

const parseObj = (obj) => {
    let parsed = {}
    for (let key in obj) {
        // if (key === 'uuid') {
        //     parsed[key] = obj[key]
        //     continue
        // }
        parsed[key] = isNaN(filterInt(obj[key])) ? obj[key] : parseInt(obj[key])
    }
    return parsed
}

const getWhere = (req) => {
    let where = {}
    if (req.query) {
        where = req.query
        delete where.limit
        delete where.page
        delete where.order
    }
    return parseObj(where)
}
exports.where = getWhere

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
