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
            return res.status(200).json({ message: "Accommodation created" });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

exports.getAllAccommodations = async (req, res) => {
    try {
        //definir as query strings
        let { zone, nPeople, roomType } = req.query;

        //definir a condição
        let condition = null;

        if (zone) {
            if (condition == null) {
                condition = {
                    zone: { [Op.like]: `%${zone}%` }
                }
            } else {
                condition['zone'] = { [Op.like]: `%${zone}%` };
            }
        }

        if (nPeople) {
            if (condition == null) {
                condition = {
                    nPeople: { [Op.gte]: nPeople }
                }
            } else {
                condition['nPeople'] =
                    { [Op.gte]: nPeople };
            }
        }

        if (roomType) {
            if (condition == null) {
                condition = {
                    roomTypeId: roomType
                }
            } else {
                condition["roomTypeId"] = roomType;
            }
    
        }


        //obter todas as accommodations
        const accommodations = await Accommodation.findAll({where: condition});

        //validar se existe alguma accommodation
        if (accommodations) {
            return res.status(200).json(accommodations);
        } else {
            return res.status(404).json({ error: "No Accommodations available." });
        }
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
}

//remover uma accommodation
exports.deleteAccommodation = async (req, res) => {
    try {
        //procurar o id da accommodation a remover
        const accommodation = await Accommodation.findByPk(req.params.accommodationID);

        //validar se existe a accommodation a remover
        if (!accommodation) {
            return res.status(404).json({ error: "Accommodation not found." });
        }

        //validar se o service provider logado é o owner da accommodation
        if (req.loggedUserId !== accommodation.userId) {
            return res.status(401).json({ error: "You must be the owner of the accommodation to remove it." });
        }

        //remover a accommodation
        const deleteAccommodation = await Accommodation.destroy({ where: { id: req.params.accommodationID } });

        //validar se removeu
        if (deleteAccommodation === 1) {
            return res.status(200).json({ message: "Accommodation deleted." });
        }
    } catch (err) {
        return res.status(500).json({ error: "Something went wrong. Please try again later." });
    }
}

// update accommodation
exports.editAccommodation = (req, res) => {
    try {
        Accommodation.update({
            zone: req.body.zone,
            address: req.body.address,
            temp_available: req.body.temp_available,
            price_range: req.body.price_range,
            nBeds: req.body.nBeds,
            nPeople: req.body.nPeople,
        }, {
            where: {
                id: req.params.accommodationId
            }
        }).then((result) => {
            res.status(200).json({
                message: "accommodation updated!"
            });
        }).catch((error) => {
            res.status(400).send(error)
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}