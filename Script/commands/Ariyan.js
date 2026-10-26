module.exports = {
  config: {
    name: "ariyan",
    version: "2.0.0",
    author: "Ariyan X Sabbir",
    countDown: 5,
    role: 0,
    shortDescription: "Multi Mention Detector",
    longDescription: "Ariyan + Sabbir + Mentions",
    category: "fun",
    guide: "Mention users or type ariyan to trigger detectors"
  },

  onStart: async function ({ message }) {
    try {
      const info = await message.reply(
        "✅ **All Detectors Active!**\n\n" +
        "• ariyan / ariyan vai / ariyan bhai / ariyan bro\n" +
        "• 2 nd name\n" +
        "• Sabbir\n" +
        "• 61591654275272\n" +
        "• 100028959431665\n\n" +
        "Bot ready 🔥"
      );

      if (info && info.messageID && global.GoatBot && global.GoatBot.onReply) {
        global.GoatBot.onReply.set(info.messageID, {
          commandName: this.config.name,
          author: message.senderID,
          type: "ariyan"
        });
      }
    } catch (err) {
      console.error("[ariyan] onStart error:", err);
    }
  },

  onChat: async function ({ event, message }) {
    try {
      if (!event.body || typeof event.body !== "string") return;

      const threadID = event.threadID;
      const messageID = event.messageID;
      const now = Date.now();

      // ---- Duplicate reply prevention ----
      if (!global.ariyanProcessed) global.ariyanProcessed = new Set();
      if (messageID && global.ariyanProcessed.has(messageID)) return;

      // ---- Thread-based anti-spam (8s) ----
      if (!global.ariyanThreadCooldown) global.ariyanThreadCooldown = new Map();
      const lastTime = global.ariyanThreadCooldown.get(threadID) || 0;
      if (now - lastTime < 8000) return;

      const text = event.body.toLowerCase().trim();
      const mentions = event.mentions || {};

      // Helper: only UID (mention or raw UID in text)
      const isTargetHit = (uid) => {
        if (mentions[uid]) return true;
        if (event.body.includes(uid)) return true;
        return false;
      };

      const markHandled = () => {
        global.ariyanThreadCooldown.set(threadID, now);

        if (messageID) {
          global.ariyanProcessed.add(messageID);

          // Keep the processed set small
          if (global.ariyanProcessed.size > 500) {
            const first = global.ariyanProcessed.values().next().value;
            global.ariyanProcessed.delete(first);
          }
        }
      };

      // ---- 1. Sabbir Detector (UID only) ----
      const sabbirUID = "100028959431665";

      if (isTargetHit(sabbirUID)) {
        markHandled();
        await message.reply("Sabbir vai akon besto ache 🙂");
        return;
      }

      // ---- 2. Target UID 61591654275272 ----
      const targetID1 = "100028959431665";

      if (isTargetHit(targetID1)) {
        markHandled();
        await message.reply("O akon gf er sate kota bolte besto 😌");
        return;
      }

      // ---- 3. Target UID 100028959431665 ----
      const targetID2 = "61591654275272";

      if (isTargetHit(targetID2)) {
        markHandled();
        await message.reply(
          "Ariyan akon besto ache ki bolben amk bolun 😌"
        );
        return;
      }

      // ---- 4. Ariyan Detector ----
      const ariyanTriggers = [
        "ariyan",
        "আরিয়ান",
        "আড়িয়ান",
        "ariyan vai",
        "ariyan bhai",
        "ariyan bro"
      ];

      if (ariyanTriggers.some(trigger => text.includes(trigger))) {
        markHandled();

        const replies = [
          "Ariyan bos akon besto ache 😌",
          "Ariyan vai besto re bhai 😂",
          "bos ektu rest nite dao 😤",
          "Ariyan er phone busy 🔥",
          "ar koto bar bolba vai? 😅"
        ];

        const randomReply =
          replies[Math.floor(Math.random() * replies.length)];

        await message.reply(randomReply);
        return;
      }

    } catch (err) {
      console.error("[ariyan] onChat error:", err);
    }
  },

  onReply: async function ({ event, Reply, message }) {
    try {
      if (!Reply || !event.body) return;
      if (event.senderID !== Reply.author) return;

      await message.reply(`You replied: ${event.body}`);
    } catch (err) {
      console.error("[ariyan] onReply error:", err);
    }
  },

  onReaction: async function ({ event, Reaction, message }) {
    try {
      if (!Reaction) return;
      if (event.userID !== Reaction.author) return;

      await message.reply(`You reacted with: ${event.reaction} 👍`);
    } catch (err) {
      console.error("[ariyan] onReaction error:", err);
    }
  },

  onEvent: async function ({ event, message }) {
    try {
      if (event.logMessageType === "log:subscribe") {
        await message.reply("Welcome to the group! 🎉");
      }
    } catch (err) {
      console.error("[ariyan] onEvent error:", err);
    }
  }
};
