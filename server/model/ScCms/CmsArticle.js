/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('CmsArticle', {
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
    author: {
      field: 'author',
      type: DataTypes.STRING,
      allowNull: false
    },
    abstract: {
      field: 'abstract',
      type: DataTypes.TEXT,
      allowNull: true
    },
    content: {
      field: 'content',
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      field: 'url',
      type: DataTypes.STRING,
      allowNull: true
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
    },
    isDelete: {
      field: 'is_delete',
      type: DataTypes.INTEGER(4),
      allowNull: true
    }
  }, {
    tableName: 'cms_article',
    timestamps: false,
    freezeTableName: true
  });
};