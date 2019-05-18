/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rel_lessons_goals', {
		lesson_id: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'tbl_lessons',
				key: 'id'
			}
		},
		goal_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'lov_goals',
				key: 'id'
			}
		}
	}, {
		tableName: 'rel_lessons_goals'
	});
};
