const DiscordJS = require('discord.js')
const WOKCommands = require('wokcommands')
require('dotenv').config()
 
const client = new DiscordJS.Client()
 
client.on('ready', () => {
  // Initialize WOKCommands with specific folders and MongoDB
  new WOKCommands(client, {
        commandsDir: 'commands',
        featureDir: 'features'
    })
    .setMongoPath(process.env.MONGO_URI)
    .setDefaultPrefix('ub!') // Alterar o Prefixo
})
 
client.login(process.env.TOKEN).then(() => {
  console.log(`(BOT): Index Carregada com Sucesso.`);
});