var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'programmers 과제 테스트 템플릿 - Node.js' });
});

module.exports = router;
