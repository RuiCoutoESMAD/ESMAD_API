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


module.exports = db;