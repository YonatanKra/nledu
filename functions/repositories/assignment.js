const {
	Assignment
} = require('../db');

const getAll = () => {
	return Assignment.findAll();
}

const get = assignmentId => {
	return Assignment.findAll({
		where: {
			id: assignmentId
		}
	});
}

const add = assignment => {
	return Assignment.create(assignment)
}

const update = (assignmentId, assignment) => {
	return Assignment.update(assignment, {
		where: {
			id: assignmentId
		}
	});
}
module.exports = {
	getAll,
	add,
	update,
	get
}