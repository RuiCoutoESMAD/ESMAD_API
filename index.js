require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;

//declare variables
const auth = require('./routes/auth.routes.js');
const users = require('./routes/user.routes.js');
const accommodations = require('./routes/accommodations.routes.js');
const reservations = require('./routes/reservations.routes.js');

//enable parsing JSON body data
app.use(express.json());

// root route -- /api/
app.get('/', function (req, res) {
    res.status(200).json({ message: 'Home -- Students Association API' });
});

// routing middleware
app.use('/auth', auth)
app.use('/users', users)
app.use('/accommodations', accommodations)
app.use('/reservations', reservations)

// handle invalid routes
app.get('*', function (req, res) {
    res.status(404).json({ message: 'WHAT???' });
})

// start listening to client requests
app.listen(port, function() {
    console.log(`Server running at http://localhost:${port}`);
})