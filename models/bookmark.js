module.exports = function(sequelize, DataTypes) {
  const Bookmark = sequelize.define("Bookmark", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 240]
      }
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      len: [1]
    }
  });

  Bookmark.associate = function(models) {
    // We're saying that a Bookmark should belong to an User
    // A Bookmark can't be created without an User due to the foreign key constraint
    Bookmark.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Bookmark;
};
