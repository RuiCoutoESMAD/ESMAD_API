//mandar novo para rui
module.exports = (sequelize, DataTypes) => {
    const CommentAccommodation = sequelize.define("commentAccommodation", {
        comment: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'commentsAccommodations'
    });
    return CommentAccommodation;
};