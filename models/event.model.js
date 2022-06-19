module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define("event", {
        address: {
            type: DataTypes.STRING
        },
        date: {
            type: DataTypes.DATE
        },
        price: {
            type: DataTypes.INTEGER
        },
    }, {
        timestamps: false,
        tableName: 'events'
    });
    return Event;
};