const express = require('express');
const router = express.Router();
const controller = require('../controllers/ride');
const routername = 'user';


const use = fn => (req, res, next) =>
    Promise.resolve(fn(req,res,next)).catch(next);

router.post(`/ride`, use(controller.createRide));




module.exports = router;

