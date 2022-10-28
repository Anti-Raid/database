const { DataTypes } = require("sequelize");

const schema = {
	caseId: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	targetId: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	reason: {
		type: DataTypes.STRING,
	},

	type: {
		type: DataTypes.STRING,
		allowNull: false,
	},

	serverId: {
		type: DataTypes.STRING,
	},

	modId: {
		type: DataTypes.STRING,
	},
};

module.exports = {
	name: "cases",
	schema: schema,
};
