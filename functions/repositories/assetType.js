const {AssetType}   = require('../db');

const getAll = ()=>{
	return AssetType.findAll();
}

module.exports = {
getAll
}