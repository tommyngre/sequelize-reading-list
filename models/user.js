module.exports = function(sequelize,Datatypes){
  let User = sequelize.define("User", {
    email: Datatypes.STRING,
    password: Datatypes.STRING
  });
  return User;
}