const {
	AssignmentLessons
} = require('../db');

const getAll = () => {
	return AssignmentLessons.findAll();
}

const remove = assignmentId => {
	return AssignmentLessons.destroy({
		where: {
			assignment_id: assignmentId
		}
	});
}

const addMany = (assignmentId, assignmentLessons) => {
	const newLS = assignmentLessons.map(ls => Object.assign({}, ls, {
		assignment_id: assignmentId
	}));

	return AssignmentLessons.bulkCreate(newLS);
}

module.exports = {
	remove,
    addMany,
    getAll
}