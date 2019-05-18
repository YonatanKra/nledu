/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_edits', {
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: 'uuid_in((md5((random())',
			primaryKey: true
		},
		person: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_persons',
				key: 'id'
			}
		},
		story: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_stories',
				key: 'id'
			}
		},
		modified: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('now')
		},
		notes: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'tbl_edits'
	});
};
