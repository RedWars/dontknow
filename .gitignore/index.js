const Discord = require('discord.js');
const bot = new Discord.Client();

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

});

