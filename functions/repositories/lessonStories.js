const {
	LessonStories
} = require('../db');

const remove = lessonId => {
	return LessonStories.destroy({
		where: {
			lesson_id: lessonId
		}
	});
}

const addMany = (lessonId, lessonStories) => {
	const newLS = lessonStories.map(ls => Object.assign({}, ls, {
		lesson_id: lessonId
	}));

	return LessonStories.bulkCreate(newLS);
}

module.exports = {
	remove,
	addMany
}