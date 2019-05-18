const {Story}   = require('../db');

const getAll = ()=>{
	return Story.findAll();
}

module.exports = {
getAll
}