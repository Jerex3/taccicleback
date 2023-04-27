const connection = require("../config/db");

class Ride {

    static async create(idUser) {
        const [result] = await connection.query('insert into ride ( idColor, creator) values (?,?) ', [ 1, idUser]);

        const [rows] = await connection.query('select * from ride where idRide = ? ', [ result.insertId]);
        console.log(rows);
        return rows[0];
    }
}

exports.Ride = Ride;