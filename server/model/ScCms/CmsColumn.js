/* jshint indent: 2 */
var dateTime = require('../../utils/dateTime');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CmsColumn', {
    id: {
      field: 'id',
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      field: 'name',
      type: DataTypes.STRING,
      allowNull: false
    },
    sequence: {
      field: 'sequence',
      type: DataTypes.INTEGER(4),
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
    isUsed: {
      field: 'is_used',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    isDefault: {
      field: 'is_default',
      type: DataTypes.INTEGER(4),
      allowNull: false
    }
  }, {
    tableName: 'cms_column',
    timestamps: false,
    freezeTableName: true
  });
};
