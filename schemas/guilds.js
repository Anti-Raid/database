const { DataTypes } = require("sequelize");

const schema = {
	guildID: {
		type: DataTypes.STRING,
	},

	infractions: {
		type: DataTypes.JSON,
	},

	// Channels
	welcomeChannel: {
		type: DataTypes.STRING,
	},

	leaveChannel: {
		type: DataTypes.STRING,
	},

	mod: {
		type: DataTypes.STRING,
	},

	audit: {
		type: DataTypes.STRING,
	},

	CanLockChannels: {
		type: DataTypes.JSON,
	},

	// Roles
	mutedrole: {
		type: DataTypes.STRING,
	},

	botautorole: {
		type: DataTypes.STRING,
	},

	autorole: {
		type: DataTypes.STRING,
	},

	// Important Settings
	highestCaseId: {
		type: DataTypes.STRING,
	},

	// Auto-Mod Settings
	antispam: {
		type: DataTypes.STRING, // 0: no antispam, 1: basic, 2: moderate, 3: severe
	},

	moderateLinks: {
		type: DataTypes.BOOLEAN,
	},

	moderateProfanity: {
		type: DataTypes.BOOLEAN,
	},

	moderateWebhooks: {
		type: DataTypes.BOOLEAN,
	},

	warnsForKick: {
		type: DataTypes.STRING,
	},

	warnsForBan: {
		type: DataTypes.STRING,
	},

	warnsForMute: {
		type: DataTypes.STRING,
	},

	// Saved Messages
	welcomeMsg: {
		type: DataTypes.STRING,
	},

	leaveMsg: {
		type: DataTypes.STRING,
	},

	EmbedsForJoinLeave: {
		type: DataTypes.STRING,
	},

	AntiRaid: {
		type: DataTypes.STRING,
	},
};

module.exports = {
	name: "guilds",
	schema: schema,
};
