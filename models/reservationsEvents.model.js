module.exports = (sequelize, DataTypes) => {
    const ReservationEvents = sequelize.define("reservationEvent", {
    }, {
        timestamps: false,
        tableName: 'reservationsEvents'
    });
    return ReservationEvents;
};