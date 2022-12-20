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

	staff_applications: {
		type: DataTypes.JSON,
		defaultValue: [],
	},

	roles: {
		type: DataTypes.JSON,
		defaultValue: [],
	},

	twoFactorSecret: {
		type: DataTypes.STRING,
	},
};

module.exports = {
	name: "users",
	schema: schema,
};
