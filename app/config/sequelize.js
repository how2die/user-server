'use strict';

const Sequelize = require('sequelize');

const database = process.env.DB_DATABASE;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const sequelize = new Sequelize(database, username, password, {
    host: "postgres",
    dialect: "postgres",
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize
    .authenticate()
    .then(() => { console.log('Database connection has been successfully established!'); })
    .catch(err => { console.log('Unable to connect to the database: ', err) });

const User_model = require('../models/user.model');
const User = User_model(sequelize, Sequelize);

sequelize
    .sync()
    .then(() => { console.log('Models synced and tables ready!'); })
    .catch(() => { console.log('Error syncing models') });

module.exports = {
    User: User
}
