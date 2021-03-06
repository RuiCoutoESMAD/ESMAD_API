const db = require('../models/db.js');
const Event = db.event;

//criar event
exports.createEvent = async (req, res) => {
    try {

        //validate request body informations
        if (!req.body || !req.body.address || !req.body.date || !req.body.price || !req.body.eventTypeId) {
            return res.status(400).json({ error: "Please fill all the fields!" });
        }


        // create event object 
        const eventObject = {
            address: req.body.address,
            date: new Date(req.body.date),
            price: req.body.price,
            eventTypeId: req.body.eventTypeId,
            userId: req.loggedUserId
        }
        const eventCreated = await Event.create(eventObject);

        if (eventCreated) {
            return res.status(200).json({ message: "Event created" });
        }
    }
    catch (err) {
        return res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

// obter lista de todos os events 
exports.getAllEvents = async (req, res) => {
    try {
        //definir as query strings
        let { eventType } = req.query;

        //definir a condição
        let condition = null;

        if (eventType) {
            if (condition == null) {
                condition = {
                    eventTypeId: eventType
                }
            } else {
                condition["eventTypeId"] = eventType;
            }
    
        }
        let events = await Event.findAll({where: condition});
        if (events.length === 0) {
            return res.status(404).json({ error: "There are no events registered" })
        }
        return res.status(200).json(events);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

// delete event
exports.deleteEvent = async (req, res) => {
    try {
        Event.destroy({
            where: {
                id: req.params.eventId
            }
        }).then((result) => {
            res.status(200).json({
                message: "Event deleted!"
            })
        }).catch((error) => {
            res.status(400).send(error);
        })
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

// update event
exports.editEvent = (req, res) => {
    try {
        Event.update({
            adress: req.body.adress,
            date: req.body.date,
            price: req.body.price,
        }, {
            where: {
                id: req.params.eventId
            }
        }).then((result) => {
            res.status(200).json({
                message: "event updated!"
            });
        }).catch((error) => {
            res.status(400).send(error)
        });
    } catch (error) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}