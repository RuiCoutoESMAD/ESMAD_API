const db = require('../models/db.js');
const Accommodation = db.accommodation;

//criar accommodation
exports.createAccommodation = async (req, res) => {
    try {
        //validate request body informations
        if (!req.body || !req.body.zone || !req.body.address || !req.body.temp_available || !req.body.price_range || !req.body.nBeds || !req.body.nPeople || !req.body.roomTypeId) {
            res.status(400).json({ error: "Please fill all the fields!" });
            return;
        }

        // create accommodation object 
        const accommodation = await Accommodation.create({
            zone: req.body.zone,
            address: req.body.address,
            temp_available: req.body.temp_available,
            price_range: req.body.price_range,
            nBeds: req.body.nBeds,
            nPeople: req.body.nPeople,
            rating: 0,
            roomTypeId: req.body.roomTypeId,
            userId: req.loggedUserId
        });
        if (accommodation) {
            return res.status(200).json({ message: "Accommodation created"});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}