/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('tbl_persons', {
		id: {
			type: DataTypes.TEXT,
			allowNull: false,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		first_name: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		surname: {
			type: DataTypes.TEXT,
			allowNull: false
		},
		birth_date: {
			type: DataTypes.DATE,
			allowNull: false
		},
		created_date: {
			type: DataTypes.DATE,
			allowNull: false,
			defaultValue: sequelize.fn('now')
		},
		last_modified: {
			type: DataTypes.DATE,
			allowNull: true,
			defaultValue: sequelize.fn('now')
		},
		role: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: 'lov_roles',
				key: 'id'
			}
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
		email: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		phone: {
			type: DataTypes.TEXT,
			allowNull: true
		},
		class: {
			type: DataTypes.TEXT,
			allowNull: true,
			references: {
				model: 'tbl_classes',
				key: 'id'
			}
		},
		profile_img: {
			type: DataTypes.TEXT,
			allowNull: true
		}
	}, {
		tableName: 'tbl_persons'
	});
};
