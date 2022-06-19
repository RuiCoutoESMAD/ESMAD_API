const dbConfig = require('../config/db.config');
const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: 'mysql'
    ,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const db = {};
db.sequelize = sequelize;

db.roles = require('./roles.model.js')(sequelize, DataTypes);
db.status = require('./status.model.js')(sequelize, DataTypes);
db.users = require('./users.model.js')(sequelize, DataTypes);
db.roomType = require('./roomType.model.js')(sequelize, DataTypes);
db.accommodation = require('./accommodation.model.js')(sequelize, DataTypes);
db.event = require('./event.model.js')(sequelize, DataTypes);
db.eventType = require('./eventType.model.js')(sequelize, DataTypes);
db.reservationAccommodation = require('./reservationsAccommodations.model.js')(sequelize, DataTypes); 
db.commentAccommodation = require('./commentsAccommodations.model.js')(sequelize, DataTypes); 
db.commentEvents = require('./commentsEvents.model.js')(sequelize, DataTypes); 
db.reservationEvent = require('./reservationsEvents.model.js')(sequelize, DataTypes);
db.ratings = require('./ratings.model.js')(sequelize, DataTypes);

//relação entre user e role
db.roles.hasMany(db.users);
db.users.belongsTo(db.roles);

//relação entre user e user status
db.status.hasMany(db.users);
db.users.belongsTo(db.status);

//relação entre user e accommodation
db.users.hasMany(db.accommodation);
db.accommodation.belongsTo(db.users);

//relação entre roomType e accommodation
db.roomType.hasMany(db.accommodation);
db.accommodation.belongsTo(db.roomType);

//relação entre user e event
db.users.hasMany(db.event);
db.event.belongsTo(db.users);

//relação entre eventType e event
db.eventType.hasMany(db.event);
db.event.belongsTo(db.eventType);

//relação entre user e reservationAccommodation
db.users.hasMany(db.reservationAccommodation);
db.reservationAccommodation.belongsTo(db.users);

//relação entre accommodation e reservationAccommodation
db.accommodation.hasMany(db.reservationAccommodation);
db.reservationAccommodation.belongsTo(db.accommodation);

//relação entre user e reservationEvent
db.users.hasMany(db.reservationEvent);
db.reservationEvent.belongsTo(db.users);

//relação entre event e reservationEvent
db.event.hasMany(db.reservationEvent);
db.reservationEvent.belongsTo(db.event);


module.exports = db;