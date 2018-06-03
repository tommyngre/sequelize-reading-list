module.exports = function(sequelize,Datatypes){
  let User = sequelize.define("User", {
    username: Datatypes.STRING,
    email: Datatypes.STRING,
  });
  return User;
}