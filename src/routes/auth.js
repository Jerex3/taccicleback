const express = require('express');
const router = express.Router();
const controller = require('../controllers/auth');
const routername = 'auth';


const use = fn => (req, res, next) =>
    Promise.resolve(fn(req,res,next)).catch(next);

/* router.use((req, res, next) => {
    next()
}) */

router.post(`/${routername}/signin`, use(controller.signin));

router.post(`/${routername}/register`, use(controller.register));

router.get(`/${routername}/verify`, use(controller.verify));


module.exports = router;

