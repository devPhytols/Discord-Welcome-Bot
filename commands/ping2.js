module.exports = {
    callback: ({ client, message, args }) => {
        message.channel.send(`Ping do Bot: **${client.ws.ping}ms**`)
    },
  }
  
  exports.help = {
    name: "ping",
    aliases: ["pong"],
    category: "commands",
    description: "Use este comando para ver o ping do bot",
    usage: "ping"
  };
  