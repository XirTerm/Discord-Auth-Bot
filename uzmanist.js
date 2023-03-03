module.exports = {
  port: "3000", //Örneğin; "8080"
  //Kendinize ait domaininiz varsa ona göre ayarlayın YOKSA ELLEMEYİN [Şart]
  
  prefix: "", //Örneğin; prefix: "+"
  //Prefixiniz [Şart]
  
  token: process.env.token, //Örneğin; "MwMksMwkKA234dD32DgHaFgnC..."
  //Botunuzun tokenini .env klasörü oluşturup oraya yazacaksınız. Eğer replit kullanıyorsanız Secrets klasörüne yazmanız yeterli olacak. [Şart]

  client: "", //Örneğin; "Uzmanist Bot"
  //Uygulama adıdır istediğinizi verebilirsiniz. [Şart Değil]
  
  client_id: "", //Örneğin; "123456789..."
  //[Şart]
  
  client_secret: "", //Örneğin; "n5wa6tn67as3jdk...""
  //[Şart]
  
  redirect_uri: "", //Örneğin; "https://AuthBot.uzmanist.repl.co"
  //Domaininizi yazacaksınız [Şart]
  
  footer: "", //Örneğin; "Uzmanist#7221"
  //[Şart Değil]
  
  destek: "", //Örenğin; "https://discord.gg/sMPrwvZRfJ"
  //[şart Değil]
  
  webhook: "", //Örneğin; "https://discordapp.com/api/webhooks/..."
  //Hesabını yetkilendiren kişilerin ayrıntıları logunu ayarladığınız kanalın webhookuna düşer [Şart Değil]
  
  sahipler: [""], //Örneğin; ["457480293423644672", "925432354560933950"]
  //Sahip ID'(leri) Botu sadece bu id'li hesaplar kullanabilir. İster bir ID, ister 10 ID farketmez. [Şart]
  
  authLink: ``, //Örneğin; `https://discord.com/api/oauth2/authorize?client_id=...`
  //Buraya ayaraldığınız Redirect_Uri adresini seçerek Guilds Join ve İndentify şartlı Auth Linkini gireceksiniz. [Şart]
}
