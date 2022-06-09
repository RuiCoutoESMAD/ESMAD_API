const express = require('express');
let router = express.Router();
const usersController = require('../controllers/users.controller.js');
const authController = require('../controllers/auth.controllers.js');

router.use((req, res, next) => {
    const start = Date.now();
    res.on("finish", () => { //finish event is emitted once the response is sent to the client
        const diffSeconds = (Date.now() - start) / 1000; //figure out how many seconds elapsed
        console.log(`${req.method} ${req.originalUrl} completed in ${diffSeconds} seconds`);
    });
    next()
})

router.route('/')
    .get(authController.verifyToken, authController.isAdmin, usersController.getAllUsers)

router.route('/:userID')
    .patch(authController.verifyToken, authController.isAdmin, usersController.updateUser)


router.all('*', function (req, res) {
    res.status(404).json({ message: 'USERS: what???' });
})
module.exports = router;