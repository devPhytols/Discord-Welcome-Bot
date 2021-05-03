// Definindo
const Canvas = require('canvas')
const jimp = require("jimp")
const gradians = require("../gradiants.json")
const { MessageAttachment } = require('discord.js')
const path = require('path')
const { getChannelId } = require('../commands/setwelcome')

module.exports = (client) => {
  client.on('guildMemberAdd', async (member, { link, gradiant, blur } = {}) => {
    
    //

    if (blur !== false) {
      blur = true;
    }
    if (link && gradiant) {
      return console.log("You can not use link and gradiant at a same time");
    }

    if (!link) {
      if (gradiant) {
        let color = gradians.find(x => x.name === gradiant.toLowerCase());
        if (!color) {
          return console.log("Invalid Gradiant Color :v");
        }

        link = color.link;
      } else {
        link = "https://wallpapercave.com/wp/wp5128415.jpg";
      }
    }
    
    // Função Async
    // Destrói a propriedade da guilda do objeto membro
    const { guild } = member
    // Acessa o ID do canal para esta guilda pelo cache
    const channelId = getChannelId(guild.id)
    // Acessa o canal atual e envia a mensagem
    const channel = guild.channels.cache.get(channelId)
    // Cria o modelo e acesse o context
    const canvas = Canvas.createCanvas(700, 250);
    const ctx = canvas.getContext("2d");
    if (blur) {
      const background = await jimp.read(link);

      background.blur(5);

      let mraw = await background.getBufferAsync("image/png");

      const fixedbkg = await Canvas.loadImage(mraw);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    } else {
      const fixedbkg = await Canvas.loadImage(link);

      ctx.drawImage(fixedbkg, 0, 0, canvas.width, canvas.height);
    }

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    let blurImage = await Canvas.loadImage(
      path.join(__dirname, '../blur.png')
    );

    ctx.drawImage(blurImage, 0, 0, canvas.width, canvas.height);
    let xname = member.user.username;

    ctx.font = `bold 36px Sans`;
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "start";
    ctx.strokeStyle = "#f5f5f5";

    const name =
      xname.length > 12 ? xname.substring(0, 12).trim() + "..." : xname;
    ctx.fillText(`${name}`, 278, 113);
    ctx.strokeText(`${name}`, 278, 113);

    ctx.font = `bold 20px Sans`;
    ctx.fillStyle = "#FFFFFF";

    ctx.fillText(`#${member.user.discriminator}`, 278, 160);

    let image = await jimp.read(
      member.user.displayAvatarURL({ format: "jpg", dynamic: true })
    );
    image.resize(1024, 1024);
    image.circle();
    let raw = await image.getBufferAsync("image/png");

    const avatar = await Canvas.loadImage(raw);
    
    // Contador de membro na imagem
    ctx.font = 'bold 20px Sans'
    ctx.fillStyle = '#ffffff'
    text = `Membro #${guild.memberCount}`
    x = canvas.width / 2 - ctx.measureText(text).width / 2
    ctx.fillText(text, 278, 206) // posição do texto x, y

    // Corta e desenha a imagem circular
    ctx.drawImage(avatar, 72, 48, 150, 150);

    // Anexa a imagem e envia uma mensagem
    const attachment = new MessageAttachment(canvas.toBuffer())
    channel.send('', attachment)
  })
}
