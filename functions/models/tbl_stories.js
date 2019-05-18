/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_stories', {
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: 'uuid_in((md5((random())',
			primaryKey: true
		},
		name: {
			type: DataTypes.TEXT,
			allowNull: false
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
		sub_subject: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'lov_sub_subjects',
				key: 'id'
			}
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		tags: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'tbl_stories'
	});
};
