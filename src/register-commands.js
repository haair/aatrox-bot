const { token, guildId, clientId } = require("../config.json");
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

const commands = [
	{
		name: "says",
		description: "Say something",
		options: [
			{
				name: "channel-to-say",
				description: "Channel to say",
				type: ApplicationCommandOptionType.Channel,
				require: true,
			},
			{
				name: "content-to-say",
				description: "Content to say",
				type: ApplicationCommandOptionType.String,
				require: true,
			},
		],
	},
	{
		name: "member-count",
		description: "Get number member of guild",
	},
	{
		name: "random",
		description: "Random 0 - 9",
	},

	{
		name: "random-in-range",
		description: "Random in range",
		options: [
			{
				name: "num-min",
				description: "Number min",
				type: ApplicationCommandOptionType.Number,
				require: true,
			},
			{
				name: "num-max",
				description: "Number max",
				type: ApplicationCommandOptionType.Number,
				require: true,
			},
		],
	},
];

const rest = new REST({
	version: "10",
}).setToken(token);

(async () => {
	try {
		console.log("Waiting!");
		await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
			body: commands,
		});
		console.log("Registered!");
	} catch (error) {
		console.log(error);
	}
})();
