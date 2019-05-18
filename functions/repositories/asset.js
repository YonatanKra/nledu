const {Asset}   = require('../db');

const getAll = ()=>{
	return Asset.findAll();
}

const add = asset=>{
	return Asset.create(asset);
}

module.exports = {
getAll, add
}