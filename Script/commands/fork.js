module.exports = {
  config: {
    name: "fork",
    version: "2.0.0",
    author: "ARIYAN SABBIR",
    countDown: 5,
    role: 0,

    shortDescription: {
      en: "Get the GitHub fork link of ARIYAN CHAT BOT."
    },

    longDescription: {
      en: "Provides the official GitHub fork link to create your own copy of ARIYAN CHAT BOT."
    },

    category: "info",

    guide: {
      en: "{p}fork"
    }
  },

  onStart: async function ({ message }) {
    const forkLink =
      "https://github.com/ItsAriyan-X/ARIYAN_CHAT_BOT/fork";

    const replyText =
`╭━━━〔 🤖 ARIYAN CHAT BOT 〕━━━╮

✨ নিজের ফেসবুক আইডিতে
আমাদের Bot সেটআপ করতে চান?

🔗 GitHub Fork Link
━━━━━━━━━━━━━━━━━━
${forkLink}
━━━━━━━━━━━━━━━━━━

📌 কীভাবে করবেন?
➊ উপরের GitHub লিংকে ক্লিক করুন
➋ নিজের GitHub account-এ Login করুন
➌ "Fork" বাটনে ক্লিক করুন
➍ Fork হয়ে গেলে Repository থেকে
   Bot-এর ফাইলগুলো ব্যবহার করুন

⚡ ARIYAN CHAT BOT
👑 Author: ARIYAN SABBIR

╰━━━━━━━━━━━━━━━━━━━━╯`;

    return message.reply(replyText);
  }
};
