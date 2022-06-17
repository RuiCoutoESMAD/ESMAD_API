module.exports = (sequelize, DataTypes) => {
    const Status = sequelize.define("status", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: "Type of status cant be null"}}
        }
    }, {
        timestamps: false,
        tableName: 'status'
    });
    return Status;
};