const { clientID } = require(__dirname + "/../ids.js")
module.exports = async (client) => {
  console.log("test")
  client.on("messageCreate", message => {
    console.log("[messageCreate] recieved message")

    try {
      if(message.author.id !== clientID) {
        client.users.fetch("723199922899255366").then(spock => {
          if(!spock) {
            console.log("[messageCreate] spock not found")
            return
          }

          spock.send("Recieved message from **" + message.author.username + "** (ID `" + message.author.id + "`):\n" + message.content.split("\n").map(str => "> " + str).join("\n"))
            .then(() => {
              console.log("[messageCreate] message reported to spock")
            })
        })
      }
    } catch(err) {
      console.log("[messageCreate] error: " + err)
    }
  })
}
