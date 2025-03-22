const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Adjust the path to your Sequelize instance

const User = sequelize.define("User", {
    name: { type: DataTypes.STRING, allowNull: false },
    gender: { type: DataTypes.STRING },
    age: { type: DataTypes.INTEGER },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
  });

module.exports = User;
