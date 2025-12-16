const { SlashCommandBuilder } = require("discord.js");
const users = require("./users.json")

module.exports = {
	data: new SlashCommandBuilder()
		.setName("time-check")
		.setDescription("Checks the time for a user in the server.")
		.addStringOption((option) => option.setName("player").setDescription("The player code for the user you're checking the time for.")),
	async execute(interaction) {
		const checkee = interaction.options.getString("player");
		if (checkee == null) {
			console.log("No checkee");
			await interaction.reply("I need a user code to check the time for.");
			return;
		}
		if (!(interaction.options.getString("player") in users.codes)) {
			console.log("Invalid checkee");
			await interaction.reply(`User code ${checkee} not found. To show user codes, use the /show-users command.`);
			return;
		}

		const now = new Date();
		const daylight_savings_time = true;
		const user_info = users[users.codes[checkee]];
		
		let hours = now.getUTCHours() + user_info.utc_offset;
		if (hours < 0)
			hours += 24;
		if (hours > 23)
			hours -= 24;
		if (daylight_savings_time)
			hours--;
		const mins = now.getUTCMinutes();
		
		await interaction.reply(`${formattedTime(hours, mins)}`);
	}
};

function formattedTime(hours, mins) {
	let h, m, am;
	if (hours == 0)
		h = "12";
	else if (hours > 12)
		h = `${hours - 12}`;
	else if (hours < 10)
		h = `0${hours}`;
	else
		h = hours;

	m = `${(mins < 10) ? "0" : ""}${mins}`;
	am = (hours < 12) ? "AM" : "PM";

	return `${h}:${m} ${am}`;
}
