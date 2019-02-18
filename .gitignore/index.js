const Discord = require('discord.js');
const bot = new Discord.Client();

var prefix = ('.')

bot.on('ready', function() {
    bot.user.setActivity("Surveille Les Serveurs RedWars");
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
});
