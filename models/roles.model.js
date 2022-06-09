module.exports = (sequelize, DataTypes) => {
    const Roles = sequelize.define("role", {
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: "User role cant be null"}}
        }
    }, {
        timestamps: false,
        tableName: 'roles'
    });
    return Roles;
};