const { token } = require("../config.json");
const {
	Client,
	IntentsBitField,
	ActivityType,
	EmbedBuilder,
	Guild,
} = require("discord.js");

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

const badWords = [
	"ngu",
	"stupid",
	"cc",
	"dcm",
	"dcmm",
	"cặk",
	"cặt",
	"cặc",
	"cak",
	"cat",
	"cac",
	"lz",
	"loz",
	"lồn",
	"lon",
	"lồz",
	"dick",
	"đậu má",
	"duma",
	"du me",
	"djtme",
	"dit me",
	"diz me",
	"dizme",
	"đụ má",
	"địt mẹ",
	"sủa",
	"sua cc",
	"sua",
	"ẳng",
];

const badWordResponesive = [
	"Ăn nói vô văn hóa mày !",
	"Mày ở đâu ?",
	"Vàng bạc mày nhiều nhở, vàng bạc mày to nhở ?",
	"Đmm nói ít thôi, mày thích nổi tiếng không ?",
	"Coi chừng tao, chửi thề con cặk",
	"Chửi phát nữa lòi loz nha em",
	"Ăn nói mất dạy vậy mày !",
];

const blackPink = [
	"bp",
	"black",
	"pink",
	"blink",
	"rose",
	"jennie",
	"jisoo",
	"lisa",
];

const blackPinkResponesive = [
	"BlackPink trong khu vực của bạn",
	"Lửa hận thủ đốt cháy kí ức đôi ta, tôi không sao chắc anh cũng như vậy mà",
];

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildMembers,
		IntentsBitField.Flags.GuildMessages,
		IntentsBitField.Flags.MessageContent,
	],
});

const getArrayChampion = async () => {
	const URL_DATA =
		"https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion.json";
	let res = await fetch(URL_DATA);
	let data = await res.json();
	let arrKey = Object.keys(data.data);
	let arrChamp = [];
	arrKey.forEach((key) => {
		arrChamp.push(data.data[key]);
	});
	return arrChamp;
};

const getChampionFromName = async (name) => {
	let arr = await getArrayChampion();
	var chamReturn = -1;

	arr.forEach((champion) => {
		if (champion["id"].toLowerCase() == name.toLowerCase()) {
			chamReturn = champion;
		}
	});
	return chamReturn;
};

client.on("ready", (c) => {
	console.log("Aatrox is back");
	client.user.setActivity({
		name: "BORN PINK",
		type: ActivityType.Watching,
	});
});

client.on("interactionCreate", (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	var name = interaction.commandName;
	try {
		if (name == "says") {
			var channel = interaction.options.get("channel-to-say")["channel"];
			var content = interaction.options.get("content-to-say")["value"];

			channel.send(`${content}`);
			interaction.reply(`Chat: \"${content}\" đến ${channel}`);
		}
		if (name == "member-count") {
			var count = interaction.guild.memberCount;
			interaction.reply(`Server chúng ta có ${count} thành viên`);
		}
		if (name == "random") {
			interaction.reply(randomInRange(0, 9).toString());
		}
		if (name == "random-in-range") {
			var min = interaction.options.get("num-min")["value"];
			var max = interaction.options.get("num-max")["value"];

			if (min > max) {
				interaction.reply("Min > max");
				return;
			}
			interaction.reply(randomInRange(min, max).toString());
		}
	} catch (error) {
		interaction.reply("Có lỗi xảy ra !");
	}
});

const randomInRange = (min, max) => {
	return Math.floor(Math.random() * (max - min + 1) + min);
};

client.on("messageCreate", async (message) => {
	if (message.author.bot) return;

	const authorMessageString = message.author.toString();

	if (message.content.startsWith("info ")) {
		try {
			var cName = message.content.split(" ")[1];
			let champion = await getChampionFromName(cName);

			if (champion == -1) {
				message.reply("Sai tên tướng rồi !");
				return;
			}

			let squareImg = `http://ddragon.leagueoflegends.com/cdn/13.14.1/img/champion/${champion["image"]["full"]}`;
			var splashImg = `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion["id"]}_0.jpg`;
			var name = champion["name"];
			var title = champion["title"];

			const embed = new EmbedBuilder()
				.setTitle(name)
				.setURL(splashImg)
				.setDescription(title)
				.setImage(squareImg);

			message.channel.send({ embeds: [embed] });
		} catch (error) {
			console.log(error);
		}
	}

	if (badWords.some((word) => message.content.toLowerCase().includes(word))) {
		const index = randomInRange(0, badWordResponesive.length - 1);
		// message.reply(badWordResponesive[index]);
		message.react("😠");
	}

	if (
		blackPink.some((word) => message.content.toLowerCase().includes(word))
	) {
		const index = randomInRange(0, blackPinkResponesive.length - 1);
		message.reply(blackPinkResponesive[index]);
	}

	if (message.content.startsWith(client.user.toString())) {
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

	if (message.content.toLowerCase().startsWith("hello")) {
		await message.channel.sendTyping();
		message.channel.send(
			`Xin chào ${authorMessageString}, chúc bạn ngày mới vui vẻ !`
		);
	}

	if (message.mentions.users.size == 1) {
		const userMentioned = message.mentions.users.at(0);
		if (userMentioned === client.user) {
			return;
		}
		message.channel.send(
			`${userMentioned.toString()} ơi, ${authorMessageString} gọi kìa !`
		);
		if (message.content === userMentioned.toString()) {
			message.delete();
		}
	}

	if (message.content.startsWith("lore")) {
		fetch(
			"https://ddragon.leagueoflegends.com/cdn/13.14.1/data/en_US/champion/Aatrox.json"
		)
			.then((res) => res.json())
			.then((data) => {
				message.channel.send(data["data"]["Aatrox"]["lore"]);
			});
	}

	console.log(client.users.cache.size);
});

client.login(token);
