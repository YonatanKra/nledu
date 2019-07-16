//const serviceURL = 'https://us-central1-none-linear-education.cloudfunctions.net/';
const serviceURL = 'http://localhost:5000/none-linear-education/us-central1/';

const storageURL = 'https://firebasestorage.googleapis.com/v0/b/none-linear-education.appspot.com/o/';
const imageSuffix = '?alt=media';

const storage = {
	storageURL ,
	imageSuffix
}
const assetsPath = {
	getAssets: serviceURL + 'getAssets',
	addAsset: serviceURL + 'addAsset'
}

const dataPath = {
	syncData: serviceURL + 'syncData',
	syncProgressData : serviceURL  + 'syncProgressData'
}

const upload = {
	'uploadImage': serviceURL + 'upload_image'
}

const person = {
	addPerson: serviceURL + 'addPerson',
	getPersons: serviceURL + 'getPersons',
	deletePerson : serviceURL + 'deletePerson',
	updatePerson : serviceURL + 'updatePerson'
}

const lesson = {
	getLessons : serviceURL + 'getLessons',
	addLesson : serviceURL + 'addLesson',
	updateLesson : serviceURL + 'updateLesson'
}

const goal = {
	getGoals : serviceURL + 'getGoals',
	addGoal : serviceURL + 'addGoal'
}

const story = {
	addStoryMetaData : serviceURL + 'addStoryMetaData',
	updateStoryMetaData : serviceURL + 'updateStoryMetaData',
	getData : serviceURL + 'getData'
}

const classes = {
	addClass : serviceURL + 'addClass',
	getClasses : serviceURL + 'getClasses'
}

const message = {
	getAllMessages : serviceURL + 'getAllMessages', 
	postMessage : serviceURL + 'postMessage', 
	updateMessage : serviceURL + 'updateMessage', 
}

const subject = {
	getSubjects : serviceURL + 'getSubjects'
}

const assignment = {
	getAssignments : serviceURL + 'getAssignments',
	addAssignment : serviceURL + 'addAssignment',
	updateAssignment : serviceURL + 'updateAssignment'
}

const role = {
	getRoles : serviceURL + 'getRoles'
}

const status ={
	getStatuses : serviceURL + 'getStatuses'
}


module.exports = {
	assetsPath,
	dataPath,
	upload,
	person,
	lesson,
	goal,
	story,
	storage,
	message,
	assignment,
	classes,
	subject,
	role,
	status
}