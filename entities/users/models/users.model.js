const {DataTypes} = require('sequelize'),
    connection = require('../../../common/services/sequelize.service'),
    DB = connection.db

const User = DB.define("User",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        last_login: {
            type: DataTypes.DATE,
            allowNull: false
        },
        is_superuser: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING(150),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(254),
            allowNull: false
        },
        is_staff: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        date_joined: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: 'auth_user'
    }
)

const WagProfile = DB.define("WagProfile",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        submitted_notifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        approved_notifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        rejected_notifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        preferred_language: {
            type: DataTypes.STRING(10),
            allowNull: false
        },
        current_time_zone: {
            type: DataTypes.STRING(40),
            allowNull: false
        },
        avatar: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        updated_comments_notifications: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    },
    {
        tableName: 'wagtailusers_userprofile'
    }
)

WagProfile.belongsTo(User, {foreignKey: 'user_id'})
User.hasOne(WagProfile, {foreignKey: 'user_id'})

exports.user = User
exports.userprofile = WagProfile

exports.list = (options) => {
    //options.include = require('../../profiles/models/profiles.model').profile
    options.include = {all: true, nested: true}
    return connection.list(User, options)
}

exports.findById = (id) => {
    return connection.list(User, {
        where: {
            id: parseInt(id)
        }
    })
}

exports.findByEmail = (email) => {
    return connection.list(User, {
        where: {
            email: email,
            is_active: true
        }
    })
}

exports.updateUser = async (where, newItem) => {
    if (connection.objectIsEmpty(where)) {
        throw new Error('Selection condition missing')
    }
    const Profile = require('../../profiles/models/profiles.model').profile
    let items = newItem.Profile || undefined
    if (items) {
        if (Array.isArray(items)) {
            items.map(async (itm) => {
                await connection.updateOrCreate(Profile, {id: itm.id}, itm)
            })
        } else {
            let result = await connection.updateOrCreate(Profile, {id: items.id}, items)
        }
    }
    return connection.list(User, {
        where: {
            id: newItem.id
        },
        include: {
            all: true,
            nested: true}
    })
}
