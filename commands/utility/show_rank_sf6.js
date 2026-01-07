const { SlashCommandBuilder } = require("discord.js");
const users = require("./users.json");
const chars = require("./_chars_sf6.json");

module.exports = {
	data: new SlashCommandBuilder()
			.setName("show-rank-sf6")
			.setDescription("Look up members' character ranks in Street Fighter 6.")
			.addStringOption((user) => user.setName("user-code").setDescription("The code for the player whose rank you want to check."))
			.addStringOption((char) => char.setName("char-code").setDescription("The code for the character you want to check the rank of. \all\" and \"max\" are also valid.").setRequired(false)),
	async execute(interaction) {
		function rankInt(rank) {
			if (rank == null)
				return 0;
			const leagues = { "Rookie": 10, "Iron": 20, "Bronze": 30, "Silver": 40, "Gold": 50, "Platinum": 60, "Diamond": 70, "Master": 80 };
			const myLeague = rank.substring(0, rank.length - 2);
			const myTier = parseInt(rank.at(-1));
			return leagues[myLeague] + myTier;
		}

		function rankDeInt(rankCode) {
			const leagues = ["Rookie", "Iron", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"];
			const leagueIndex = Math.floor(rankCode / 10) - 1;
			return `${leagues[leagueIndex]} ${rankCode % 10}`;
		}

		function maxRankInt() {
			const allRanks = [];
			Object.values(ranks).forEach((it) => allRanks.push(rankInt(it)));
			return Math.max(...allRanks);
		}

		// Validate
		const user = interaction.options.getString("user-code");
		const char = (interaction.options.getString("char-code") == null) ? "all" : interaction.options.getString("char-code");
		const userKey = (Object.keys(users.codes).indexOf(user) >= 0) ? users.codes[user] : "";
		const ranks = (Object.keys(users.codes).indexOf(user) >= 0) ? users[userKey]["sf6-char-ranks"] : "";

		if (user == null) {
			await interaction.reply("No user code entered. To see a list of user codes, run the /show-user-codes command.");
			return;
		}
		if (userKey == "") {
			await interaction.reply("Invalid user code. To see a list of user codes, run the /show-user-codes command.");
			return;
		}
		
		if (char == "max") {
			const maxRank = maxRankInt();
			if (maxRank < 1) {
				await interaction.reply(`${users[user].server_username} doesn't play ranked.`);
				return;
			}
			let maxRankChars = "";
			Object.keys(ranks).forEach((it) => {
				if (rankInt(ranks[it]) == maxRank)
					maxRankChars += `${chars[it]}/`;
			});
			await interaction.reply(`${users[userKey].server_username}'s highest rank character(s) is ${(user == "aerith") ? "her" : "his"} ${rankDeInt(maxRank)} ${maxRankChars.substring(0, maxRankChars.length - 1)}.`);
			return;
		}
		if (char == "all") {
			let result = "";
			Object.keys(ranks).forEach((it) => result += `${chars[it]}: ${ranks[it]}\n`);
			await interaction.reply(result);
			return;
		}
		else {
			if (Object.keys(chars).indexOf(char) < 0) {
				await interaction.reply(`Invalid character code. Use /show-char-codes-sf6 to see a list of all character codes.`);
			}
			else {
				const charRank = users[userKey]["sf6-char-ranks"][char];
				await interaction.reply(`${users[userKey].server_username}'s ${chars[char]} is ${charRank == null ? "unranked" : charRank} rank.`);
			}
		}

		await interaction.reply("How did you get here? This part of the code should be unreachable. Talk to Silver.");
	}
}