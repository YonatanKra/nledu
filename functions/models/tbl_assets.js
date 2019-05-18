/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_assets', {
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
		uploader: {
			type: DataTypes.TEXT,
			allowNull: false,
			references: {
				model: 'tbl_persons',
				key: 'id'
			}
		},
		created: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		tags: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		path: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		type: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'lov_assets_types',
				key: 'id'
			}
		}
	}, {
		tableName: 'tbl_assets'
	});
};
