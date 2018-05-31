//convert object to valid SQL
function newVals(colVals) {

  //console.log("colVals "+JSON.stringify(colVals));

  let arr = [];

  for (let key in colVals) {
    let value = colVals[key];

    if (Object.hasOwnProperty.call(colVals, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

//SQL helper function
function questionMarks(vals) {
  let valsAry = vals.map(x => "?").join(",");
  return valsAry;
}


let orm = {

  all: function (cb) {

    connection.query("select * from list", function (err, data) {
      if (err) throw err;
      cb(data);
    });
  },

  add: function (cols, vals, cb) {
    let valQuestionMarks = questionMarks(vals);

    let query = "insert into list ";
    query += "(" + cols + ") values ";
    query += "(" + valQuestionMarks + ");";

    connection.query(query, vals, function (err, data) {
      if (err) {
        throw err;
      }
      cb(data);
    });
  },

  update: function (colVals, condition, cb) {
    let query = "update list set ";
    query += newVals(colVals);
    query += " where " + condition;

    connection.query(query, function (err, data) {
      if (err) throw err;

      cb(data);
    });

  },

  delete: function (condition, cb) {
    let query = "delete from list";
    query += " where " + condition;

    connection.query(query, function (error, result) {
      if (error) {
        throw error;
      }
      cb(result);
    });
  }
};

module.exports = orm;