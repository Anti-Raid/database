const { DataTypes } = require("sequelize");

const schema = {
	id: {
		type: DataTypes.STRING,
		primaryKey: true,
	},

	discordUser: {
		type: DataTypes.JSON,
		defaultValue: [],
	},

	guilds: {
		type: DataTypes.JSON,
		defaultValue: [],
	},

	notifications: {
		type: DataTypes.JSON,
		defaultValue: [],
	},

	tokens: {
		type: DataTypes.JSON,
		defaultValue: [],
	},
};

module.exports = {
	name: "users",
	schema: schema,
};
