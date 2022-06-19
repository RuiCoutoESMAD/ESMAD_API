//mandar novo rui
module.exports = (sequelize, DataTypes) => {
    const Rating = sequelize.define("rating", {
        value: {
            type: DataTypes.INTEGER
        },
        userId: {
            type: DataTypes.INTEGER
        },
        accommodationId: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'ratings'
    });
    return Rating;
};