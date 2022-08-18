const { authorizedUsers } = require(__dirname + "/../ids.js")

module.exports.name = "rickroll"
module.exports.callback = async (interaction, client) => {
  console.log("[rickroll.cmd] checking input...")
  try {
    if(authorizedUsers.includes(interaction.user.id)) {
      console.log("[rickroll.cmd] authorized")

      const userID = interaction.options._hoistedOptions.find(option => option.name === "user-id")
      if(!userID) {
        console.log("[rickroll.cmd] missing user id option")
        interaction.reply({ content: "⚠️ Missing user ID! [rickroll.cmd/1]", ephemeral: true })
        return
      }

      const user = await client.users.fetch(userID.value)
      if(!user) {
        console.log("[rickroll.cmd] user not found")
        interaction.reply({ content: "⚠️ User not found! [rickroll.cmd/2]", ephemeral: true })
        return
      }

      await user.send("https://tenor.com/view/rick-astly-rick-rolled-gif-22755440")
      console.log("[rickroll.cmd] message sent to user " + userID.value)
      interaction.reply({ content: "It shall be done.", ephemeral: true })
    } else {
      console.log("[rickroll.cmd] not authorized")
      interaction.reply("You are not authorized. Dismissed.")
    }
  } catch(err) {
    console.log("[rickroll.cmd] error: " + err)
    interaction.reply({ content: "Something went wrong! [rickroll.cmd/0]", ephemeral: true })
  }
}
