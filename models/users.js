'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'user' // Users by default, could be 'admin' for admins
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  User.associate = function(models) {
    // A user can create multiple templates
    User.hasMany(models.Template, { foreignKey: 'authorId', as: 'templates' });

    // A user can create multiple forms (responses)
    User.hasMany(models.Form, { foreignKey: 'userId', as: 'forms' });
  };

  return User;
};
