'use strict';
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    templateId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Templates',
        key: 'id'
      }
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    // Single-line string answers (up to 4)
    custom_string1_answer: DataTypes.STRING,
    custom_string2_answer: DataTypes.STRING,
    custom_string3_answer: DataTypes.STRING,
    custom_string4_answer: DataTypes.STRING,

    // Multi-line text answers (up to 4)
    custom_text1_answer: DataTypes.TEXT,
    custom_text2_answer: DataTypes.TEXT,
    custom_text3_answer: DataTypes.TEXT,
    custom_text4_answer: DataTypes.TEXT,

    // Integer answers (up to 4)
    custom_int1_answer: DataTypes.INTEGER,
    custom_int2_answer: DataTypes.INTEGER,
    custom_int3_answer: DataTypes.INTEGER,
    custom_int4_answer: DataTypes.INTEGER,

    // Checkbox answers (up to 4)
    custom_checkbox1_answer: DataTypes.BOOLEAN,
    custom_checkbox2_answer: DataTypes.BOOLEAN,
    custom_checkbox3_answer: DataTypes.BOOLEAN,
    custom_checkbox4_answer: DataTypes.BOOLEAN,

    // Timestamps
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  Form.associate = function(models) {
    // A form belongs to a template
    Form.belongsTo(models.Template, { foreignKey: 'templateId', as: 'template' });

    // A form is created by a user
    Form.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return Form;
};
