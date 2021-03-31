const mongoose = require('mongoose')
const welcomeChannelSchema = require('../models/welcome-channel')

const cache = new Map()
// An async function to load the data
const loadData = async () => {
  // Get all stored channel IDs
  const results = await welcomeChannelSchema.find({})
  // Loop through them all and set them in our map
  for (const result of results) {
    cache.set(result._id, result.channelId)
  }
}
// Invoke this function when the bot starts up
loadData()
module.exports = {
  requiredPermissions: ['ADMINISTRATOR'],
  callback: async ({ message }) => {
    // Destructure the guild and channel properties from the message object
    const { guild, channel } = message
    // Use find one and update to either update or insert the
    // data depending on if it exists already
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
    // Store the information in the cache
    cache.set(guild.id, channel.id)
    message.reply('O canal de boas vindas foi configurado!')
  },
}
module.exports.getChannelId = (guildId) => {
  return cache.get(guildId)
}