module.exports = (sequelize, DataTypes) => {
    const Accommodation = sequelize.define("accommodation", {
        zone: {
            type: DataTypes.STRING
        },
        address: {
            type: DataTypes.STRING
        },
        temp_available: {
            type: DataTypes.STRING
        },
        price_range: {
            type: DataTypes.STRING
        },
        nBeds: {
            type: DataTypes.INTEGER
        },
        nPeople: {
            type: DataTypes.INTEGER
        },
        rating: {
            type: DataTypes.DOUBLE
        }
    }, {
        timestamps: false,
        tableName: 'accommodations'
    });
    return Accommodation;
};