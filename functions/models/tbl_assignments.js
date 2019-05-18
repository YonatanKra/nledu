/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_assignments', {
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue:  DataTypes.UUIDV4,
			primaryKey: true
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		last_update_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		due_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: '4',
			references: {
				model: 'lov_statuses',
				key: 'id'
			}
		},
		assignee: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_persons',
				key: 'id'
			}
		},
		assigner: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_persons',
				key: 'id'
			}
		},
		grade: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		comment: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		end_date: {
			type: DataTypes.DATE,
			allowNull: true
		},
		progress: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: '0'
		}
	}, {
		tableName: 'tbl_assignments'
	});
};
