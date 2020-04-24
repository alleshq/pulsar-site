const {DataTypes} = require("sequelize");

module.exports = db => {
	db.Client = db.define(
		"client",
		{
			id: {
				primaryKey: true,
				type: DataTypes.UUID,
				allowNull: false
			},
			secret: {
				type: DataTypes.STRING,
				allowNull: false
			},
			userId: {
				type: DataTypes.UUID,
				allowNull: false
			},
			name: {
				type: DataTypes.STRING,
				allowNull: false
			}
		},
		{
			paranoid: true,
			updatedAt: false
		}
	);
};
