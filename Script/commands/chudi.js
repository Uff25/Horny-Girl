const activeSessions = new Map();

module.exports = {
  config: {
    name: "su",
    aliases: ["chud"],
    version: "1.0",
    author: "𝐒𝐈𝐘𝐀𝐌-𝐇𝐀𝐒𝐀𝐍",
    role: 2,
    category: "admin",
    guide: {
      vi: "Not Available",
      en: "chud @(mention) or su off"
    } 
  },

  onStart: async function ({ api, event, userData, args }) {
    const threadID = event.threadID;

    if (args[0] && args[0].toLowerCase() === "off") {
      if (activeSessions.has(threadID)) {
        const timeouts = activeSessions.get(threadID);
        timeouts.forEach(clearTimeout);
        activeSessions.delete(threadID);
        return api.sendMessage("☑️", threadID);
      } else {
        return api.sendMessage("❌", threadID);
      }
    }

    var mention = Object.keys(event.mentions)[0];
    if(!mention) return api.sendMessage("👉 আ্ঁরি্ঁয়া্ঁন্ঁ বস যাকে চুদ্দে চাউ তার আইডি @ম্যানশন দেউ__🖕🥵", threadID);

    let realName = "";
    try {
      if (userData && typeof userData.getName === "function") {
        realName = await userData.getName(mention);
      } else {
        let userInfo = await api.getUserInfo(mention);
        realName = userInfo[mention]?.name || "মাগি";
      }
    } catch (e) {
      realName = "আবাল";
    }

    var tagText = "@" + realName;
    var arraytag = [{ id: mention, tag: tagText }];

    var a = function (text) {
      return api.sendMessage({ body: text + " " + tagText, mentions: arraytag }, threadID);
    };

    if (activeSessions.has(threadID)) {
      activeSessions.get(threadID).forEach(clearTimeout);
    }

    const timeouts = [];

    const messages = [
     { msg: "কিরে মাদারচোত-আ্ঁরি্ঁয়া্ঁন্ঁ বস এর চুদন খাওয়ায় জন্য রেডি তো? লে চুদা খা মাঙ্গের বেটা 😂😂", time: 3000 },
      { msg: "মাঘি চুদা শরের বাচ্চা কার লগে পঙ্গা নিতে আসছিস 🤬🤬🤬", time: 5000 },
      { msg: " চুদে গুহা ফাঁক করে দিব খানকীর পোলা 🤤", time: 7000 },
      { msg: " মাদারচোত বোকাচোদা খানকীর পোলা ", time: 9000 },
      { msg: " বেসসা মাঘী চোদা কুত্তা চোদা", time: 12000 },
      { msg: " ছাগল চুদা গরু চুদা মাঙ্গের বেটা লোকজন দেখে লাগতে আসিস কুত্তার বাচ্চা 🤬", time: 14000 },
      { msg: " তোর আব্বুকে ভুলে গেলি মাদারচোত 😂", time: 16000 },
      { msg: " তোকে কনডম ছাড়া চুদী মঙ্গের বেটা 🖕🏿", time: 18000 },
      { msg: " আমার ধন চুষ তাইলে থামবো 😂", time: 20000 },
      { msg: " তোরে কুত্তা দিয়ে চোদাই 😍", time: 22000 },
      { msg: " মাঘীর মাং চাটিস বোকাচোদার বাচ্চা তোকে কন্ডম ছাড়া উল্টা করে চুদি 🤬", time: 24000 },
      { msg: " এখনো সময় আছে মাফ চা 🤣🤣", time: 26000 },
      { msg: " তোর নানি কেমন আছে 😍??", time: 28000 },
      { msg: " তোকে চুদী 🥰", time: 30000 },
      { msg: " মাদারচোত 🥰", time: 32000 },
      { msg: " আজকের চুদন আজীবন মনে রাখিস বোকাচোদা 🤣🤣🤣", time: 34000 },
      { msg: "মাঘা 🥰", time: 36000 },
      { msg: " আয় আমার হোল টা চুষে দে 🥵🥵", time: 38000 },
      { msg: " বাপ কে ভুলিস না বোকাচোদার বাচ্চা 🤬🤬🤬🤬🤬", time: 40000 },
      { msg: " হোল কাটে নিবো 🤬🤬🤬🤬🤬🤬", time: 44000 },
      { msg: " তোমার গুষ্টি চুদী ব্রো 😞🖕🏿", time: 46000 },
      { msg: "🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿🖕🏿", time: 48000 },
      { msg: " মাঘীর ছেলে তোর মাকে চুদী 🖕🏽🖕🏽🖕🏽 ", time: 50000 },
      { msg: " আজকে তোকে প্যান্ট না খুলেই চুদবো 🤬 তোর মাকে একটু আগেই চুঁদে আসলাম 😂", time: 52000 },
      { msg: "বোকাচোদার বাচ্চা 😂", time: 56000 },
      { msg: " মাদারচোত বোকাচোদা খানকীর ছেলে 🤬", time: 58000 },
      { msg: " প্যান্ট ভিজে নাই 🤣🤣🤣🤣🤣🤣🤣???", time: 60000 },
      { msg: " আরো চুদন খাইতে চাচ্ছিস ???? ", time: 62000 },
      { msg: " আয় মাদারচোত আমার ধণ টা চুষে যা 🤬", time: 64000 },
      { msg: " আব্বা কে ভুলিস না 🤬", time: 65000 },
      { msg: " তোকে ডগি স্টাইল e চুদী 😋😋", time: 66000 },
      { msg: " তোর আব্বাকে ভুললে আরেকবার এমন চুদন চুদবো মোর যাবি মঙ্গের বেটা 😂😂😂", time: 68000 },
      { msg: " আজকের চুদন আজীবন মনে রাখবি 🤣🤣🤣", time: 70000 },
      { msg: " আয় আমার ধোন টা চুষে যা মঙ্গের পুত 🤬🤬🤬🤬", time: 72000 },
      { msg: " তোরে মুততে মুততে চুদী 🤣🤣", time: 74000 },
      { msg: " চুঁদে পাউরুটি বানায় তোর হোগায় ভরে দিব মাঙ্গের বেতা চিনিস আমারে???", time: 76000 },
      { msg: " খানকীর পোলা তোর বাপকে ভুলে গেলি?? জন্ম দেওয়া ভুল হইলো 🤬🤬🤬", time: 78000 },
      { msg: "বোকাচোদার বাচ্চা 😍", time: 80000 },
      { msg: " তোকে চুদী 😍😍😍", time: 82000 },
      { msg: " হোল কাটে নিবো মঙ্গের বেটা কার লগে লাগতে আসছিস 🤬", time: 84000 },
      { msg: "আ্ঁরি্ঁয়া্ঁন্ঁ বস এর চুদন কেমন লাগলো বাচ্চা 🤣🤣🤣🤣??", time: 86000 }
    ];

    messages.forEach((item) => {
      const timer = setTimeout(() => {
        a(item.msg);
      }, item.time);
      timeouts.push(timer);
    });

    activeSessions.set(threadID, timeouts);
  }
};
