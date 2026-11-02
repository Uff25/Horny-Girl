/**
 * ARIYAN SABBIR GUARD
 * GoatBot event: group name/photo/theme/emoji backup and restore.
 * Install ariyanGuard.js in Script/events/ and restart the bot.
 */
const fs = require("fs-extra");
const path = require("path");
const axios = require("axios");

const SETTINGS = {
  EXEMPT_GROUP_ADMINS: true,
  EXEMPT_BOT_ADMINS: true,
  KICK_ON_NAME: true,
  KICK_ON_PHOTO: true,
  SNAPSHOT_ON_LOAD: true,
  SNAPSHOT_DELAY_MS: 2500,
  MAX_GROUPS_ON_LOAD: 100,
  KICK_DELAY_MS: 3000,
  RESTORE_LOCK_MS: 20000,
  IMAGE_TIMEOUT_MS: 20000,
  MAX_IMAGE_BYTES: 10 * 1024 * 1024
};
const CREDIT = "ARIYAN SABBIR";

module.exports.config = {
  name: "ariyanGuard",
  version: "1.1.0",
  credits: "ARIYAN SABBIR",
  description: "Backup and restore group name, photo, theme and emoji",
  eventType: [
    "log:thread-name", "log:thread-icon", "log:thread-color",
    "log:thread-image", "change_thread_image", "log:subscribe"
  ],
  cooldowns: 0
};

const CACHE_DIR = path.join(__dirname, "..", "..", "cache", "ariyanGuard");
fs.ensureDirSync(CACHE_DIR);
const jsonFile = tid => path.join(CACHE_DIR, `${String(tid)}.json`);
const imgFile = tid => path.join(CACHE_DIR, `${String(tid)}.jpg`);

function call(fn, ...args) {
  return new Promise((resolve, reject) => {
    let doneOnce = false;
    const done = (err, value) => {
      if (doneOnce) return;
      doneOnce = true;
      err ? reject(err) : resolve(value);
    };
    try {
      const result = fn(...args, done);
      if (result && typeof result.then === "function") result.then(v => done(null, v), done);
      else if (result !== undefined && fn.length <= args.length) done(null, result);
    } catch (e) { done(e); }
  });
}
const getThreadInfo = (api, tid) => call(api.getThreadInfo.bind(api), String(tid));

function readSnap(tid) {
  try {
    return fs.existsSync(jsonFile(tid))
      ? JSON.parse(fs.readFileSync(jsonFile(tid), "utf8")) : null;
  } catch (e) {
    console.error("[ariyanGuard] Snapshot read:", e.message);
    return null;
  }
}
function writeSnap(tid, snap) {
  try { fs.writeFileSync(jsonFile(tid), JSON.stringify(snap, null, 2)); return true; }
  catch (e) { console.error("[ariyanGuard] Snapshot write:", e.message); return false; }
}

const locks = new Map();
function lock(tid, field) { locks.set(`${tid}:${field}`, Date.now() + SETTINGS.RESTORE_LOCK_MS); }
function isLocked(tid, field) {
  const key = `${tid}:${field}`, until = locks.get(key);
  if (!until) return false;
  if (Date.now() > until) { locks.delete(key); return false; }
  return true;
}

async function downloadImage(url, tid) {
  if (!url) return false;
  const tmp = `${imgFile(tid)}.tmp`;
  try {
    const res = await axios.get(url, {
      responseType: "arraybuffer",
      timeout: SETTINGS.IMAGE_TIMEOUT_MS,
      maxContentLength: SETTINGS.MAX_IMAGE_BYTES,
      maxBodyLength: SETTINGS.MAX_IMAGE_BYTES,
      validateStatus: s => s >= 200 && s < 300
    });
    const type = String(res.headers["content-type"] || "").toLowerCase();
    const buffer = Buffer.from(res.data);
    if (!type.startsWith("image/") || !buffer.length || buffer.length > SETTINGS.MAX_IMAGE_BYTES) return false;
    fs.writeFileSync(tmp, buffer);
    fs.moveSync(tmp, imgFile(tid), { overwrite: true });
    return true;
  } catch (e) {
    fs.removeSync(tmp).catch(() => {});
    console.error("[ariyanGuard] Image backup:", e.message);
    return false;
  }
}

async function takeFullSnapshot(api, tid, suppliedInfo) {
  const info = suppliedInfo || await getThreadInfo(api, tid);
  if (!info) return null;
  const old = readSnap(tid);
  const snap = {
    name: info.threadName || old?.name || "",
    emoji: info.emoji || old?.emoji || null,
    color: info.threadColor || info.color || old?.color || null,
    hasImage: false,
    savedAt: Date.now()
  };
  const saved = await downloadImage(info.imageSrc, tid);
  snap.hasImage = saved || Boolean(old?.hasImage && fs.existsSync(imgFile(tid)));
  return writeSnap(tid, snap) ? snap : null;
}

