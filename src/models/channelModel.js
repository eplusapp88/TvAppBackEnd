const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Channel = sequelize.define("Channel", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Channel;
