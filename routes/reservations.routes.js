//mandar novo para rui
const express = require('express');
const authController = require("../controllers/auth.controllers.js");
const reservationsController = require("../controllers/reservation.controllers.js");

let router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next()
});

router.route('/accommodations/:accommodationID')
    .post(authController.verifyToken, authController.isUser, reservationsController.createReservationAccommodation)

router.route('/:reservationID/accommodations/:accommodationID')
    .patch(authController.verifyToken, authController.isServiceProvider, reservationsController.validateReservationAccommodation)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'RESERVATIONS: what????' });

});

module.exports = router;