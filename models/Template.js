'use strict';
module.exports = (sequelize, DataTypes) => {
  const Template = sequelize.define('Template', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    authorId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    // Custom fields (up to 4 single-line strings)
    custom_string1_state: DataTypes.BOOLEAN,
    custom_string1_question: DataTypes.STRING,
    custom_string2_state: DataTypes.BOOLEAN,
    custom_string2_question: DataTypes.STRING,
    custom_string3_state: DataTypes.BOOLEAN,
    custom_string3_question: DataTypes.STRING,
    custom_string4_state: DataTypes.BOOLEAN,
    custom_string4_question: DataTypes.STRING,
    // Custom fields (up to 4 multi-line texts)
    custom_text1_state: DataTypes.BOOLEAN,
    custom_text1_question: DataTypes.STRING,
    custom_text2_state: DataTypes.BOOLEAN,
    custom_text2_question: DataTypes.STRING,
    custom_text3_state: DataTypes.BOOLEAN,
    custom_text3_question: DataTypes.STRING,
    custom_text4_state: DataTypes.BOOLEAN,
    custom_text4_question: DataTypes.STRING,
    // Custom fields (up to 4 positive integers)
    custom_int1_state: DataTypes.BOOLEAN,
    custom_int1_question: DataTypes.STRING,
    custom_int2_state: DataTypes.BOOLEAN,
    custom_int2_question: DataTypes.STRING,
    custom_int3_state: DataTypes.BOOLEAN,
    custom_int3_question: DataTypes.STRING,
    custom_int4_state: DataTypes.BOOLEAN,
    custom_int4_question: DataTypes.STRING,
    // Custom fields (up to 4 checkboxes)
    custom_checkbox1_state: DataTypes.BOOLEAN,
    custom_checkbox1_question: DataTypes.STRING,
    custom_checkbox2_state: DataTypes.BOOLEAN,
    custom_checkbox2_question: DataTypes.STRING,
    custom_checkbox3_state: DataTypes.BOOLEAN,
    custom_checkbox3_question: DataTypes.STRING,
    custom_checkbox4_state: DataTypes.BOOLEAN,
    custom_checkbox4_question: DataTypes.STRING,
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  });

  Template.associate = function(models) {
    // A template is created by a user
    Template.belongsTo(models.User, { foreignKey: 'authorId', as: 'author' });

    // A template can have many responses (forms)
    Template.hasMany(models.Form, { foreignKey: 'templateId', as: 'responses' });
  };

  return Template;
};
