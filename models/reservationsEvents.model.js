module.exports = (sequelize, DataTypes) => {
    const ReservationEvent = sequelize.define("reservationEvent", {
        validation: {
            type: DataTypes.BOOLEAN
        },
        rating: {
            type: DataTypes.DOUBLE
        }
    }, {
        timestamps: false,
        tableName: 'reservationsEvents'
    });
    return ReservationEvents;
};