module.exports = (sequelize, DataTypes) => {
    const EventType = sequelize.define("eventType", {
        type: {
            type: DataTypes.STRING
        }
    }, {
        timestamps: false,
        tableName: 'eventType'
    });
    return EventType;
};