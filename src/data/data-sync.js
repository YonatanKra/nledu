const axios = require('axios');
const {showMessage} = require('../components/snackbar/snackbar')
const {dataPath} = require('../common/servicePathes')
const current_user = 'kfir';

let interval = 60;
let loop = null;
const STORIES_PREFIX = "twine-stories";
const PASSAGES_PREFIX = "twine-passages";

const cacheItems = {}
cacheItems[STORIES_PREFIX] = {};
cacheItems[PASSAGES_PREFIX] = {};

const startSync = () => {
	
	if (loop === null) {
		loop = setInterval(() => {
         sync();

		}, 1000*5);
	}
}

const stopSync = () => {
	clearInterval(loop);
}

const sync = () => {
	const data = {
		stories: itemsGetter(STORIES_PREFIX),
		passages: itemsGetter(PASSAGES_PREFIX)
	}

	const dataDiffs = {
		stories: itemDiffsGetter(data.stories, STORIES_PREFIX),
		passages: itemDiffsGetter(data.passages, PASSAGES_PREFIX)
	}

	if (dataDiffs.passages.length || dataDiffs.stories.length) {
		syncData(dataDiffs);
	}
}

const syncData = data => {
	Object.assign({},data, {user: current_user});
	
	var d= data;
	axios
		.post(dataPath.syncData, data)
		.then(r => r.data)
		.then(students => {
			showMessage(`Data saved (${d.stories.length} Stories, ${d.passages.length} passages)`)
		})
		.catch(err => {
			showMessage("Error with data sync " +err.message + " " + err.response.data);
		});
}

const itemsGetter = name => {
	const itemsIds = window.localStorage.getItem(name);

	return itemsIds ?
		itemsIds.split(',').map(item => window.localStorage.getItem(name + '-' + item)) : []
}

const itemDiffsGetter = (items, name) =>{
	const diffs = items.filter(item=>cacheItems[name][ JSON.parse(item).id]!==item);
	diffs.forEach(item=>cacheItems[name][ JSON.parse(item).id]=item);

	return diffs;
}

module.exports = {
	startSync,
	stopSync
	
}