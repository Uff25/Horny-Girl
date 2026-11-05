
const fs = require("fs-extra");
const path = require("path");

module.exports.config = {
  name: "ariyanvai",
  version: "1.0.2",
  hasPermssion: 0,
  credits: "ARIYAN SABBIR",
  description: "ARIYAN No-Prefix Auto Reply",
  commandCategory: "no prefix",
  usages: "ARIYAN",
  cooldowns: 5
};

module.exports.handleEvent = async function ({ api, event }) {
  try {
    if (!event.body) return;

    const body = event.body.toLowerCase().trim();

    const triggers = [
      "ariyan",
      "ariyan vai",
      "ariyan sabbir",
      "ariyan boss",
      "আরিয়ান",
      "আরিয়ান ভাই",
      "সাব্বির",
      "সাব্বির ভাই"
    ];

    if (!triggers.includes(body)) return;

    const imagePath = path.join(__dirname, "noprefix", "Ariyan.png");

    const message = {
      body: "ARIYAN SABBIR 👑"
    };

    if (fs.existsSync(imagePath)) {
      message.attachment = fs.createReadStream(imagePath);
    }

    api.sendMessage(message, event.threadID, (err, info) => {
      if (!err && info && info.messageID) {
        api.setMessageReaction("☠️", info.messageID, () => {}, true);
      }
    }, event.messageID);

  } catch (error) {
    console.error("ARIYAN VAI ERROR:", error);
  }
};

module.exports.run = function () {};
