const mongoose = require('mongoose')
// Definindo a função
const reqString = {
  type: String,
  required: true,
}
const welcomeSchema = new mongoose.Schema({
  _id: reqString, // ID da Guilda
  channelId: reqString,
})
module.exports = mongoose.model('underbytes-welcome', welcomeSchema)
