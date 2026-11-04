
const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "autodl",
    version: "0.0.2",
    hasPermssion: 0,
    credits: "ARIYAN SABBIR",
    description: "Auto video download",
    commandCategory: "user",
    usages: "",
    cooldowns: 5
  },

  run: async function ({ api, event, args }) {},

  handleEvent: async function ({ api, event, args }) {
    try {
      const body = event.body || "";
      const text = body.toLowerCase();

      const { alldown } = require("shaon-videos-downloader");

      if (!text.startsWith("https://")) return;

      api.setMessageReaction(
        "🔰",
        event.messageID,
        () => {},
        true
      );

      const result = await alldown(body);
      console.log(result);

      const videoUrl = result.url;

      if (!videoUrl) {
        return api.sendMessage(
          "ভিডিও লিংক পাওয়া যায়নি!",
          event.threadID
        );
      }

      api.setMessageReaction(
        "📛",
        event.messageID,
        () => {},
        true
      );

      const response = await axios.get(videoUrl, {
        responseType: "arraybuffer"
      });

      const folder = path.join(__dirname, "cache");
      const videoPath = path.join(folder, "auto.mp4");

      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }

      fs.writeFileSync(videoPath, Buffer.from(response.data));

      return api.sendMessage(
        {
          body: `
╔═══════✦❘༻༺❘✦═══════╗
𝐀𝐑𝐈𝐘𝐀𝐍₎ꜛ⪼─⃞⤹𝐒𝐀𝐁𝐁𝐈𝐑༢ꜛ國🩷ꤪ🪽
𝗔𝗨𝗧𝗢 𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥
╚═══════✦❘༻༺❘✦═══════╝
`,
          attachment: fs.createReadStream(videoPath)
        },
        event.threadID,
        event.messageID
      );

    } catch (error) {
      console.log("AutoDL Error:", error);
      return api.sendMessage(
        "❌ ভিডিও ডাউনলোড করতে সমস্যা হয়েছে!",
        event.threadID
      );
    }
  }
};
