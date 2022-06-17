const db = require('../models/db.js');
const User = db.users;
const { Op } = require("sequelize");

// obter lista de todos os users menos o proprio perfil
exports.getAllUsers = async (req, res) => {
    try {
        let users = await User.findAll({where: {
            id : {[Op.ne] : req.loggedUserId}
        }});
        if (users.length === 0) {
            return res.status(404).json({ error: "There are no users registered"})
        }
        return res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}

// aceitar uma nova conta ou bloquear um user
exports.updateUser = async (req, res) => {
    try {
        if (req.loggedUserRole === 'admin') {
            let user = await User.findByPk(req.params.userID);

            if (user === null) {
                return res.status(404).json({ error: "User not found" });
            }

            if (user.statusId === req.body.status) {
                return res.status(400).json({ error: "The user already has the status to change."})
            }

            //atualiza o user
            let updateUser = await User.update(req.body, { where: { id: req.params.userID } });
            console.log('cenas', updateUser);
            //verificar se o update foi bem sucedido
            if (updateUser == 1) {
                res.status(200).json({
                    message: "User status changed with success"
                });
            }
        } else {
            return res.status(401).json({
                error: 'You must be authenticated as admin to perform this request.'
            });
        }
    }
    catch (err) {
        res.status(500).json({ error: 'Something went wrong. Please try again later.' });
    }
}