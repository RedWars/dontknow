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
        message.channel.sendMessage("Liste des commandes \n -"```sa arrive bientôt```"); 
    
    }


    if (message.content === "basewars"){       /// a faire !! space
    message.reply("actuellement en dev :)")
    console.log("bwinfo effectué");
}
});
