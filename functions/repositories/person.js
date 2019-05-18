const {Person}   = require('../db');

const getAll = ()=>{
	return Person.findAll();
}

const add = person=>{
	return Person.create(person);
}

const update = (personId, person) => {
	return Person.update(person, {
		where: {
			id: personId
		}
	});
}

module.exports = {
getAll, add, update
}