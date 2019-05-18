/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lov_subjects', {
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
			allowNull: true
		}
	}, {
		tableName: 'lov_subjects'
	});
};
