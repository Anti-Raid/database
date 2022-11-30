const { DataTypes } = require("sequelize");

const schema = {
	Title: {
		type: DataTypes.STRING,
	},

	Description: {
		type: DataTypes.TEXT,
	},

	Markdown: {
		type: DataTypes.TEXT,
	},

	Identifier: {
		type: DataTypes.STRING,
	},
};

module.exports = {
	name: "blog",
	schema: schema,
};
