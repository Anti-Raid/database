// Packages
const { Sequelize, Model } = require("sequelize");
const crypto = require("node:fs");
const fs = require("node:fs");
const logger = require("../logger");
require("dotenv").config();

// Connect to PostgreSQL database
const sequelize = new Sequelize({
	dialect: "postgres",
	host: process.env.PGHOST,
	username: "root",
	database: "antiraid",
	password: "antiraid",
	port: 5432,
	logging: (data) => {
		logger.info("PostgreSQL", data);
	},
});

sequelize
	.authenticate()
	.then(() => logger.info("PostgreSQL", "Connected!"))
	.catch((err) =>
		logger.error("PostgreSQL", `Unable to connect.\nError: ${err}`)
	);

// Schemas
const schemaFiles = fs
	.readdirSync("./database/schema")
	.filter((file) => file.endsWith(".js"));
const schemas = {};
const schemaData = {};

for (const file of schemaFiles) {
	const schema = require(`./schemas/${file}`);

	schemaData[schema.name] = schema;
	schemas[schema.name] = sequelize.define(schema.name, schema.schema);
}

// Users
class Users extends Model {
	/**
	 * @param {String} userID
	 * @param {Array} discordUser
	 * @param {Array} guilds
	 * @param {Array} notifications
	 * @param {Array} tokens
	 */
	static async createUser(
		userID,
		discordUser,
		guilds,
		notifications,
		tokens
	) {
		const data = await Users.createUser({
			id: userID,
			discordUser: discordUser,
			guilds: guilds,
			notifications: notifications,
			tokens: tokens,
		});

		Users.sync();

		return data;
	}

	/**
	 * @param {String} userID
	 * @param {Array} discordUser
	 * @param {Array} guilds
	 * @param {Array} notifications
	 * @param {Array} tokens
	 */
	static async updateUser(
		userID,
		discordUser,
		guilds,
		notifications,
		tokens
	) {
		const data = await Users.createUser(
			{
				discordUser: discordUser,
				guilds: guilds,
				notifications: notifications,
				tokens: tokens,
			},
			{
				where: {
					id: userID,
				},
			}
		);

		Users.sync();

		return data;
	}

	/**
	 * @param {String} userID
	 */
	static async deleteUser(userID) {
		const data = await Users.destroy({
			where: {
				id: userID,
			},
		});

		Users.sync();

		return data;
	}

	static async listAll() {
		return await Users.findAll();
	}
}

// User
class User extends Model {
	/**
	 * @param {String} userID
	 * @param {String} bio
	 */
	static async createUser(userID, bio) {
		const data = await User.createUser({
			userID: userID,
			bio: bio,
		});

		User.sync();

		return data;
	}

	/**
	 * @param {String} userID
	 * @param {String} bio
	 */
	static async updateUser(userID, bio) {
		const data = await User.createUser(
			{
				bio: bio,
			},
			{
				where: {
					userID: userID,
				},
			}
		);

		User.sync();

		return data;
	}

	/**
	 * @param {String} userID
	 */
	static async deleteUser(userID) {
		const data = await User.destroy({
			where: {
				userID: userID,
			},
		});

		User.sync();

		return data;
	}

	static async listAll() {
		return await User.findAll();
	}
}

// Tags
class Tags extends Model {
	/**
	 * @param {String} GuildID
	 * @param {String} Command
	 * @param {String} Content
	 */
	static async createTag(GuildID, Command, Content) {
		const data = await Tags.createUser({
			GuildID: GuildID,
			Command: Command,
			Content: Content,
		});

		Tags.sync();

		return data;
	}

	/**
	 * @param {String} GuildID
	 * @param {String} Command
	 * @param {String} Content
	 */
	static async updateTag(GuildID, Command, Content) {
		const data = await Tags.createUser(
			{
				Content: Content,
			},
			{
				where: {
					GuildID: GuildID,
					Command: Command,
				},
			}
		);

		Tags.sync();

		return data;
	}

	/**
	 * @param {String} GuildID
	 * @param {String} Command
	 */
	static async deleteTag(GuildID, Command) {
		const data = await Tags.destroy({
			where: {
				GuildID: GuildID,
				Command: Command,
			},
		});

		Tags.sync();

		return data;
	}

	static async listAll() {
		return await Tags.findAll();
	}
}

// Guilds
class Guilds extends Model {
	/**
	 * @param {String} guildID
	 * @param {JSON} infractions
	 * @param {String} welcomeChannel
	 * @param {String} leaveChannel
	 * @param {String} mod
	 * @param {String} audit
	 * @param {JSON} CanLockChannels
	 * @param {String} mutedrole
	 * @param {String} botautorole
	 * @param {String} autorole
	 * @param {Number} highestCaseId
	 * @param {Number} antispam
	 * @param {Boolean} moderateLinks
	 * @param {Boolean} moderateProfanity
	 * @param {Boolean} moderateWebhooks
	 * @param {Number} warnsForKick
	 * @param {Number} warnsForBan
	 * @param {Number} warnsForMute
	 * @param {String} welcomeMsg
	 * @param {String} leaveMsg
	 * @param {String} EmbedsForJoinLeave
	 * @param {String} AntiRaid
	 */
	static async createGuild(
		guildID,
		infractions,
		welcomeChannel,
		leaveChannel,
		mod,
		audit,
		CanLockChannels,
		mutedrole,
		botautorole,
		autorole,
		highestCaseId,
		antispam,
		moderateLinks,
		moderateProfanity,
		moderateWebhooks,
		warnsForKick,
		warmsForBan,
		warnsForMute,
		welcomeMsg,
		leaveMsg,
		EmbedsForJoinLeave,
		AntiRaid
	) {
		const data = await Guilds.createUser({
			guildID,
			infractions,
			welcomeChannel,
			leaveChannel,
			mod,
			audit,
			CanLockChannels,
			mutedrole,
			botautorole,
			autorole,
			highestCaseId,
			antispam,
			moderateLinks,
			moderateProfanity,
			moderateWebhooks,
			warnsForKick,
			warmsForBan,
			warnsForMute,
			welcomeMsg,
			leaveMsg,
			EmbedsForJoinLeave,
			AntiRaid,
		});

		Guilds.sync();

		return data;
	}

