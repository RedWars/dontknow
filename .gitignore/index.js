// Import the discord.js module
const Discord = require('discord.js');

// Create an instance of a Discord client
const client = new Discord.Client();

const bot = new Discord.Client();

const prefix = '*'
/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('Bot Online!');
  client.user.setActivity('Surveiller les serveurs',{type: 0});
});

client.on('messageReactionAdd', (reaction, user) => {
  if(reaction.emoji.name === "✅") {
    if(user === bot.user) return;
     if(bot.channel === "dm") return;
     let role = bot.guild.roles.find("name", "C - ☑️Vérifié☑️");
     let role1 = bot.guild.roles.find("name", "C - Membres");

    if(user.roles.has(role.id));
    await(user.addRole(role.id) && user.removeRole(role1.id));
    user.send("Merci d'être parmi nous dans cette communauté! En guise de remerciement pour avoir accepté les règles, le rôle vérifié vous à été attribué!");
    return;
}
});

client.on("message", async message => {
if(message.author.id != "552315126003531778") return;
message.react("✅");
});

client.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Pseudo : ', `${member}`)
        .addField(':microphone2: | Bienvenue !', `Bienvenue sur GameCommunity, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':earth_asia: | Tu est le ', `${member.guild.memberCount}ème Membre`)
        .addField("Pseudo", `<@` + `${member.id}` + `>`, true)
        .addField('Serveur', `${member.guild.name}`, true )
        .setFooter(`**${member.guild.name}**`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

client.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome-leave');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Pseudo:', `${member}`)
        .addField('A quitté le serveur', ';(')
        .addField('Bye Bye :(', 'tu vas nous manquer :sob: ')
        .addField('Le serveur compte maintenant', `${member.guild.memberCount}` + " membres")
        .setFooter(`**${member.guild.name}`)
        .setTimestamp()

        channel.sendEmbed(embed);
});

client.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});



client.on('message', message => {
  // Ignore messages that aren't from a guild
  if (!message.guild) return;

  // if the message content starts with "!ban"
  if (message.content.startsWith('*ban')) {
    // Assuming we mention someone in the message, this will return the user
    // Read more about mentions over at https://discord.js.org/#/docs/main/stable/class/MessageMentions
    const user = message.mentions.users.first();
    // If we have a user mentioned
    if (user) {
      // Now we get the member from the user
      const member = message.guild.member(user);
      // If the member is in the guild
      if (member) {
        /**
         * Ban the member
         * Make sure you run this on a member, not a user!
         * There are big differences between a user and a member
         * Read more about what ban options there are over at
         * https://discord.js.org/#/docs/main/stable/class/GuildMember?scrollTo=ban
         */
        member.ban({
          reason: 'Méchant(e) Va!',
        }).then(() => {
          // We let the message author know we were able to ban the person
          message.reply(`Vien de bannir ${user.tag} :white_check_mark:`);
        }).catch(err => {
          // An error happened
          // This is generally due to the bot not being able to ban the member,
          // either due to missing permissions or role hierarchy
          message.reply('Je ne peut pas bannir cette personne car les permissions ne me sont pas attribuer. :thinking:');
          // Log the error
          console.error(err);
        });
      } else {
        // The mentioned user isn't in this guild
        message.reply('Cette personne a disparu du discord :dash:');
      }
    } else {
    // Otherwise, if no user was mentioned
      message.reply('Il faut mentionner la personne pour la ban :wink: ');
    }
  }
});
client.on("message", (message) => {
    if (message.content.startsWith("*kick")) {
        // Easy way to get member object though mentions.
        var member= message.mentions.members.first();
        // Kick
        member.kick().then((member) => {
            // Successmessage
            message.channel.send( member.displayName + " A été exclu de GameCommunity :white_check_mark: ");
        }).catch(() => {
             // Failmessage
            message.channel.send("Accès Refusé");
        });
    }
});
// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('process.env.TOKEN');
