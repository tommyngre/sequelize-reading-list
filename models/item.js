module.exports = function (sequelize, Datatypes) {
  let Item = sequelize.define("Item", {
    display_name: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len:
          [1, 250]
      }
    },
    description: {
      type: Datatypes.STRING,
      allowNull: true,
    },
    is_complete: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });

  Item.associate = function(models) {
    // Items belong to Users
    // Items can't be created without a user
    /// because foreign key constraint
    Item.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  }

  return Item;
}