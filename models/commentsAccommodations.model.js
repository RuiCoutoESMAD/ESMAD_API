module.exports = (sequelize, DataTypes) => {
    const CommentAccommodation = sequelize.define("commentAccommodation", {
        comment: {
            type: DataTypes.STRING
        },
        userId: {
            type: DataTypes.INTEGER
        },
        reservationId: {
            type: DataTypes.INTEGER
        }
    }, {
        timestamps: false,
        tableName: 'commentsAccommodations'
    });
    return CommentAccommodation;
};