 module.exports = {
  config: {
    name: "clear",
    aliases: [],
    author: "ARIYAN SABBIR",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: { en: "" },
    longDescription: { en: "unsend all messages sent by bot" },
    category: "owner",
    guide: { en: "{p}{n}" }
  },

  onStart: async function ({ api, event }) {
    try {
      const threadID = event.threadID;
      const botID = String(api.getCurrentUserID());

      const botMessages = await api.getThreadHistory(threadID, 100);

      const botSentMessages = botMessages.filter(
        message => String(message.senderID) === botID
      );

      for (const message of botSentMessages) {
        try {
          await api.unsendMessage(message.messageID);
        } catch (err) {
          console.error("Unsend Error:", err);
        }
      }

    } catch (error) {
      console.error("Clear Command Error:", error);
      api.sendMessage("❌ Clear command কাজ করেনি!", event.threadID);
    }
  }
};
