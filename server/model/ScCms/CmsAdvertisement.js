/* jshint indent: 2 */
var dateTime = require('../../utils/dateTime');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CmsAdvertisement', {
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
      type: DataTypes.STRING,
      allowNull: false
    },
    url: {
      field: 'url',
      type: DataTypes.STRING,
      allowNull: true
    },
    content: {
      field: 'content',
      type: DataTypes.TEXT,
      allowNull: true
    },
    terminal: {
      field: 'terminal',
      type: DataTypes.STRING,
      allowNull: true
    },
    appType: {
      field: 'app_type',
      type: DataTypes.STRING,
      allowNull: true
    },
    isUsed: {
      field: 'is_used',
      type: DataTypes.STRING,
      allowNull: false
    },
    gmtCreate: {
      field: 'gmt_create',
      type: DataTypes.DATE,
      allowNull: true,
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
    isOutUrl: {
      field: 'is_out_url',
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: '1'
    }
  }, {
    tableName: 'cms_advertisement',
    timestamps: false,
    freezeTableName: true
  });
};
