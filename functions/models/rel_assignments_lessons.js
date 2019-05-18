/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rel_assignments_lessons', {
		lesson_id: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'tbl_lessons',
				key: 'id'
			}
		},
		assignment_id: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_assignments',
				key: 'id'
			}
		},
		progress: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'rel_assignments_lessons'
	});
};
