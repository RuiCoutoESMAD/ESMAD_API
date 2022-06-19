const db = require("../models/db");
const Ratings = db.ratings;
const Accommodation = db.accommodation;

exports.createRating = async (req, res) => {
    try {
        if (!req.body || !req.body.value) {
            return res.status(400).json({ error: "Body value can not be empty" });
        }
        //validar se existe a accommodation
        const accommodation = await Accommodation.findByPk(req.params.accommodationID);
        if (!accommodation) {
            return res.status(404).json({ error: "Accommodation not found." });
        }
        //validar se o user ja deu rating ao quarto
        const userRatedAccommodation = await Ratings.findOne({ where: { userId: req.loggedUserId, accommodationId: req.params.accommodationID } });
        if (userRatedAccommodation) {
            return res.status(400).json({ error: "User already rated this accommodation." });
        }
        const rating = {
            value: req.body.value,
            userId: req.loggedUserId,
            accommodationId: req.params.accommodationID
        }
        const createRating = await Ratings.create(rating);

        //obter todos os ratings da accommodation
        const allAccommodationRatings = await Ratings.findAll({ where: { accommodationId: req.params.accommodationID } });
        if (!allAccommodationRatings) {
            return res.status(404).json({ error: "No ratings found for accommodation." });
        }
        //calcular a media de rating
        let sum = 0;
        for (const rating of allAccommodationRatings) {
            sum += rating.value;
        }
        const ratingAverage = sum / allAccommodationRatings.length;
        const updateRatingObject = {
            rating: ratingAverage
        }
        //atualizar o rating da accommodation
        const updateAccommodationRating = await Accommodation.update(updateRatingObject, {where: {id: req.params.accommodationID}})
        if (createRating && updateAccommodationRating) {
            return res.status(201).json({ message: "Accommodation rated." });
        }
    } catch (error) {
        return res.status(500).json({ error: "Something went wrong, please try again later" });
    }
}

exports.getAllRatingsByAccommodation = async (req, res) => {
    try {
        //validar se a accommodation existe
        const accommodation = await Accommodation.findByPk(req.params.accommodationID);
        if (!accommodation) {
            return res.status(404).json({error: "Accommodation not found."});
        }
        //validar se existem ratings para a accommodation
        const accommodationRatings = await Ratings.findAll({where: {accommodationId: req.params.accommodationID}});
        if (!accommodationRatings) {
            return res.status(404).json({error: "No ratings found for accommodation."});
        }
        //validar se o service provider logado é o dono da accommodation
        if (accommodation.userId !== req.loggedUserId) {
            return res.status(401).json({error: "You must be the owner of the accommodation to get ratings."});
        }
        //listar
        return res.status(200).json(accommodationRatings);
    } catch (error) {
        return res.status(500).json({error: "Something went wrong, please try again later"})
    }
}