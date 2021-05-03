const mongoose = require('mongoose')
const welcomeChannelSchema = require('../models/welcome-channel')

const cache = new Map()
// Uma função Async para carregar os dados
const loadData = async () => {
  // Obtendo todos os IDs do canal armazenados
  const results = await welcomeChannelSchema.find({})
  // Faz um loop
  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
loadData()
module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  callback: async ({ message }) => {
    const { guild, channel } = message
    await welcomeChannelSchema.findOneAndUpdate(
      {
        _id: guild.id,
      },
      {
        _id: guild.id,
        channelId: channel.id,
      },
      {
        upsert: true,
      }
    )
    // Armazena as informações no cache
    cache.set(guild.id, channel.id)
    message.reply('O canal de boas vindas foi configurado!')
  },
}
module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}
