const { authorizedUsers } = require(__dirname + "/../ids.js")

module.exports.name = "message"
module.exports.callback = async (interaction, client) => {
  console.log("[message.cmd] checking input...")
  try {
    if(authorizedUsers.includes(interaction.user.id)) {
      console.log("[message.cmd] authorized")

      const userID = interaction.options._hoistedOptions.find(option => option.name === "user-id")
      if(!userID) {
        console.log("[message.cmd] missing user id option")
        interaction.reply({ content: "⚠️ Missing user ID! [message.cmd/1]", ephemeral: true })
        return
      }

      const message = interaction.options._hoistedOptions.find(option => option.name === "message")
      if(!message) {
        console.log("[message.cmd] missing message option")
        interaction.reply({ content: "⚠️ Missing user ID! [message.cmd/2]", ephemeral: true })
        return
      }

      const user = await client.users.fetch(userID.value)
      if(!user) {
        console.log("[message.cmd] user not found")
        interaction.reply({ content: "⚠️ User not found! [message.cmd/3]", ephemeral: true })
        return
      }

      await user.send(message.value.replaceAll("\\n", "\n"))
      console.log("[message.cmd] message sent to user " + userID.value)
      interaction.reply({ content: "Yes sir, message sent and delivered.", ephemeral: true })
    } else {
      console.log("[message.cmd] not authorized")
      interaction.reply("You are not authorized. Dismissed.")
    }
  } catch(err) {
    console.log("[message.cmd] error: " + err)
    interaction.reply({ content: "Something went wrong! [message.cmd/0]", ephemeral: true })
  }
}
