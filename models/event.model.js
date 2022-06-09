module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("event", {
        address: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.STRING
        },
        price: {
            type: DataTypes.STRING
        },
    }, {
        timestamps: false,
        tableName: 'events'
    });
    return Event;
};