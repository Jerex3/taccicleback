const jwt = require('jsonwebtoken');
const db = require('../config/db');
const HttpError = require('../errors/httpError');
const { authUser, createUser, getUserById } = require('../models/auth');

const signin = async (req, res, next) => {

    const { username, password } = req.body;

    const { token, user } = await authUser(username, password);

    res.status(200).send({ token, user })
}

const register = async (req, res, next) => {

    const { username, password, email, avatar } = req.body;
    
    const { token, user } = await createUser(username, password, email, avatar)

    res.status(200).send({ token, user })
}

const verify = async (req, res, next) => {

    try {
 
        const tokenRequest = req.header('x-token');

        const value = jwt.decode(tokenRequest);

        if (!Number.isInteger(value.idUser)) throw new HttpError("invalid token", 401);
        const { token, user } = await getUserById(value.idUser);
        console.log(user);

        res.status(200).send({ token, user })

    } catch (e) {
        throw new HttpError("invalid token", 401);
    }


}

module.exports = {
    signin,
    register,
    verify
}

