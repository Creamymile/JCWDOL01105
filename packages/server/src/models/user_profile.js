'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User_Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User_Profile.belongsTo(models.User, {
        foreignKey: 'user_id',
      });
    }
  }
  User_Profile.init(
    {
      user_id: DataTypes.UUID,
      profile_picture: DataTypes.STRING,
      birthday: DataTypes.DATE,
      gender: {
        type: DataTypes.STRING, // Tipe data bisa disesuaikan dengan tipe data yang digunakan pada tabel di database Anda
        allowNull: true, // Atur sesuai kebutuhan
      },
      additional_information: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User_Profile',
    },
  );
  return User_Profile;
};
