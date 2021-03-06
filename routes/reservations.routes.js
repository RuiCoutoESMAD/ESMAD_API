const express = require('express');
const authController = require("../controllers/auth.controllers.js");
const reservationsController = require("../controllers/reservation.controllers.js");
const commentsAccommodationsController = require('../controllers/commentsAccommodations.controller.js');
const commentsEventsController = require('../controllers/commentsEvents.controllers.js');

let router = express.Router();

router.use((req, res, next) => {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next()
});

router.route('/accommodations/:accommodationID')
    .post(authController.verifyToken, authController.isUser, reservationsController.createReservationAccommodation)
    .get(authController.verifyToken, authController.isServiceProvider, reservationsController.getAllReservationsForAccommodation)

router.route('/:reservationID/accommodations/:accommodationID')
    .patch(authController.verifyToken, authController.isServiceProvider, reservationsController.validateReservationAccommodation)
    .post(authController.verifyToken, authController.isUser, commentsAccommodationsController.createComment)
    .get(authController.verifyToken, authController.isSpOrAdmin, commentsAccommodationsController.getCommentsReservationAccommodation)

router.route('/:reservationID/accommodations/:accommodationID/comments/:commentID')
    .delete(authController.verifyToken, authController.isUser, commentsAccommodationsController.deleteCommentsReservationAccommodation)

router.route('/:reservationID/events/:eventsID/comments/:commentID')
    .delete(authController.verifyToken, authController.isUser, commentsEventsController.deleteEventComment)

router.route('/events/:eventID')
    .post(authController.verifyToken, authController.isUser, reservationsController.createReservationEvent)
    .get(authController.verifyToken, authController.isServiceProvider, reservationsController.getAllReservationsForEvent)

router.route('/:reservationID/events/:eventID')
    .post(authController.verifyToken, authController.isUser, commentsEventsController.createComment)
    .get(authController.verifyToken, authController.isSpOrAdmin, commentsEventsController.getEventsComments)

router.route('/reservation/accommodation/:reservationID')
    .get(authController.verifyToken, authController.isServiceProvider, reservationsController.getReservationForAccommodation)

router.route('/reservation/event/:reservationID')
    .get(authController.verifyToken, authController.isServiceProvider, reservationsController.getReservationForEvent)

router.all('*', function (req, res) {
    res.status(404).json({ message: 'RESERVATIONS: what????' });

});

module.exports = router;