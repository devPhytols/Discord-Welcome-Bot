const mongoose = require('mongoose')
// Estamos usando isso várias vezes, então defina
// em um objeto para limpar nosso código 
const reqString = {
  type: String,
  required: true,
}
const welcomeSchema = new mongoose.Schema({
  _id: reqString, // ID da Guilda
  channelId: reqString,
})
module.exports = mongoose.model('underbytes-welcome', welcomeSchema)