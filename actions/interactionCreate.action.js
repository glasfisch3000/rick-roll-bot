const fs = require("fs").promises
var commands = []
//var buttons = []
//var menus = []

module.exports = async (client) => {
  console.log("[interactionCreate-setup] listing interactionCreate listener files")
  const files = await fs.readdir(__dirname)

  console.log("[interactionCreate-setup] importing command listener files")
  for(const file of files) {
    if(file.endsWith(".command.js") || file.endsWith(".command.mjs")) {
      commands.push(require(__dirname + "/" + file))
    }
  }
  /*console.log("[interactionCreate-setup] importing button listener files")
  for(const file of files) {
    if(file.endsWith(".button.js") || file.endsWith(".button.mjs")) {
      buttons.push(require(__dirname + "/" + file))
    }
  }
  console.log("[interactionCreate-setup] importing menu listener files")
  for(const file of files) {
    if(file.endsWith(".menu.js") || file.endsWith(".menu.mjs")) {
      menus.push(require(__dirname + "/" + file))
    }
  }*/
  console.log("[interactionCreate-setup] successfully imported listener files")

  client.on("interactionCreate", async (interaction) => {
    console.log("[interactionCreate] recieved interaction")
    if(interaction.isChatInputCommand()) {
      console.log("[interactionCreate] confirmed slash command: '" + interaction.commandName + "'")

      for(const command of commands) {
        if(interaction.commandName === command.name) command.callback(interaction, client)
      }
    } /*else if(interaction.isButton()) {
      console.log("[interactionCreate] confirmed button")

      for(const button of buttons) {
        if(await button(interaction, client)) break
      }
    } else if(interaction.isSelectMenu()) {
      console.log("[interactionCreate] confirmed menu")

      for(const menu of menus) {
        if(await menu(interaction, client)) break
      }
    }*/
  })
}
