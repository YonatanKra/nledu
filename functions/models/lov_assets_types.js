/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lov_assets_types', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		image: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		icon: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'lov_assets_types'
	});
};
