let express = require('express');

let db = require('../models/');

//router and export
var router = express.Router();

//ROUTES
//GET all rows from db
router.get("/", function (req, res) {

  db.Item.findAll().then(function (data) {

    let items = {
      item: data
    };

    // data.forEach(datum => {
    //   console.log(datum.dataValues);
    // })

   res.render("index", items);
  });

});

//GET all rows => renders as JSON
router.get("/api/list", function (req, res) {

  db.Item.findAll().then(function (data) {

    res.json(data);
  });

});

//POST new row
router.post("/api/new", function (req, res) {

  db.Item.add(
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

  db.Item.update({
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

  db.Item.delete(condition, function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;