/* jshint indent: 2 */

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
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    appType: {
      field: 'app_type',
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    isUsed: {
      field: 'is_used',
      type: DataTypes.INTEGER(4),
      allowNull: false
    },
    gmtCreate: {
      field: 'gmt_create',
      type: DataTypes.DATE,
      allowNull: true
    },
    gmtUpdate: {
      field: 'gmt_update',
      type: DataTypes.DATE,
      allowNull: true
    },
    createrId: {
      field: 'creater_id',
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    tableName: 'cms_advertisement',
    timestamps: false,
    freezeTableName: true
  });
};
