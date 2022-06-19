module.exports = (sequelize, DataTypes) => {
    const CommentEvents = sequelize.define("commentEvent", {
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
        tableName: 'commentsReservations'
    });
    return CommentEvents;
};