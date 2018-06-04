module.exports = function(sequelize,Datatypes){
  let User = sequelize.define("User", {
    username: Datatypes.STRING,
    email: Datatypes.STRING,
  });

  User.associate = function(models) {
    // Associate User w Item
    // When an User is deleted (not implemented),
    /// delete associated Items

    User.hasMany(models.Item, {
      onDelete: "cascade"
    });
  };

  return User;
}