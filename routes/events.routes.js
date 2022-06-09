const express = require('express');
const authController = require("../controllers/auth.controllers.js");
const eventController = require("../controllers/event.controllers.js");

let router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next()
});

router.route('/')
    .post(authController.verifyToken, authController.isServiceProvider, eventController.createEvent)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'EVENTS: what????' });

});

module.exports = router;