const db = require('../models/db.js');
const Accommodation = db.accommodation;
const CommentAccommodation = db.commentAccommodation;
const reservationAccommodation = db.reservationAccommodation;

exports.createComment = async (req, res) => {
    try {
        const reservation = await reservationAccommodation.findByPk(req.params.reservationID);
        //validar se a reserva existe
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found" });
        }
        //validar se o user é o que fez a reserva
        if (reservation.userId !== req.loggedUserId) {
            return res.status(403).json({ error: "You must be the owner of reservation to comment the reservation." });
        }
        //validar se a reserva já foi aceite
        if (reservation.validation === false) {
            return res.status(400).json({ error: "Reservation not validated yet." });
        }
        //validar se a reserva é a reserva da accommodation
        if ((reservation.accommodationId).toString() !== req.params.accommodationID) {
            return res.status(400).json({ error: "This reservation is not for the accommodation selected." });
        }

        //criar o comentario
        const comment = {
            comment: req.body.comment,
            userId: Number(req.loggedUserId),
            reservationId: Number(req.params.reservationID)
        }

        const createComment = await CommentAccommodation.create(comment);

        if (createComment) {
            return res.status(201).json({ message: "Comment created" });
        }
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }

}

exports.getCommentsReservationAccommodation = async (req, res) => {
    try {
        //ver se existe a reserva
        const reservation = await reservationAccommodation.findByPk(req.params.reservationID);
        if (!reservation) {
            return res.status(404).json({error: "Reservation not found."});
        }
        //ver se a reserva é da accommodation
        if ((reservation.accommodationId).toString() !== req.params.accommodationID) {
            return res.status(403).json({error: "This reservation is not for the accommodation selected."});
        }
        //ver se existe comentarios para a reserva
        const comments = await CommentAccommodation.findAll({where: {
            reservationId: req.params.reservationID
        }});
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong. Please try again later."});
    }
}

exports.deleteCommentsReservationAccommodation = async (req, res) => {
    try {
        //validar se existe a reserva
        const reservation = await reservationAccommodation.findByPk(req.params.reservationID);
        if (!reservation) {
            return res.status(404).json({error: "Reservation not found."});
        }
        //validar se a reserva é da accommodation
        if ((reservation.accommodationId).toString() !== req.params.accommodationID) {
            return res.status(403).json({error: "This reservation is not for the accommodation selected."});
        }
        //validar se existe o comentário
        const comment = await CommentAccommodation.findByPk(req.params.commentID);
        if (!comment) {
            return res.status(404).json({error: "No comment found."});
        }
        //validar se o user que fez o comment é o logado
        if (comment.userId !== req.loggedUserId) {
            return res.status(401).json({error: "Only the comment owner can delete this comment."});
        }
        const deleteComment = await CommentAccommodation.destroy({ where: { id: req.params.commentID } });

        //validar se removeu
        if (deleteComment === 1) {
            return res.status(200).json({ message: "Comment deleted." });
        }
    } catch (error) {
        return res.status(500).json({error: "Something went wrong. Please try again later."})
    }
}