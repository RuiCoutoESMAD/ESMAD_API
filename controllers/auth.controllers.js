const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const config = require('../config/auth.config.js');
const db = require('../models/db.js');
const User = db.users;
const Roles = db.roles;
const Status = db.status;

//registo
exports.signup = async (req, res) => {
    try {
        // validate duplicate email and username
        let user = await User.findOne({ where: { email: req.body.email } });
        if (user) {
            return res.status(400).json({ message: "Email already in use!" });
        } else if (user = await User.findOne({where: { username: req.body.username }})){
            return res.status(400).json({ message: "Username already in use!" });
        }

        //validate request body informations
        if (!req.body) {
            res.status(400).json({ message: "Request body can not be empty!" });
            return;
        } else if (!req.body.first_name) {
            res.status(400).json({ message: "Please provide first name!" });
            return;
        } else if (!req.body.last_name) {
            res.status(400).json({ message: "Please provide last name!" });
            return;
        } else if (!req.body.email) {
            res.status(400).json({ message: "Please provide email!" });
            return;
        } else if (!req.body.password) {
            res.status(400).json({ message: "Please provide password!" });
            return;
        } else if (!req.body.username) {
            res.status(400).json({ message: "Please provide username!" });
            return;
        } else if (!req.body.repeat_password) {
            res.status(400).json({ message: "Please provide repeat password!" });
            return;
        } else if (req.body.repeat_password !== req.body.password) {
            res.status(400).json({ message: "Passwords do not match!" });
            return;
        }


        // create user object 
        user = await User.create({
            username: req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            roleId: req.body.roleId,
            statusId: req.body.roleId === 1 ? 1 : 3, //validate user role -> role = admin ? status = available : status = pending
        });
        //validate user role
        if (req.body.roleId === 1) {
            return res.json({ message: "Account created!" });
        } else {
            return res.json({ message: "Account created, waiting for admin approval!" });
        }

    }
    catch (err) {
        res.status(500).json({ message: 'Something went wrong. Please try again later.' });
    }
}

// login
exports.signin = async (req, res) => {
    try {
        //validate user email
        let user = await User.findOne({ where: { email: req.body.email } });
        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        //validate user password
        const passwordIsValid = bcrypt.compareSync(
            req.body.password, user.password
        );
        if (!passwordIsValid) {
            return res.status(401).json({
                accessToken: null, message: "Invalid password!"
            });
        }

        //validate user status
        let status = await Status.findByPk(user.statusId);
        if (status.type === 'blocked') {
            return res.status(401).json({
                accessToken: null, message: "Account Blocked!"
            });
        } else if (status.type === 'pending') {
            return res.status(401).json({
                accessToken: null, message: "Account waiting for approval!"
            });
        }

        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 1728000 }); //expira em 20 dias

        let role = await Roles.findByPk(user.roleId)

        return res.status(200).json({
            id: user.id, first_name: user.first_name, last_name: user.last_name, email: user.email, role: role.type, accessToken: token
        });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// verificar token
exports.verifyToken = (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token.replace('Bearer ', ''), config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: "Unauthorized!" });
        }
        req.loggedUserId = decoded.id;
        console.log(decoded.id);
        next();

    })

}

//verificar se é admin
exports.isAdmin = async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let role = await user.getRole();
    req.loggedUserRole = role.type;
    //console.log('role', role.type);
    if (role.type !== 'admin') {
        return res.status(403).send({ message: "You must be authenticated as admin to perform this request!" })
    }
    next();
};

//verificar se é service provider
exports.isServiceProvider = async (req, res, next) => {
    let user = await User.findByPk(req.loggedUserId);
    let role = await user.getRole();
    req.loggedUserRole = role.type;
    //console.log('role', role.type);
    if (role.type !== 'service provider') {
        return res.status(403).send({ message: "You must be authenticated as service provider to perform this request!" })
    }
    next();
};