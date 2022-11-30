const { DataTypes } = require("sequelize");

const schema = {
	UserID: {
		type: DataTypes.STRING,
	},

	Identifier: {
		type: DataTypes.STRING,
	},

	Service: {
		type: DataTypes.STRING,
	},

	VoteTime: {
		type: DataTypes.DATE,
	},

	ExpiryDate: {
		type: DataTypes.DATE,
	},
};

module.exports = {
	name: "votes",
	schema: schema,
};
