const {
	Edit
} = require('../db');

const getAll = () => {
	return Edit.findAll();
}

const add = edit => {
	return Edit.create(edit)
}

const update = (passageId, passage) => {
	return Edit.update(passage, {
		where: {
			'passage': passageId
		}
	});
}

const updateEdit = (id, edit) => {
	return Edit.update(edit, {
		where: {
			'id': id
		}
	});
}


module.exports = {
	getAll,
    add,
    update,
    updateEdit
}