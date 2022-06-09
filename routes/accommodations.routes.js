const express = require('express');
const authController = require("../controllers/auth.controllers.js");
const accommodationController = require("../controllers/accommodation.controllers.js");

let router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next()
});

router.route('/')
    .post(authController.verifyToken, authController.isServiceProvider, accommodationController.createAccommodation)
    .get(accommodationController.getAllAccommodations)

router.route('/:accommodationID')
    .delete(authController.verifyToken, authController.isServiceProvider, accommodationController.deleteAccommodation)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'ACCOMMODATIONS: what????' });

});

module.exports = router;