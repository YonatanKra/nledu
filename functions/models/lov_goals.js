/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lov_goals', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'lov_goals'
	});
};
