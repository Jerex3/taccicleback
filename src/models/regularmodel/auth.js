const connection = require("../../config/db");
var jwt = require('jsonwebtoken');
const HttpError = require("../../errors/httpError");


const authUser = async (username, password) => {


    const [rows] = await connection.query('select idUser, name, email from user where name = ? and password = ?', [username, password])

    if (!rows.length) throw new HttpError("Usuario no valido", 401);

    const user = rows[0];

    const token = jwt.sign({ idUser: user.idUser }, process.env.SECRET_KEY);

    return { token, user };

}

const getUserById = async (idUser) => {

    const [rows] = await connection.query('select idUser, name, email from user where idUser = ?', [idUser])

    if (!rows.length) throw new HttpError("Usuario no valido", 401);

    const user = rows[0];

    const token = jwt.sign({ idUser: user.idUser }, process.env.SECRET_KEY);

    return { token, user };

}

const createUser = async (username, password, email) => {
    console.log(username, password, email);
    const [result] = await connection.query('insert into user (name, password, email) values (?, ?, ?)', [username, password, email])
        .catch((err) => {
            console.log(err);
            if (err.code == 'ER_DUP_ENTRY') throw new HttpError("Nombre de usuario o mail existente", 409);

        });
    console.log(username, password, email);
    const [rows] = await connection.query('select idUser, name, email from user where idUser = ?', [result.insertId])

    const user = rows[0];

    const token = jwt.sign({ idUser: user.idUser }, process.env.SECRET_KEY);

    return { token, user };


}


module.exports = {
    authUser,
    createUser,
    getUserById
}