	/**
	 * @param {String} guildID
	 * @param {JSON} infractions
	 * @param {String} welcomeChannel
	 * @param {String} leaveChannel
	 * @param {String} mod
	 * @param {String} audit
	 * @param {JSON} CanLockChannels
	 * @param {String} mutedrole
	 * @param {String} botautorole
	 * @param {String} autorole
	 * @param {Number} highestCaseId
	 * @param {Number} antispam
	 * @param {Boolean} moderateLinks
	 * @param {Boolean} moderateProfanity
	 * @param {Boolean} moderateWebhooks
	 * @param {Number} warnsForKick
	 * @param {Number} warnsForBan
	 * @param {Number} warnsForMute
	 * @param {String} welcomeMsg
	 * @param {String} leaveMsg
	 * @param {String} EmbedsForJoinLeave
	 * @param {String} AntiRaid
	 */
	static async updateGuild(
		guildID,
		infractions,
		welcomeChannel,
		leaveChannel,
		mod,
		audit,
		CanLockChannels,
		mutedrole,
		botautorole,
		autorole,
		highestCaseId,
		antispam,
		moderateLinks,
		moderateProfanity,
		moderateWebhooks,
		warnsForKick,
		warmsForBan,
		warnsForMute,
		welcomeMsg,
		leaveMsg,
		EmbedsForJoinLeave,
		AntiRaid
	) {
		const data = await Guilds.createUser(
			{
				infractions,
				welcomeChannel,
				leaveChannel,
				mod,
				audit,
				CanLockChannels,
				mutedrole,
				botautorole,
				autorole,
				highestCaseId,
				antispam,
				moderateLinks,
				moderateProfanity,
				moderateWebhooks,
				warnsForKick,
				warmsForBan,
				warnsForMute,
				welcomeMsg,
				leaveMsg,
				EmbedsForJoinLeave,
				AntiRaid,
			},
			{
				where: {
					guildID: guildID,
				},
			}
		);

		Guilds.sync();

		return data;
	}

	/**
	 * @param {String} guildID
	 */
	static async deleteGuild(guildID) {
		const data = await Guilds.destroy({
			where: {
				guildID: guildID,
			},
		});

		Guilds.sync();

		return data;
	}

	static async listAll() {
		return await Guilds.findAll();
	}
}

// Cases
class Cases extends Model {
	/**
	 * @param {String} caseId
	 * @param {String} targetId
	 * @param {String} reason
	 * @param {String} type
	 * @param {String} serverId
	 * @param {String} modId
	 */
	static async createCase(caseId, targetId, reason, type, serverId, modId) {
		const data = await Cases.createUser({
			caseId,
			targetId,
			reason,
			type,
			serverId,
			modId,
		});

		Cases.sync();

		return data;
	}

	/**
	 * @param {String} caseId
	 * @param {String} targetId
	 * @param {String} reason
	 * @param {String} type
	 * @param {String} serverId
	 * @param {String} modId
	 */
	static async updateCase(caseId, targetId, reason, type, serverId, modId) {
		const data = await Cases.createUser(
			{
				targetId,
				reason,
				type,
				modId,
			},
			{
				where: {
					caseId: caseId,
					serverId: serverId,
				},
			}
		);

		Cases.sync();

		return data;
	}

	/**
	 * @param {String} caseId
	 * @param {String} serverId
	 */
	static async deleteCase(caseId, serverId) {
		const data = await Cases.destroy({
			where: {
				serverId: serverId,
				caseId: caseId,
			},
		});

		Cases.sync();

		return data;
	}

	static async listAll() {
		return await Cases.findAll();
	}
}

// Initalize Schemas
const init = () => {
	Users.init(schemaData["users"].schema, {
		sequelize: sequelize,
		modelName: schemaData["users"].name,
	});

	User.init(schemaData["user"].schema, {
		sequelize: sequelize,
		modelName: schemaData["user"].name,
	});

	Tags.init(schemaData["tags"].schema, {
		sequelize: sequelize,
		modelName: schemaData["tags"].name,
	});

	Guilds.init(schemaData["guilds"].schema, {
		sequelize: sequelize,
		modelName: schemaData["guilds"].name,
	});

	Cases.init(schemaData["cases"].schema, {
		sequelize: sequelize,
		modelName: schemaData["cases"].name,
	});
};

init();

// Expose Classes
module.exports = {
	Users,
	User,
	Tags,
	Guilds,
	Cases,
};
