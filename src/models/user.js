const connection = require("../config/db");
const { generateUrlAvatarByFolder } = require("./image");
const HttpError = require("../errors/httpError");


class User {


    static findOne = async (idUser) => {
        
        const [rows] = await connection.query('select * from user where idUser = ?', [idUser]);
        
        if (!rows.length) throw new HttpError("Usuario no valido", 401);

        const user = rows[0];
        user.avatar = generateUrlAvatarByFolder(user.avatar);
       
        return user;
    }

    static findByUsernamePassword = async (username, password) => {
        
        const [rows] = await connection.query('select * from user where name = ? and password = ?', [username, password])
        
        if (!rows.length) throw new HttpError("Usuario no valido", 401);

        const user = rows[0];
        user.avatar = generateUrlAvatarByFolder(user.avatar);
       
        return user;
    }

}

exports.User = User;