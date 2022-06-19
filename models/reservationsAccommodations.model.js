module.exports = (sequelize, DataTypes) => {
    const ReservationAccommodation = sequelize.define("reservationAccommodation", {
        validation: {
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: false,
        tableName: 'reservationsAccommodations'
    });
    return ReservationAccommodation;
};