function configuredAdmins() {
  const cfg = global.config || {};
  return [].concat(cfg.ADMINBOT || [], cfg.DEVELOPER || []).map(String);
}
function isExemptUser(api, uid, admins) {
  if (!uid) return false;
  uid = String(uid);
  try { if (uid === String(api.getCurrentUserID())) return true; } catch (_) {}
  if (SETTINGS.EXEMPT_BOT_ADMINS && configuredAdmins().includes(uid)) return true;
  return SETTINGS.EXEMPT_GROUP_ADMINS && admins.includes(uid);
}
async function userName(api, uid) {
  try {
    const result = await call(api.getUserInfo.bind(api), [String(uid)]);
    return result?.[String(uid)]?.name || "Unknown User";
  } catch (_) { return "Unknown User"; }
}

const LINE = "━━━━━━━━━━━━━━━━━━━━━━";
const FOOT = "🛡️ 𝗔𝘂𝘁𝗼 𝗕𝗮𝗰𝗸𝘂𝗽 & 𝗥𝗲𝘀𝘁𝗼𝗿𝗲 𝗔𝗰𝘁𝗶𝘃𝗲";
function frame(icon, title, rows) {
  return `╔${LINE}╗\n   ${icon}  ${title}\n╚${LINE}╝\n\n${rows.join("\n")}\n\n${FOOT}\n${LINE}\n✦ 𝗣𝗼𝘄𝗲𝗿𝗲𝗱 𝗕𝘆 ➤ ${CREDIT} ✦`;
}
function warn(kind, who, oldName, kick) {
  const name = kind === "name";
  const rows = [
    `👤 পরিবর্তনকারী: ${who}`,
    name ? `♻️ আগের নাম ফিরিয়ে আনা হয়েছে: ${oldName}` : "♻️ আগের ছবি ফিরিয়ে আনা হয়েছে",
    "", `⚠️ অনুমতি ছাড়া গ্রুপের ${name ? "নাম" : "ছবি"} পরিবর্তন করা যাবে না!`
  ];
  if (kick) rows.push("", `⏳ ${SETTINGS.KICK_DELAY_MS / 1000} সেকেন্ড পর তাকে সরানোর চেষ্টা হবে...`);
  return frame(name ? "🏷️" : "🖼️", name ? "𝗡𝗔𝗠𝗘 𝗟𝗢𝗖𝗞𝗘𝗗" : "𝗣𝗛𝗢𝗧𝗢 𝗟𝗢𝗖𝗞𝗘𝗗", rows);
}
function softNotice(kind, who, old) {
  const theme = kind === "theme";
  return frame(theme ? "🎨" : "😀", theme ? "𝗧𝗛𝗘𝗠𝗘 𝗟𝗢𝗖𝗞𝗘𝗗" : "𝗘𝗠𝗢𝗝𝗜 𝗟𝗢𝗖𝗞𝗘𝗗", [
    `👤 পরিবর্তনকারী: ${who}`,
    theme ? "♻️ আগের থিম ফিরিয়ে আনার চেষ্টা করা হয়েছে" : `♻️ আগের ইমোজি: ${old || "ব্যাকআপ নেই"}`,
    "", `⚠️ অনুমতি ছাড়া গ্রুপের ${theme ? "থিম" : "ইমোজি"} পরিবর্তন করা যাবে না!`
  ]);
}
async function send(api, message, tid) {
  return call(api.sendMessage.bind(api), message, String(tid));
}

module.exports.onLoad = async ({ api }) => {
  if (!SETTINGS.SNAPSHOT_ON_LOAD) return;
  setTimeout(async () => {
    try {
      const list = await call(api.getThreadList.bind(api), SETTINGS.MAX_GROUPS_ON_LOAD, null, ["INBOX"]);
      const groups = (list || []).filter(x => x && x.isGroup);
      for (const group of groups) {
        const tid = String(group.threadID);
        if (!readSnap(tid)) {
          try { await takeFullSnapshot(api, tid); }
          catch (e) { console.error("[ariyanGuard] Backup:", e.message); }
          await new Promise(r => setTimeout(r, SETTINGS.SNAPSHOT_DELAY_MS));
        }
      }
      console.log(`[ariyanGuard] Backup scan finished: ${groups.length} group(s).`);
    } catch (e) { console.error("[ariyanGuard] Startup backup:", e.message); }
  }, 15000);
};

