let {
	loadMessages, postMessage, markAsDone, markAsRead
} = require('../actions/message');
let {
	incrementSemaphore,
	decrementSemaphore
} = require('../actions/loader');
const messagePath = require('../../common/servicePathes').message;
const {
	showMessage
} = require('../../components/snackbar/snackbar');
const axios = require('axios');
const uuid = require('tiny-uuid');

const message = module.exports = {
	async load(store) {
		incrementSemaphore(store);

		const res = await axios.get(messagePath.getAllMessages);
		const data = await res.data;

		loadMessages(store, data);
		decrementSemaphore(store);
	},
	async postMessage(store, messageObject) {
		if (messageObject && !messageObject.id) {
			try {
                messageObject.id = uuid();
				const res = await axios.post(messagePath.postMessage, messageObject);
				const data = await res.data;

				debugger;				

				postMessage(store, messageObject);

			} catch (error) {
				showMessage(error)
			}
		}
	},
	async updateMessage(store, messageObject){
		if (messageObject && messageObject.id) {
			try {
				const res = await axios.post(messagePath.postMessage, messageObject);
				const data = await res.data;

				debugger;				

				postMessage(store, messageObject);

			} catch (error) {
				showMessage(error)
			}
		}
	}
	
};
