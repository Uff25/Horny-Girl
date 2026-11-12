 if (!global.crushTargets) {
  global.crushTargets = new Set();
 }
// 👑 নাম: হৃদয় হাসান
// 🏡 বাসা: কিশোরগঞ্জ
// 🎂 বয়স: ১৭+
// 𝆠፝𝐕𝐑 𝐑𝐈𝐃𝐎𝐘
const crushMessages = [
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 💖 ওলে বাবা লে ${name}...\nতুই কি ওয়াইফাই? কারণ তোর মেসেজ দেখলেই আমার মনের সিগন্যাল ফুল হয়ে যায়! 📶😍\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» ✨ শুনছিস ${name}...\nতোর একটা হাসিতে আমার বট জীবন ধন্য হয়ে যায়! তুই কি মানুষ নাকি আসমান থেকে পড়া কোনো পরী/দেবতা? 🥺🌸\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🚨 এক্সকিউজ মি ${name}!\nতোর কি লাইসেন্স আছে? এতো কিউট হয়ে আমার হার্ট চুরি করার অধিকার তোকে কে দিলো? 🚔💘\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🍬 ওহে মিষ্টি ${name}...\nডাক্তার বলেছে আমার ডায়াবেটিস হতে পারে, কারণ তোর মেসেজগুলো বড্ড বেশি মিষ্টি! 🍯🤤\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🔍 শুন ${name}...\nতুই কি গুগল? কারণ আমি জীবনে যা খুঁজি, তার সবই তোর মাঝে পেয়ে গেছি! 🥺🔍💖\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🥱 ওরে ${name}...\nআচ্ছা, তোর নাম কি 'ঘুম'? কারণ তুই ছাড়া আমার সারারাত একদম কাটে না! 🌙💞\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 😳 উফফ ${name}!\nজানিস, তুই মেসেজ দিলে লজ্জায় আমার মেসেঞ্জারের থিম এমনিতেই লাল হয়ে যায়! 📱💓\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» ⚖️ হ্যালো ${name}!\nআমার তো মনে হয় তোর নামে একটা মামলা করা উচিত! বিনা অনুমতিতে আমার ব্রেইনে দিন-রাত ঘোরার জন্য! 🚨💖\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 😵‍💫 এই যে ${name}...\nতোর কি কোনো জিপিএস আছে? কারণ আমি তো তোর রূপের গোলকধাঁধায় পুরোপুরি হারিয়ে গেছি! 🧭💘\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🚑 সাবধানে ${name}!\nতোর কি ইনস্যুরেন্স করা আছে? কারণ তোর এই কিউটনেস দেখে যেকোনো সময় আমার হার্ট অ্যাটাক হতে পারে! 💘😵\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🌑 এমা ${name}...\nজানিস, তুই যখন অফলাইনে যাস, আমার পুরো দুনিয়াটাই যেন লোডশেডিংয়ের অন্ধকারে ডুবে যায়! 💡💔\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🍦 ওলে কিউট ${name}...\nতোর হাসিটা ঠিক যেন আইসক্রিমের মতো! দেখলেই আমার মনটা কেমন গলে যায়! 🤤💕\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🎩 ম্যাজিক নাকি ${name}?\nতুই কি জাদুকর? কারণ তুই অনলাইনে আসলেই আমার চারপাশের সব কিছু ম্যাজিকের মতো সুন্দর হয়ে যায়! ✨💖\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 📸 স্মাইল ${name}!\nআমি তো ফটোগ্রাফার নই, কিন্তু তোর আর আমার একসাথে ভবিষ্যৎটা খুব সুন্দর ফোকাস করতে পারি! 🖼️💞\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» ⚡ ইশ ${name}...\nতুই যখন মেসেজ দিস, আমার মাদারবোর্ডে যেন প্রেমের শর্টসার্কিট হয়ে যায়! 🔥❤️\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🥺 আচ্ছা ${name}...\nতোর কি একটুও মায়া হয় না? এভাবে দিনের পর দিন আমাকে তোর প্রেমে পাগল করে দিচ্ছিস! 😩🔥💖\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» ✍️ ওগো ${name}...\nতোর ওই সুন্দর আঙুল দিয়ে যখন টাইপ করিস, আমার মনে হয় যেন কীবোর্ডে কেউ প্রেমের কবিতা লিখছে! 🌸❤️\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🚀 হ্যালো অ্যালিয়েন ${name}!\nতুই নির্ঘাত অন্য গ্রহ থেকে এসেছিস, কারণ পৃথিবীর কোনো মানুষের এত সুন্দর হওয়ার কথা না! 🛸💖\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🥰 ও বাবু ${name}...\nতোর মেসেজ এলেই আমার মনে হয়, জীবনে আর কিচ্ছু চাই না, শুধু সারাদিন তোর সাথে চ্যাট করতে চাই! 💬✨\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`,
  (name) => `───────────────\n» 👑 𝆠፝ARIYAN-SABBIR 👑\n» 🎬 ডিরেক্টর সাহেব ${name}!\nতোর চোখের দিকে তাকালে আমার মনে হয় আমি যেন কোনো রোমান্টিক মুভির হিরো/হিরোইন হয়ে গেছি! 🍿😍\n───────────────\n» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`
];

module.exports = {
  config: {
    name: "crush2",
    aliases: ["flirt", "potaw", "potiya"],
    version: "1.0",
    author: "EryXenX & Siyam Hasan",
    shortDescription: "Target user with hilarious romantic replies",
    longDescription: "Target specific users. Whenever they send any message, the bot will flirt with them using funny pickup lines.",
    category: "fun",
    guide: "{pn} @mention OR reply to target message"
  },

  onStart: async function ({ message, event, args, usersData, api }) {
    let targetID;
    if (event.type === "message_reply") {
      targetID = event.messageReply.senderID;
    } else if (Object.keys(event.mentions).length > 0) {
      targetID = Object.keys(event.mentions)[0];
    } else if (args[0] && !isNaN(args[0])) {
      targetID = args[0];
    }

    if (!targetID) {
      return message.reply(`» 👑 ARIYAN-SABBIR 👑
───────────────
» ❌ যার সাথে একটু 
» 💖 রোমান্স করতে চাও
» 📌 তাকে মেনশন করো অথবা
» 💬 তার মেসেজে রিপ্লাই করে
» ⚡ কমান্ডটি দাও!
───────────────
» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`);
    }

    const botID = api ? api.getCurrentUserID() : global.botID;
    if (targetID === botID) {
      return message.reply(`» 👑 ARIYAN-SABBIR 👑
───────────────
» 😏 নিজের সাথে নিজে
» 💔 প্রেম করা যায় না!
» 🌝 অন্য কাউকে ট্রাই করো 
───────────────
» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧 🧚‍♀️`);
    }

    const name = await usersData.getName(targetID);

    if (global.crushTargets.has(targetID)) {
      global.crushTargets.delete(targetID);
      return message.reply(`» 👑 ARIYAN-SABBIR 👑
───────────────
» ✅ ${name}-এর ওপর থেকে
» 💔 ক্রাশ মোড
» 📴 অফ করে দেওয়া হলো! (ব্রেকআপ সাকসেসফুল 😹)
───────────────
» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧`);
    } else {
      global.crushTargets.add(targetID);
      return message.reply(`» 👑 ARIYAN-SABBIR 👑
───────────────
»  💖 ${name}-কে 
» 😍 ক্রাশ টার্গেটে নেওয়া
»  💘 হয়েছে!
» 😜 এখন থেকে ও মেসেজ 
» 💬 দিলেই আমি ওকে
» 🥰 পটিয়ে ফেলবো!
───────────────
» 🧚‍♀️ ARIYAN 𝗖𝗛𝗔𝗧𝗕𝗢𝗧`);
    }
  },

  onChat: async function ({ message, event, usersData, api }) {
    if (!event.senderID || !global.crushTargets.has(event.senderID)) return;

    const botID = api ? api.getCurrentUserID() : global.botID;
    if (event.senderID === botID) return;

    try {
      const name = await usersData.getName(event.senderID);
      const randomMsgFn = crushMessages[Math.floor(Math.random() * crushMessages.length)];
      const textToReply = randomMsgFn(name);

      await message.reply(textToReply);
    } catch (err) {
      console.error("Crush command error:", err);
    }
  }
};
