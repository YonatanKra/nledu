/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_classes', {
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: 'uuid_in((md5((random())',
			primaryKey: true
		},
		school: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		grade: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		city: {
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
		last_modified: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		}
	}, {
		tableName: 'tbl_classes'
	});
};
