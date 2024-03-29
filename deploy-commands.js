const { SlashCommandBuilder } = require("@discordjs/builders")
const { REST } = require("@discordjs/rest")
const { Routes } = require("discord-api-types/v9")
const { clientID, guildID } = require(__dirname + "/ids.js")
const token = require(__dirname + "/token.js")

const commands = [
  new SlashCommandBuilder()
    .setName("rickroll")
    .setDescription("Rickroll someone!")
    .addStringOption(option =>
      option.setName("user-id").setDescription("The ID of the user you want to rickroll.").setRequired(true)),
  new SlashCommandBuilder()
    .setName("message")
    .setDescription("Send someone a custom message.")
    .addStringOption(option =>
      option.setName("user-id").setDescription("The ID of the user you want me to text.").setRequired(true))
    .addStringOption(option =>
      option.setName("message").setDescription("The content of the message.").setRequired(true)),
].map(command => command.toJSON())

const rest = new REST({ version: "9" }).setToken(token)

rest.put(Routes.applicationGuildCommands(clientID, guildID), { body: commands })
  .then(() => console.log("successfully registered application guild commands for '" + guildID + "'"))
  .catch(console.error)
