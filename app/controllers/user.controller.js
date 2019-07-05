'use strict';

const sequelize = require('sequelize');
const rp = require('request-promise-native');
const { User } = require('../config/sequelize')

const authHost = process.env.AUTH_HOST;
const authPort = process.env.AUTH_PORT;

const createCredentials = (userid, password) => {
    let path = "http://" + authHost + ":" + authPort + "/api/auth/credentials/" + userid;
    return rp.put(path, { json: { userid: userid, password: password } });
}

const validateCredentials = (userid, password) => {
    let path = "http://" + authHost + ":" + authPort + "/api/auth/tokens";
    return rp.post(path, { json: { userid: userid, password: password } });
}

exports.registerUser = (req, res) => {
    if (!req.body.username) {
        res.status(400).send("enter a username");
    } else if (!req.body.password) {
        res.status(400).send("enter a password");
    } else {
        User.create({ username: req.body.username })
            .then(user => {
                createCredentials(user.userid, req.body.password)
                    .then(() => validateCredentials(user.userid, req.body.password))
                    .then(token => {
                        res.status(201).send({ userid: user.userid, username: user.username, token: token });
                    })
                    .catch(err => res.status(500).send(err.message));
            })
            .catch(() => res.status(409).send("username taken"));
    }
}

exports.loginUser = (req, res) => {
    User.findAll({
        limit: 1,
        where: {
            username: sequelize.where(sequelize.fn(
                'LOWER', sequelize.col('username')), 'LIKE', '%' + req.body.username.toLowerCase() + '%')
        }
    }).then(users => {
        if (users.length < 1) {
            res.status(401).send("wrong username or password");
        } else {
            validateCredentials(users[0].userid, req.body.password)
                .then(token => {
                    res.status(201).send({ token: token });
                })
                .catch(() => res.status(401).send("wrong username or password"));
        }
    }).catch(err => res.status(500).send(err.message));
}

exports.getUserById = (req, res) => {
    User.findByPk(req.params.userid)
        .then(user => res.status(200).send({ userid: user.userid, username: user.username }))
        .catch(() => res.sendStatus(404));
}
