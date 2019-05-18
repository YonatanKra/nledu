const {
	Goal
} = require('../db');

const getAll = () => {
	return Goal.findAll();
}

const add = goal => {
	return Goal.create(goal)
}

module.exports = {
	getAll,
	add
}