let {
	loadLessons, createLesson
} = require('../actions/lesson');
let {
	incrementSemaphore,
	decrementSemaphore
} = require('../actions/loader');
const lessonPath = require('../../common/servicePathes').lesson;
const {
	showMessage
} = require('../../components/snackbar/snackbar');
const axios = require('axios');
const {uploadImage} = require('../../common/fileUploader');

const lesson = module.exports = {
	async load(store) {
		incrementSemaphore(store);

		const res = await axios.get(lessonPath.getLessons);
		const data = await res.data;

		loadLessons(store, data);
		decrementSemaphore(store);
	},
	async createLesson(store, lessonObject) {
		if (lessonObject && !lessonObject.id) {
			try {
				const res = await axios.post(lessonPath.addLesson, lessonObject);
				const data = await res.data;

				debugger;				

				const les = data.lesson;
				les.stories = data.rels_stories;
				les.goals = data.rels_goals;

				try {
					if(lessonObject.imageDataURL){
						await uploadImage('images/lessons/' + les.id + '/' + lessonObject.path + '.png', lessonObject.imageDataURL);
					}
				} catch (error) {
					showMessage('Falied to load image, but the lesson saved');
				}

				createLesson(store, les);

				showMessage('Lesson Saved successfully')
			} catch (error) {
				showMessage(error)
			}
		}
	},
	async updateLesson(store, lessonObject) {
		if (!lessonObject.id) {
			throw new Error('Lesson has no id');
		}
			try {
				const res = await axios.post(lessonPath.updateLesson, lessonObject);
				const data = await res.data;

				const les = data.lesson;
				les.stories = data.rels_stories;
				les.goals = data.rels_goals;

				try {
					if(lessonObject.imageDataURL){						
						await uploadImage('images/lessons/' + les.id + '/' + lessonObject.path + '.png', lessonObject.imageDataURL);
					}
				} catch (error) {
					showMessage('Falied to load image, but the lesson saved');
				}

				createLesson(store, les);

				showMessage('Lesson Saved successfully')
			} catch (error) {
				showMessage(error)
			}
	}
};
