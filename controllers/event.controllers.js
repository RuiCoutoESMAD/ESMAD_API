const db = require('../models/db.js');
const Event = db.event;

//criar event
exports.createEvent = async (req, res) => {
    try {
        //validate request body informations
        if (!req.body || !req.body.address || !req.body.date || !req.body.price || !req.body.eventTypeId) {
            res.status(400).json({ error: "Please fill all the fields!" });
            return;
        }

        // create event object 
        const event = await Event.create({
            address: req.body.address,
            date: req.body.date,
            price: req.body.price,
            eventTypeId: req.body.eventTypeId,
            userId: req.loggedUserId
        });
        if (event) {
            return res.status(200).json({ message: "Event created"});
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

// obter lista de todos os events 
exports.getAllEvents = async (req, res) => {
    try {
        let events = await Event.findAll();
        if (events.length === 0) {
            return res.status(404).json({ error: "There are no events registered"})
        }
        return res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}