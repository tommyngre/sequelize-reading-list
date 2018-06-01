module.exports = function(sequelize,Datatypes){
  let User = sequelize.define("User", {
    id: {
      type: Datatypes.INTEGER,
      primaryKey: true
    },
    email: Datatypes.STRING,
    password: Datatypes.STRING
  });
  return User;
}