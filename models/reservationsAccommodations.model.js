module.exports = (sequelize, DataTypes) => {
    const ReservationAccommodation = sequelize.define("reservationAccommodation", {
        validation: {
            type: DataTypes.BOOLEAN
        },
        rating: {
            type: DataTypes.DOUBLE
        }
    }, {
        timestamps: false,
        tableName: 'reservationsAccommodations'
    });
    return ReservationAccommodation;
};