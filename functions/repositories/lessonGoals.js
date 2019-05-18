const {
	LessonGoals
} = require('../db');

const remove = lessonId => {
	return LessonGoals.destroy({
		where: {
			lesson_id: lessonId
		}
	});
}

const addMany = (lessonId, lessonStories) => {
	const newLS = lessonStories.map(ls => Object.assign({}, ls, {
		lesson_id: lessonId
	}));

	return LessonGoals.bulkCreate(newLS);
}

module.exports = {
	remove,
	addMany
}