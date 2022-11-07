const { DataTypes } = require("sequelize");

const schema = {
	token: DataTypes.STRING,
	userID: DataTypes.STRING,
	date: DataTypes.DATE,
};

module.exports = {
	name: "tokens",
	schema: schema,
};
