require("dotenv").config();
const { Client, IntentsBitField, ActivityType } = require("discord.js");

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

client.on("ready", (c) => {
	console.log("Aatrox đã trở lại !");
	client.user.setActivity({
		name: "cuối đầu bài",
		type: ActivityType.Streaming,
		url: "https://www.youtube.com/watch?v=plRWjecAwZk",
	});
});

client.on("interactionCreate", (i) => {
	console.log(i.channelId);
});

const AATROX_ID = "<@1134884912646864936>";

const randomInRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	const authorMessageString = message.author.toString();

	const words = [
		"Come, let me show you darkness!",
		"Fight! Join me in death!",
		"Your death awaits!",
		"I will hack and chop and cleave, and sunder the filth of your forms!",
		"I am not your enemy, I am the enemy!",
		"I am Darkin! Your gods fear me!",
		"I will sever your limbs! I will carve your souls!",
		"Carnage is my method.",
		"I can smile, and murder while I smile.",
		"Suffer, as I suffer!",
		"Carnage... Hoooooome...",
		"Hear this cursed form sing!",
		"Sorrow... I shall deliver it to you.",
		"I begged for death, now I am its bringer!",
		"I am the god killer!",
		"Come! Aatrox grunts. Destiny awaits!",
		"You would fight me?! Come, let me show you hell!",
		"Your annihilation beckons!",
		"Violence... distracts me from these chains!",
		"This is your absolution.",
		"To the end of times, I shall kill you again and again.",
		"This was reckoning.",
		"You die... a fool.",
		"I brought you the one true gift, I brought you... death!",
		"Your broken form speaks only of failure.",
		"Carnage, my last joy.",
		"This is the silence I seek.",
		"I will have silence.",
		"Resurrect! Return! So I may kill you again...",
		"This is my gift to mortals.",
		"I sing only in your deaths.",
		"They think me defeated, enchained. But I am unbowed... Noble is this carnage.",
		"I am your reckoner, mortals.",
		"Challenge me, mortals! I am here!",
		"Am I the abyss? Or did I gaze into it?",
		"The only peace I seek... is death!",
		"I am oblivion, I am destruction... I am doom.",
		"The true sound of my blade can only be heard when they loathe re-incarnation.",
		"This cursed form... This crude decaying flesh! I loathe it!",
		"Let them lament... my name.",
		"I stood against the void. Now... I would welcome it.",
		"I cannot die... until all life ends.",
		"Primitives worship me, hoping for mercy. I shall give them death.",
		"They will call me a god killer!",
		"I am doom!",
		"As long as this form lives, I will punish them.",
		"My suffering... I will make it bloom.",
		"My darkness was not born, it was forged by my prison.",
		"I am not a king, I am not a god, I am... worse...",
		"Those who call me enemy, I welcome them.",
		"I will snuff out the light, I shall make darkness eternal!",
		"All that lives, I will end!",
		"There is a darkness in my heart deeper than any shadow!",
		"I march to death... Though I wish it was my own...",
		"I will drown them in oceans of blood!",
		"Patience, Aatrox! Patience! Your freedom will come!",
		"Gods and mortals, they deserve only death!",
		"Kneel mortals! So I may split your shoulders from your spine!",
		"March toward vengeance... Drown this world in blood!",
		"I must destroy even hope.",
		"For my imprisonment, they will suffer!",
		"I will render these mortals' forms into my own!",
		"Their screams will be like the soothing hum of insects at dusk.",
		"They will call me villain... Come, let me earn their hatred, again and forever.",
	];

	if (message.content.startsWith(AATROX_ID)) {
		const index = randomInRange(0, words.length - 1);
		message.channel.send(words[index]);
	}

	if (message.content.startsWith(`remove `)) {
		var num;
		num = parseInt(message.content.split(" ")[1]);
		if (isNaN(num)) {
			message.reply("Invalid parameter");
			return;
		}

		message.channel.messages
			.fetch({ limit: num + 1 })
			.then((listMessage) => {
				listMessage.forEach((messagez3) => {
					messagez3.delete();
				});
			});
	}

	const tag = message.author.toString();

	if (message.content.toLowerCase().startsWith("hello")) {
		await message.channel.sendTyping();
		message.channel.send(
			`Xin chào ${authorMessageString}, chúc bạn ngày mới nhặc cư !`
		);
	}

	if (message.content.toLowerCase().includes("cc")) {
		message.channel.send(`Thằng ${authorMessageString} vô văn hóa !`);
	}

	if (message.mentions.users.size != 0) {
		const userMentioned = message.mentions.users.at(0);
		if (userMentioned === client.user) {
			return;
		}
		message.channel.send(
			`${userMentioned.toString()} ơi, ${authorMessageString} gọi kìa !`
		);
		message.delete();
	}

	if (message.content.startsWith("lore")) {
		fetch(
			"https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion/Aatrox.json"
		)
			.then((res) => res.json())
			.then((data) => {
				message.channel.send(data.data.Aatrox.lore);
			});
	}
});

client.login(process.env.TOKEN);
