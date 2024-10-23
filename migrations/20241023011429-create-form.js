'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Forms', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      templateId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Templates', // Foreign key to the Templates table
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users', // Foreign key to the Users table
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      custom_string1_answer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      custom_string2_answer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      custom_string3_answer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      custom_string4_answer: {
        type: Sequelize.STRING,
        allowNull: true
      },
      custom_text1_answer: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      custom_text2_answer: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      custom_text3_answer: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      custom_text4_answer: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      custom_int1_answer: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      custom_int2_answer: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      custom_int3_answer: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      custom_int4_answer: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      custom_checkbox1_answer: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      custom_checkbox2_answer: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      custom_checkbox3_answer: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
      custom_checkbox4_answer: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
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
    await queryInterface.dropTable('Forms');
  }
};

