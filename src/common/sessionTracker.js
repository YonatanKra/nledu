const ifvisible = require('ifvisible.js');
const {loadProgress,incrementProgress, initProgress } = require('../data/actions/progress');
const sessionsHistory = {};

let currentStoryId = undefined;
let currentPassageId = undefined;


const startTrack = (store, storyId) => {
	//sessionsHistory[storyId] = sessionsHistory[storyId] || {};
	currentStoryId = storyId;

	ifvisible.onEvery(1, () => {
		updateOnActive(store ,currentStoryId, currentPassageId);
	});

	window.jQuery(document).on(':passagestart', ev => {
		handleOnPassageStart(store,ev.passage.domId, ev.passage.title)
	});
}

const updateOnActive = (store, storyId, passageId) => {
	incrementProgress(store, {storyId, passageId})
}

const handleOnPassageStart = (store, passageTitle, title) => {

	const passage = getPassageByTitle(currentStoryId, passageTitle,title);
	if(passage){
		currentPassageId = passage.id;

		initProgress(store, {storyId:currentStoryId, passageId: currentPassageId})
	}

}

const getPassageByTitle = (storyId, passageTitle, title) => {
	const allPassages = window.localStorage.getItem('twine-passages').split(',')
		.map(p => window.localStorage.getItem('twine-passages-' + p))
		.map(JSON.parse);

	const storyPassages = allPassages.filter(p => p.story === storyId);

	return (storyPassages || {}).find(p => p.name.toLowerCase().split(' ').join('-') === passageTitle.replace('passage-', '').toLowerCase()) || 
	(storyPassages || {}).find(p => p.name.toLowerCase().split(' ').join('-') === title.replace('passage-', '').toLowerCase())
}

module.exports = {
	startTrack
};