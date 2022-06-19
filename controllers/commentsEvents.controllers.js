const db = require('../models/db.js');
const Events = db.event;
const CommentEvents = db.commentEvents;
const reservationEvent = db.reservationEvent;

exports.createComment = async (req, res) => {
    try {
        const reservation = await reservationEvent.findByPk(req.params.reservationID);
        //validar se a reserva existe
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        //validar se o user é o que fez a reserva
        if (reservation.userId !== req.loggedUserId) {
            return res.status(403).json({ error: "You must be the owner of reservation to comment the reservation." });
        }
        //validar se a reserva é a reserva da event
        if ((reservation.eventId).toString() !== req.params.eventID) {
            return res.status(400).json({ error: "This reservation is not for the event selected." });
        }

        //criar o comentario
        const comment = {
            comment: req.body.comment,
            userId: Number(req.loggedUserId),
            reservationId: Number(req.params.reservationID)
        }

        const createComment = await CommentEvents.create(comment);

        if (createComment) {
            return res.status(201).json({ message: "Comment created" });
        }
    } catch (error) {
        return res.status(500).json({error: "Something went wrong. Please try again later."});
    }
}

exports.getEventsComments = async (req, res) => {
    try {
        //ver se existe a reserva
        const reservation = await reservationEvent.findByPk(req.params.reservationID);
        if (!reservation) {
            return res.status(404).json({error: "Reservation not found."});
        }
        //ver se a reserva é da accommodation
        if ((reservation.eventId).toString() !== req.params.eventID) {
            return res.status(403).json({error: "This reservation is not for the event selected."});
        }
        //ver se existe comentarios para a reserva
        const comments = await CommentEvents.findAll({where: {
            reservationId: req.params.reservationID
        }});
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong. Please try again later."});
    }
}

exports.deleteEventComment = async (req, res) => {
    try {
        //validar se existe a reserva
        const reservation = await reservationEvent.findByPk(req.params.reservationID);
        if (!reservation) {
            return res.status(404).json({error: "Reservation not found."});
        }
        //validar se a reserva é da accommodation
        if ((reservation.eventId) != req.params.eventsID) {
            return res.status(403).json({error: "This reservation is not for the event selected."});
        }
        //validar se existe o comentário
        const comment = await CommentEvents.findByPk(req.params.commentID);
        if (!comment) {
            return res.status(404).json({error: "No comment found."});
        }
        //validar se o user que fez o comment é o logado
        if (comment.userId !== req.loggedUserId) {
            return res.status(401).json({error: "Only the comment owner can delete this comment."});
        }
        const deleteComment = await CommentEvents.destroy({ where: { id: req.params.commentID } });

        //validar se removeu
        if (deleteComment === 1) {
            return res.status(200).json({ message: "Comment deleted." });
        }
    } catch (error) {
        return res.status(500).json({error: "Something went wrong. Please try again later."})
    }
}