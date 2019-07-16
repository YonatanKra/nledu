const axios = require('axios');
const {
	showMessage
} = require('../components/snackbar/snackbar')
const {
	dataPath
} = require('../common/servicePathes')
let current_user = 'default';

let interval = 60;
let loop = null;
const STORIES_PREFIX = "twine-stories";
const PASSAGES_PREFIX = "twine-passages";
const PROGRESS_KEY_NAME = "progress-tracker";

const cacheItems = {}
cacheItems[STORIES_PREFIX] = {};
cacheItems[PASSAGES_PREFIX] = {};
cacheItems[PROGRESS_KEY_NAME] = {};

const startSync = store => {
	if (!store.state.auth.currentUser) {
		return;
	}
	let user = store.state.auth.currentUser.uid;

	if (loop === null) {
		loop = setInterval(() => {
			sync(user);
			syncProgress(user);
		}, 1000 * 5);
	}
}

const stopSync = () => {
	clearInterval(loop);
}

const sync = (user) => {
	const data = {
		stories: itemsGetter(STORIES_PREFIX),
		passages: itemsGetter(PASSAGES_PREFIX)
	}

	const dataDiffs = {
		stories: itemDiffsGetter(data.stories, STORIES_PREFIX),
		passages: itemDiffsGetter(data.passages, PASSAGES_PREFIX),
		deletedPassages: getDeletedPassages(data.passages, PASSAGES_PREFIX)
	}

	if (dataDiffs.passages.length || dataDiffs.stories.length || dataDiffs.deletedPassages.length) {
		//debugger;
		syncData(dataDiffs, user);
	}
}

const getDeletedPassages = (items, name) => {
	const res =  Object.keys(cacheItems[name]).filter(item => item !=="undefined" && items.find(t => JSON.parse(t).id === item) === undefined);
	res.forEach(d=>delete cacheItems[name][d]);

	return res;

}

const syncData = (data, user) => {
	Object.assign({}, data, {
		user: user
	});

	var d = data;
	axios
		.post(dataPath.syncData, data)
		.then(r => r.data)
		.then(students => {
			showMessage(`Data saved (${d.stories.length} Stories, ${d.passages.length} passages)`)
		})
		.catch(err => {
			showMessage("Error with data sync " + err.message + " " + err.response.data);
		});
}

const itemsGetter = name => {
	const itemsIds = window.localStorage.getItem(name);

	return itemsIds ?
		itemsIds.split(',').map(item => window.localStorage.getItem(name + '-' + item)) : []
}

const itemDiffsGetter = (items, name) => {
	const diffs = items.filter(item => cacheItems[name][JSON.parse(item).id] !== item);
	diffs.forEach(item => cacheItems[name][JSON.parse(item).id] = item);

	return diffs;
}

const syncProgress = async (user) => {
	let progressData = window.localStorage.getItem(PROGRESS_KEY_NAME);

	if (progressData) {
		progressData = JSON.parse(progressData);
		if (JSON.stringify(cacheItems[PROGRESS_KEY_NAME]) !== JSON.stringify(progressData)) {
			cacheItems[PROGRESS_KEY_NAME] = progressData;

			try {
				const res = await axios.post(dataPath.syncProgressData, {
					userId: user,
					progress: progressData
				});
				const data = await res.data;

				console.log('saved ' + data);
			} catch (error) {
				showMessage("Error with sync progress " + error);
				console.log("Error with sync progress", error);
			}
		}
	}
}

module.exports = {
	startSync,
	stopSync

}