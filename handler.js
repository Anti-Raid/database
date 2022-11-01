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
	.readdirSync("./database/schemas")
	.filter((file) => file.endsWith(".js"));
const schemas = {};
const schemaData = {};

for (const file of schemaFiles) {
	const schema = require(`./schemas/${file}`);

	schemaData[schema.name] = schema;
	schemas[schema.name] = sequelize.define(schema.name, schema.schema);
}

// Sync schemas
sequelize.sync();

// Users
class Users extends Model {
	/**
	 * @param {String} userID
	 */
	static async getUser(userID) {
		const data = await Users.findOne({
			where: {
				id: userID,
			},
		});

		return data;
	}

	/**
	 * @param {String} token
	 */
	static async getUserWithToken(token) {
		const allUsers = await Users.findAll();
		let data;

		allUsers.forEach(async (user) => {
			const i = user.tokens.filter((o) => o.token === token);

			const resultFound = false;
			if (resultFound) return;

			if (i[0]) {
				data = await Users.findOne({
					where: {
						id: user.id,
					},
				});

				resultFound = true;
			}
		});

		return data;
	}

	/**
	 * @param {String} userID
	 * @param {JSON} discordUser
	 * @param {JSON} guilds
	 * @param {JSON} notifications
	 * @param {JSON} tokens
	 * @param {JSON} staff_applications
	 */
	static async createUser(
		userID,
		discordUser,
		guilds,
		notifications,
		tokens,
		staff_applications = []
	) {
		const data = await Users.create({
			id: userID,
			discordUser: discordUser,
			guilds: guilds,
			notifications: notifications,
			tokens: tokens,
			staff_applications: staff_applications,
		});

		Users.sync();

		return data;
	}

	/**
	 * @param {String} userID
	 * @param {JSON} discordUser
	 * @param {JSON} guilds
	 * @param {JSON} notifications
	 * @param {JSON} tokens
	 * @param {JSON} staff_applications
	 */
	static async updateUser(
		userID,
		discordUser,
		guilds,
		notifications,
		tokens,
		staff_applications
	) {
		const data = await Users.update(
			{
				discordUser: discordUser,
				guilds: guilds,
				notifications: notifications,
				tokens: tokens,
				staff_applications: staff_applications,
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

// Tags
class Tags extends Model {
	/**
	 * @param {String} GuildID
	 * @param {String} Command
	 */
	static async getTag(GuildID, Command) {
		const data = await Tags.findOne({
			where: {
				GuildID: GuildID,
				Command: Command,
			},
		});

		return data;
	}

	/**
	 * @param {String} GuildID
	 * @param {String} Command
	 * @param {String} Content
	 */
	static async createTag(GuildID, Command, Content) {
		const data = await Tags.create({
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
		const data = await Tags.update(
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
	 */
	static async getGuild(guildID) {
		const data = await Guilds.findOne({
			where: {
				guildID: guildID,
			},
		});

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
	 * @param {String} highestCaseId
	 * @param {String} antispam
	 * @param {Boolean} moderateLinks
	 * @param {Boolean} moderateProfanity
	 * @param {Boolean} moderateWebhooks
	 * @param {String} warnsForKick
	 * @param {String} warnsForBan
	 * @param {String} warnsForMute
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
		const data = await Guilds.create({
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
	 * @param {String} highestCaseId
	 * @param {String} antispam
	 * @param {Boolean} moderateLinks
	 * @param {Boolean} moderateProfanity
	 * @param {Boolean} moderateWebhooks
	 * @param {String} warnsForKick
	 * @param {String} warnsForBan
	 * @param {String} warnsForMute
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
		const data = await Guilds.update(
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
	 * @param {String} serverId
	 * @param {String} caseId
	 */
	static async getCase(serverId, caseId) {
		const data = await Cases.findOne({
			where: {
				serverId: serverId,
				caseId: caseId,
			},
		});

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
	static async createCase(caseId, targetId, reason, type, serverId, modId) {
		const data = await Cases.create({
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
		const data = await Cases.update(
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
	Tags,
	Guilds,
	Cases,
};
