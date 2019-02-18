const Discord = require('discord.js');
const bot = new Discord.Client();
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter = new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}) .write()

var prefix = ('.')

bot.on('ready', function() {
    bot.user.setActivity("Surveiller Les Serveurs RedWars");
    console.log("En ligne !");
});

bot.login(process.env.TOKEN);

bot.on('message', message => {
    if (message.content === prefix + "help"){
        message.channel.sendMessage("Liste des commandes \n -*help"); 
    
    }


    if (message.content === ""){       /// a faire !! space
    message.reply("")
    console.log("");
}

if (message.content === prefix + "web"){
    var embed = new Discord.RichEmbed()
    .setTitle("EMBED")
    .setDescription("site RedWars")
    .addField(".web","Page du site RedWars", true)
    .addField("Site Web", "Voici le lien du site web RedWars (https://redwars.com/", true)
    .setColor("0xDC143C")
    .setFooter("Bonne chance sur le site ! :)")
    message.channel.sendEmbed(embed);
}

bot.on('message', message => {
   
    var msgauthor = message.author.id
 
    if(message.author.bot)return;
 
    if(!db.get("xp").find({user : msgauthor}).value()){
        db.get("xp").push({user : msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user : msgauthor}).find("xp").value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp)
        console.log(`Nombre d'xp: ${userxp[1]}`)
 
        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
 
        if(message.content === prefix + "xp"){
            var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
            var xpfinal = Object.values(xp);
            var xp_embed = new Discord.RichEmbed()
                .setTitle(`Stat des XP de : ${message.author.username}`)
                .setColor('#F4D03F')
                .addField("XP", `${xpfinal[1]} xp`)
                .setFooter("Enjoy :p")
            message.channel.send({embed : xp_embed})
        }
    }
})

});



