const fs = require("fs-extra");
const axios = require("axios");
const cheerio = require("cheerio");
const qs = require("qs");
const { getStreamFromURL, shortenURL, randomString } = global.utils;

module.exports = {
	threadStates: {},
	config: {
		name: 'autolink',
		version: '1.0',
		author: 'Kshitiz',
		countDown: 5,
		role: 0,
		shortDescription: 'downloader',
		longDescription: '',
		category: 'media',
		guide: {
			en: '{p}{n}',
		}
	},
	onStart: async function ({ api, event }) {
		const threadID = event.threadID;

		if (!this.threadStates[threadID]) {
			this.threadStates[threadID] = {};
		}

		if (event.body.toLowerCase().includes('autolink')) {
			api.sendMessage("AutoLink is active.", event.threadID, event.messageID);
		}
	},
	onChat: async function ({ api, event }) {
		if (this.checkLink(event.body)) {
			const { url } = this.checkLink(event.body);
			console.log(`Attempting to download from URL: ${url}`);
			this.downLoad(url, api, event);
      
