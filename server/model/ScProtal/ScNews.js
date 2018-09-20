/* jshint indent: 2 */
var dateTime = require('../../utils/dateTime');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ScNews', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      field: 'title',
      type: DataTypes.STRING,
      allowNull: false
    },
    cover: {
      field: 'cover',
      type: DataTypes.STRING,
      allowNull: false
    },
    createTime: {
      field: 'create_time',
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        return dateTime.dateTimeToString(this.getDataValue('createTime'));
      }
    },
    modifyTime: {
      field: 'modify_time',
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        if (this.getDataValue('modifyTime')) {
          return dateTime.dateTimeToString(this.getDataValue('modifyTime'));
        } else {
          return null;
        }
      }
    },
    content: {
      field: 'content',
      type: DataTypes.STRING,
      allowNull: true
    },
    remark: {
      field: 'remark',
      type: DataTypes.STRING,
      allowNull: true
    },
    display: {
      field: 'display',
      type: DataTypes.STRING,
      allowNull: true
    },
    index: {
      field: 'index',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'sc_news',
    timestamps: false,
    freezeTableName: true
  });
};
