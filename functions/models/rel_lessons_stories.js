/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('rel_lessons_stories', {
		lesson_id: {
			type: DataTypes.TEXT,
			allowNull: false,
			primaryKey: true,
			references: {
				model: 'tbl_lessons',
				key: 'id'
			}
		},
		story_id: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_stories',
				key: 'id'
			}
		},
		order: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '0'
		}
	}, {
		tableName: 'rel_lessons_stories'
	});
};
