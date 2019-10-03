const express = require("express");
const router = express.Router();
const models = require("../models");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/:year/:month", function(req, res, next) {
  let year = req.params.year;
  let month = req.params.month;
  let startDate = new Date(year, month - 1, -7);
  let lastDate = new Date(year, month, +7);

  models.Schedule.findAll({
    where: {
      [Op.or]: [
        { startAt: { [Op.between]: [startDate, lastDate] } },
        { endAt: { [Op.between]: [startDate, lastDate] } }
      ]
    }
  })
    .then(result => {
      res.json({ schedules: result, success: true });
    })
    .catch(function(err) {
      console.log(err);
      res.json({ error: "db error: " + err, success: false });
    });
});

router.post("/write", function(req, res, next) {
  models.Schedule.create({
    title: req.body.title,
    discription: req.body.discription,
    createdAt: new Date(),
    startAt: req.body.startAt,
    endAt: req.body.endAt,
    repeated: req.body.repeated
  })
    .then(result => {
      console.log("success");
      res.json({ success: true });
    })
    .catch(err => {
      console.log("fail, create schedule");
      res.json({ error: "db error: " + err, success: false });
    });
});

module.exports = router;
