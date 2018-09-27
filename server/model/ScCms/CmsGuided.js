/* jshint indent: 2 */
var dateTime = require('../../utils/dateTime');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CmsGuided', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    location: {
      field: 'location',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    title: {
      field: 'title',
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      field: 'image_url',
      type: DataTypes.TEXT,
      allowNull: false
    },
    appType: {
      field: 'app_type',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    isUsed: {
      field: 'is_used',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    gmtCreate: {
      field: 'gmt_create',
      type: DataTypes.DATE,
      allowNull: false,
      get() {
        if (this.getDataValue('gmtCreate')) {
          return dateTime.dateTimeToString(this.getDataValue('gmtCreate'));
        } else {
          return null;
        }
      }
    },
    gmtUpdate: {
      field: 'gmt_update',
      type: DataTypes.DATE,
      allowNull: true,
      get() {
        if (this.getDataValue('gmtUpdate')) {
          return dateTime.dateTimeToString(this.getDataValue('gmtUpdate'));
        } else {
          return null;
        }
      }
    },
    createrId: {
      field: 'creater_id',
      type: DataTypes.STRING,
      allowNull: true
    },
    isDelete: {
      field: 'is_delete',
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'cms_guided',
    timestamps: false,
    freezeTableName: true
  });
};
