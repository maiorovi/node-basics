'use strict'

var bcrypt = require("bcrypt-nodejs");
var _ = require("underscore");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user' , {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash: {
            type:DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL,
            allowNull:false,
            validate: {
                len: [7,100]
            },
            set : function(value) {
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        hooks: {
            beforeValidate: function(user, options) {
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        classMethods: {
            authenticate: function(body) {
                return new Promise((resolve, reject) => {

                    if (!_.isString(body.email) || !_.isString(body.password)) {
                            return reject();
                        }

                    this.findOne({
                            where: {
                                email: body.email
                            }
                        }).then((user) => {
                            if (!user) {
                                return reject();
                            } else if (bcrypt.hashSync(body.password, user.salt) === user.password_hash) {
                                return resolve(user.toPublicJSON());
                            } else {
                                return reject();
                            }
                        }, (e) => {
                            reject();
                        });
                });
            }
        },
        instanceMethods: {
            toPublicJSON : function() {
                var json = this.toJSON();

                return _.pick(json, 'email', 'createdAt', 'updatedAt', 'id');
            }

        }
    });
}