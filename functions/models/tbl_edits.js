/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_edits', {
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue:  DataTypes.UUIDV4,
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
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		textHTML: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		passage: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '1',
			references: {
				model: 'lov_statuses',
				key: 'id'
			}
		},
	}, {
		tableName: 'tbl_edits'
	});
};