module.exports.run = async ({ api, event }) => {
  try {
    if (!event?.threadID) return;
    const tid = String(event.threadID);
    const author = String(event.author || event.senderID || "");
    const type = event.logMessageType || event.type;
    const data = event.logMessageData || {};
    const botID = String(api.getCurrentUserID());

    if (type === "log:subscribe") {
      const added = data.addedParticipants || [];
      if (added.some(p => String(p.userFbId || p.userID || p.id || "") === botID) && !readSnap(tid)) {
        setTimeout(() => takeFullSnapshot(api, tid).catch(e =>
          console.error("[ariyanGuard] New group backup:", e.message)), 5000);
      }
      return;
    }

    let field = null;
    if (type === "log:thread-name") field = "name";
    else if (type === "log:thread-icon") field = "emoji";
    else if (type === "log:thread-color") field = "color";
    else if (type === "log:thread-image" || type === "change_thread_image") field = "image";
    if (!field || (author === botID && isLocked(tid, field))) return;

    const snap = readSnap(tid);
    if (!snap) { await takeFullSnapshot(api, tid); return; }

    const info = await getThreadInfo(api, tid);
    if (!info) return;
    const admins = (info.adminIDs || []).map(a => String(a?.id || a?.userID || a));
    const botIsAdmin = admins.includes(botID);

    if (isExemptUser(api, author, admins)) {
      if (field === "name") snap.name = data.name ?? info.threadName ?? snap.name;
      if (field === "emoji") snap.emoji = data.thread_icon || info.emoji || snap.emoji;
      if (field === "color") snap.color = data.theme_color || data.thread_color || info.threadColor || info.color || snap.color;
      if (field === "image" && await downloadImage(info.imageSrc, tid)) snap.hasImage = true;
      snap.savedAt = Date.now();
      writeSnap(tid, snap);
      return;
    }

    const who = await userName(api, author);
    const sleep = ms => new Promise(r => setTimeout(r, ms));

    if (field === "color") {
      if (snap.color) {
        lock(tid, "color");
        await call(api.changeThreadColor.bind(api), snap.color, tid).catch(e =>
          console.error("[ariyanGuard] Theme restore:", e.message));
      }
      await send(api, softNotice("theme", who), tid).catch(() => {});
      return;
    }

    if (field === "emoji") {
      if (snap.emoji) {
        lock(tid, "emoji");
        await call(api.changeThreadEmoji.bind(api), snap.emoji, tid).catch(e =>
          console.error("[ariyanGuard] Emoji restore:", e.message));
      }
      await send(api, softNotice("emoji", who, snap.emoji), tid).catch(() => {});
      return;
    }

    if (field === "name" || field === "image") {
      const kind = field === "name" ? "name" : "photo";
      let restored = false;
      if (field === "name" && snap.name) {
        lock(tid, "name");
        try { await call(api.setTitle.bind(api), snap.name, tid); restored = true; }
        catch (e) { console.error("[ariyanGuard] Name restore:", e.message); }
      } else if (field === "image" && snap.hasImage && fs.existsSync(imgFile(tid))) {
        lock(tid, "image");
        try {
          await call(api.changeGroupImage.bind(api), fs.createReadStream(imgFile(tid)), tid);
          restored = true;
        } catch (e) { console.error("[ariyanGuard] Photo restore:", e.message); }
      }

      // No backup or failed restore: never remove a member.
      if (!restored) {
        await send(api, frame("⚠️", "𝗥𝗘𝗦𝗧𝗢𝗥𝗘 𝗙𝗔𝗜𝗟𝗘𝗗", [
          `👤 ${who}`, "ব্যাকআপ নেই অথবা আগের সেটিংস ফিরিয়ে আনা যায়নি।", "তাই কাউকে গ্রুপ থেকে সরানো হয়নি।"
        ]), tid).catch(() => {});
        return;
      }

      const kickEnabled = field === "name" ? SETTINGS.KICK_ON_NAME : SETTINGS.KICK_ON_PHOTO;
      const doKick = Boolean(kickEnabled && botIsAdmin && author && author !== botID);
      await send(api, warn(kind, who, snap.name || "—", doKick), tid).catch(() => {});
      if (!doKick) return;

      await sleep(SETTINGS.KICK_DELAY_MS);
      const kicked = await call(api.removeUserFromGroup.bind(api), author, tid)
        .then(() => true)
        .catch(e => { console.error("[ariyanGuard] Member removal:", e.message); return false; });
      await send(api, frame(kicked ? "👢" : "⚠️", kicked ? "𝗨𝗦𝗘𝗥 𝗥𝗘𝗠𝗢𝗩𝗘𝗗" : "𝗔𝗖𝗧𝗜𝗢𝗡 𝗙𝗔𝗜𝗟𝗘𝗗", [
        `👤 ${who}`, kicked ? "সদস্যকে গ্রুপ থেকে সরানো হয়েছে।" : "সদস্যকে সরানো যায়নি; বটের অ্যাডমিন অনুমতি পরীক্ষা করুন।"
      ]), tid).catch(() => {});
    }
  } catch (e) {
    console.error("[ariyanGuard] Event error:", e?.message || e);
  }
};
