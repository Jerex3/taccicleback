const connection = require("../config/db");
var jwt = require('jsonwebtoken');
const HttpError = require("../errors/httpError");
const { generateUrlAvatarByFolder } = require("./image");
const { User } = require("./user");


const authUser = async (username, password) => {


   const user = await User.findByUsernamePassword(username, password);

    const token = jwt.sign({ idUser: user.idUser }, process.env.SECRET_KEY);

    return { token, user };

}

const getUserById = async (idUser) => {

    const user = await User.findOne(idUser);

    const token = jwt.sign({ idUser: user.idUser }, process.env.SECRET_KEY);

    return { token, user };

}

const createUser = async (username, password, email, avatar) => {

    const [result] = await connection.query('insert into user (username, password, email, avatar) values (?, ?, ?, ?)', [username, password, email, avatar])
        .catch((err) => {
                        
            if (err.code == 'ER_DUP_ENTRY') throw new HttpError("Nombre de usuario o mail existente", 409);

        });

    const idUser = result.insertId;
    
    const user = await User.findOne(idUser);

    const token = jwt.sign({ idUser: user.idUser }, process.env.SECRET_KEY);

    return { token, user };


}

const updateAvatar = async (avatar, idUser) => {
    await connection.query('update user set avatar = ? where idUser = ?', [avatar, idUser]);
    return true;
}


module.exports = {
    authUser,
    createUser,
    getUserById,
    updateAvatar
}