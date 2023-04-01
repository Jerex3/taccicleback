const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');
const routername = 'user';


const use = fn => (req, res, next) =>
    Promise.resolve(fn(req,res,next)).catch(next);

/* router.use((req, res, next) => {
    next()
}) */

router.post(`/${routername}/uploadAvatar/:id`, use(controller.loadImage));




module.exports = router;

