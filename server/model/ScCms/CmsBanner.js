/* jshint indent: 2 */
var dateTime = require('../../utils/dateTime');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CmsBanner', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    type: {
      field: 'type',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    articleId: {
      field: 'article_id',
      type: DataTypes.INTEGER(11),
      allowNull: true
    },
    url: {
      field: 'url',
      type: DataTypes.STRING,
      allowNull: true
    },
    coverPhotoUrl: {
      field: 'cover_photo_url',
      type: DataTypes.STRING,
      allowNull: true
    },
    title: {
      field: 'title',
      type: DataTypes.STRING,
      allowNull: false
    },
    terminal: {
      field: 'terminal',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    appType: {
      field: 'app_type',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    sequence: {
      field: 'sequence',
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    isUsed: {
      field: 'is_used',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    remark: {
      field: 'remark',
      type: DataTypes.STRING,
      allowNull: true
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
    }
  }, {
    tableName: 'cms_banner',
    timestamps: false,
    freezeTableName: true
  });
};
