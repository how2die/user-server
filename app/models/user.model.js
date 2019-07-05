'use strict';

const Sequelize = require('sequelize');
const uuid = require('uuid/v4');

module.exports = (sequelize, type) => {
    return sequelize.define('user',
        {
            userid: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: () => uuid()
            },
            username: type.STRING
        },
        {
            indexes: [
                {
                    unique: true,
                    name: 'unique_username',
                    fields: [sequelize.fn('lower', sequelize.col('username'))]
                }
            ]
        }
    );
};
