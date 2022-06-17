module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("user", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: "Username cant be null"}}
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: "First Name cant be empty"}}
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: "Last Name cant be empty"}}
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: "Email cant be empty"}}
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: { notNull: {msg: "Password cant be empty"}}
        }
    }, {
        timestamps: false,
        tableName: 'users'
    });
    return Users;
};