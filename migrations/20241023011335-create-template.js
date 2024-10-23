'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Templates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false
      },
      authorId: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      // Custom fields (up to 4 single-line strings)
      custom_string1_state: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      custom_string1_question: {
        type: Sequelize.STRING,
        allowNull: true
      },
      custom_string2_state: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      custom_string2_question: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // (Add the other custom fields like multi-line texts, integers, checkboxes...)
      // Custom fields (up to 4 checkboxes)
      custom_checkbox1_state: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      custom_checkbox1_question: {
        type: Sequelize.STRING,
        allowNull: true
      },
      // Timestamps
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Templates');
  }
};
