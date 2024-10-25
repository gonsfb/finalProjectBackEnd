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
        allowNull: false,
        references: {
          model: 'Users',  // Ensure that 'Users' table exists before this migration
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      // Custom fields (up to 4 single-line strings)
      custom_string1_state: Sequelize.BOOLEAN,
      custom_string1_question: Sequelize.STRING,
      custom_string2_state: Sequelize.BOOLEAN,
      custom_string2_question: Sequelize.STRING,
      custom_string3_state: Sequelize.BOOLEAN,
      custom_string3_question: Sequelize.STRING,
      custom_string4_state: Sequelize.BOOLEAN,
      custom_string4_question: Sequelize.STRING,
      // Custom fields (up to 4 multi-line texts)
      custom_text1_state: Sequelize.BOOLEAN,
      custom_text1_question: Sequelize.STRING,
      custom_text2_state: Sequelize.BOOLEAN,
      custom_text2_question: Sequelize.STRING,
      custom_text3_state: Sequelize.BOOLEAN,
      custom_text3_question: Sequelize.STRING,
      custom_text4_state: Sequelize.BOOLEAN,
      custom_text4_question: Sequelize.STRING,
      // Custom fields (up to 4 positive integers)
      custom_int1_state: Sequelize.BOOLEAN,
      custom_int1_question: Sequelize.STRING,
      custom_int2_state: Sequelize.BOOLEAN,
      custom_int2_question: Sequelize.STRING,
      custom_int3_state: Sequelize.BOOLEAN,
      custom_int3_question: Sequelize.STRING,
      custom_int4_state: Sequelize.BOOLEAN,
      custom_int4_question: Sequelize.STRING,
      // Custom fields (up to 4 checkboxes)
      custom_checkbox1_state: Sequelize.BOOLEAN,
      custom_checkbox1_question: Sequelize.STRING,
      custom_checkbox2_state: Sequelize.BOOLEAN,
      custom_checkbox2_question: Sequelize.STRING,
      custom_checkbox3_state: Sequelize.BOOLEAN,
      custom_checkbox3_question: Sequelize.STRING,
      custom_checkbox4_state: Sequelize.BOOLEAN,
      custom_checkbox4_question: Sequelize.STRING,
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

