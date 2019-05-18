/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('lov_sub_subjects', {
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
		subject_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'lov_subjects',
				key: 'id'
			}
		}
	}, {
		tableName: 'lov_sub_subjects'
	});
};
