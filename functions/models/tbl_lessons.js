/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_lessons', {
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue:  DataTypes.UUIDV4,
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		last_modified: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '6',
			references: {
				model: 'lov_statuses',
				key: 'id'
			}
		},
		creator: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_persons',
				key: 'id'
			}
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'tbl_lessons'
	});
};
