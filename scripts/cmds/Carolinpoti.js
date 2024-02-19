const { get } = require("axios");
const carolinaUrl = "https://cari.onrender.com/kshitiz";

module.exports = {
  config: {
    name: "darling",
    aliases: [],
    version: "1.0.0",
    author: "Kshitiz",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: "Talk to darling AI (continues conversation)",
    },
    longDescription: {
      en: "Talk to darling AI (continues conversation)",
    },
    category: "AI",
    guide: {
      en: "{p}darling message / onReply",
    },
  },

  async makeApiRequest(prompt, id) {
    try {
      const response = await get(`${carolinaUrl}?content=${prompt}`);
      return response.data.chatResult;
    } catch (error) {
      throw error;
    }
  },

  async sendMessage(api, event, message, onReplyCallback) {
    api.sendMessage(message, event.threadID, (err, info) => {
      if (!err) {
        onReplyCallback(info.messageID);
      } else {
        console.error("Error sending message:", err);
      }
    });
  },

  onStart: async function ({ api, event, args }) {
    try {
      const prompt = args.join(" ");
      
