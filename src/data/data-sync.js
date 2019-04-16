const axios = require('axios');

const current_user = 'kfir';

let interval = 60;
let loop = null;
const STORIES_PREFIX = "twine-stories";
const PASSAGES_PREFIX = "twine-passages";


const startSync = () => {
	
	if (loop === null) {
		loop = setInterval(() => {
       //    sync();

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

	syncData(data);
}

const syncData = data => {
	Object.assign({},data, {user: current_user});
	
	axios
		.post('http://localhost:5000/none-linear-education/us-central1/syncData', data)
		.then(r => r.data)
		.then(students => {
			console.log('succsess ' + students)
		})
		.catch(err => {
            console.log(	err.message + " " + err.response.data)
			err.message + " " + err.response.data
		});
}

const itemsGetter = name => {
	const itemsIds = window.localStorage.getItem(name);

	return itemsIds ?
		itemsIds.split(',').map(item => window.localStorage.getItem(name + '-' + item)) : []
}

module.exports = {
	startSync,
	stopSync
	
}