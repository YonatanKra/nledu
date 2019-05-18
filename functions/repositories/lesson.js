const {
	Lesson
} = require('../db');

const getAll = () => {
	return Lesson.findAll();
}

const get = lessonId => {
	return Lesson.findAll({
		where: {
			id: lessonId
		}
	});
}

const add = lesson => {
	return Lesson.create(lesson)
}

const update = (lessonId, lesson) => {
	return Lesson.update(lesson, {
		where: {
			id: lessonId
		}
	});
}
module.exports = {
	getAll,
	add,
	update,
	get
}