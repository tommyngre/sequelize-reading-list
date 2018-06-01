module.exports = function(sequelize,Datatypes){
  let Item = sequelize.define("Item", {
    id: {
      type: Datatypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    display_name: {
      type: Datatypes.STRING,
      allowNull: false,
      validate: {
        len:
          [1, 250]
      }
    },
    url: {
      type: Datatypes.STRING,
      allowNull: true,
      validate: {
        len:
          [1, 250]
      }
    },
    is_complete: {
      type: Datatypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  });
  return Item;
}