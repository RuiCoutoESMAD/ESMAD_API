//mandar novo para rui
const db = require('../models/db.js');
const Accommodation = db.accommodation;
const ReservationAccommodation = db.reservationAccommodation;
const User = db.users;
const CommentReservation = db.commentAccommodation;

//criar reserva para accommodation
exports.createReservationAccommodation = async (req, res) => {
    try {
        //verificar a accommodation existe
        const accommodation = await Accommodation.findByPk(req.params.accommodationID);
        if (!accommodation) {
            return res.status(404).json({ error: "Accommodation not found." });
        }

        //verificar se o user já tem reserva para aquela accommodation
        const reservation = await ReservationAccommodation.findOne({ where: { userId: req.loggedUserId, accommodationId: req.params.accommodationID } });
        if (reservation) {
            return res.status(400).json({ error: "You Already reserved this accommodation." });
        }

        //criar a reserva
        const reservationAccommodation = await ReservationAccommodation.create({
            validation: false,
            userId: req.loggedUserId,
            accommodationId: req.params.accommodationID
        });

        if (reservationAccommodation) {
            return res.status(200).json({ message: "Reservation created waiting for validation." });
        }
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }

}

//validar a reserva para accommodation
exports.validateReservationAccommodation = async (req, res) => {
    try {
        //verificar se a reserva existe
        const reservation = await ReservationAccommodation.findByPk(req.params.reservationID);
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }

        //validar se o service provider logado é o owner da accommodation
        const accommodation = await Accommodation.findByPk(req.params.accommodationID);
        if (!accommodation) {
            return res.status(404).json({ error: "Accommodation not found" });
        }
        if (req.loggedUserId !== accommodation.userId) {
            return res.status(401).json({ error: "You must be the owner of the accommodation to manage it." });
        }

        //verificar se a validação já foi feita
        if (reservation.validation === true) {
            return res.status(400).json({ error: "The accommodation is already validated." });
        }

        //validar a reserva
        const validateReservation = await ReservationAccommodation.update(req.body, { where: { id: req.params.reservationID } });
        if (validateReservation == 1) {
            return res.status(200).json({ message: "Validation accepted" });
        }
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }

}