module.exports = (sequelize, DataTypes) => {
    const RoomType = sequelize.define("roomType", {
        type: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'roomType'
    });
    return RoomType;
};