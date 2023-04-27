const { Ride } = require("../models/ride")


const createRide = async (req, res) => {

    const { idUser } = req.body;
    
    const ride = await Ride.create(idUser);

    res.status(200).send({ ride })
}

module.exports = {
    createRide
}