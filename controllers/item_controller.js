let express = require('express');
var path = require('path');

let db = require('../models/');

//router and export
var router = express.Router();

//ROUTES
//GET all rows from db
router.get("/:username?/:email?", function (req, res) {

  //don't show list unless username and password supplied
  if ((typeof req.query.username === 'undefined') || (typeof req.query.email === 'undefined')) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
    return;
  };


  db.Item.findAll().then(function (data) {

    let items = {
      item: data
    };

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

  console.log(req.body);

  db.Item.create({
    display_name: req.body.itemName,
    description: req.body.itemDescription,
    is_complete: false,
    UserId: req.body.UserId
  }).then(function (result) {
    res.json({ id: result.insertId });
  });
  // .catch(function(){};)
});

//POST login
router.post("/api/login", function (req, res) {

  console.log("req.body "+req.body);

  db.User.findOrCreate({
    where: {
      username: req.body.username,
      email: req.body.email
    }
  }).then(function (result) {
    return res.json({ 
      id: result[0].dataValues.id,
      username: result[0].dataValues.username,
      email: result[0].dataValues.email,
    });
  });
  // .catch(function(){};)
});

//PUT update row status
router.put("/api/list/:id", function (req, res) {
  let condition = "id = " + req.params.id;

  db.Item.update({
    is_complete: req.body.isComplete
  }, {
      where: {
        id: req.params.id
      }
    }).then(function (result) {
      if (result.changedRows == 0) {
        res.status(404).end();
      } else {
        return res.json(result);
      }
    });
});

//DELETE row
router.delete("/api/list/:id", function (req, res) {
  var condition = "id = " + req.params.id;

  db.Item.destroy({
    where: {
      id: req.params.id
    }
  }).then(function (result) {
    if (result.affectedRows == 0) {
      return res.status(404).end();
    } else {
      return res.json(result);
    }
  });
});

module.exports = router;