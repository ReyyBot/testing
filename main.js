const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const fs = require('fs')
const moment = require('moment-timezone')
const { wait, banner, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, start, info, success, close } = require('./lib/functions')
const { color } = require('./lib/color')

const starts = async (herman = new WAConnection()) => {
    herman.logger.level = 'warn'
    herman.version = [2, 2142, 12]
    herman.on('qr', () => {
        console.log(color('[','white'), color('!','red'), color(']','white'), color(' SCAN !!'))
    })
      const sendButImage = async (from, context, fotext, img, but) => {
    gam = img
    jadinya = await herman.prepareMessage(from, gam, MessageType.image)
    buttonMessagesI = {
      imageMessage: jadinya.message.imageMessage,
      contentText: context,
      footerText: fotext,
      buttons: but,
      headerType: 4
    }
    herman.sendMessage(from, buttonMessagesI, MessageType.buttonsMessage)
  }

    fs.existsSync('./session.json') && herman.loadAuthInfo('./session.json')
    herman.on('connecting', () => {
        start('2', 'Tunggu!')
    })
    herman.on('open', () => {
        success('2', 'Connect!')
    })
    await herman.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./session.json', JSON.stringify(herman.base64EncodedAuthInfo(), null, '\t'))

    herman.on('chat-update', async (message) => {
        require('./herman.js')(herman, message)
    })
herman.on("group-participants-update", async (anu) => {
    try {
      groupMet = await herman.groupMetadata(anu.jid);
      groupMembers = groupMet.participants;
      groupAdmins = getGroupAdmins(groupMembers);
      mem = anu.participants[0];

      console.log(anu);
      try {
        pp_user = await herman.getProfilePicture(mem);
      } catch (e) {
        pp_user =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
      }
      try {
        pp_grup = await herman.getProfilePicture(anu.jid);
      } catch (e) {
        pp_grup =
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png?q=60";
      }
    } catch (e) {
      console.log("Error : %s", color(e, "red"))
    }

  })
}

/**
 * Uncache if there is file change
 * @param {string} module Module name or path
 * @param {function} cb <optional> 
 */
function nocache(module, cb = () => { }) {
    console.log('Module', `'${module}'`, 'GiiXyz')
    fs.watchFile(require.resolve(module), async () => {
        await uncache(require.resolve(module))
        cb(module)
    })
}

/**
 * Uncache a module
 * @param {string} module Module name or path
 */
function uncache(module = '.') {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(module)]
            resolve()
        } catch (e) {
            reject(e)
        }
    })
}

starts()