let express = require('express');

let item = require('../models/item.js');

//router and export
var router = express.Router();

//ROUTES
//GET all rows from db
router.get("/", function (req, res) {

  item.all(function (data) {

    data.forEach(row => {
      let n = row.item_name;
      let isURL = 'nope';

      //HANDLING        
      //check if a url
      if (n.substring(0, 3) == "htt" || n.substring(0, 3) == "www") {
        row['URL'] = true;
      } else {
        row['URL'] = false;
      }
      //check length
      if (n.length > 20) {
        row['displayName'] = n.substring(0, 17) + '...';
      } else {
        row['displayName'] = n;
      }
    });

    let obj = {
      items: data
    };

    res.render("index", obj);
  });

});

//GET all rows => renders as JSON
router.get("/api/list", function (req, res) {

  item.all(function (data) {
    let obj = {
      items: data
    };

    res.json(obj);
  });

});

//POST new row
router.post("/api/new", function (req, res) {

  item.add(
    [
      "item_name",
      "is_complete"
    ], [
      req.body.itemName,
      Boolean(req.body.isComplete)
    ],
    function (result) {
      res.json({ id: result.insertId });
    });
});

//PUT update row status
router.put("/api/list/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  item.update({
    is_complete: req.body.isComplete
  }, condition, function (result) {
    if (result.changedRows == 0) {
      res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

//DELETE row
router.delete("/api/list/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  item.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;