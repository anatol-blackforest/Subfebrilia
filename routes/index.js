var express = require('express');
var router = express.Router();

/* Вся температура за сутки. */
router.get('/', function(req, res, next) {
        res.render('index', { title: 'Все показатели за сегодня' });
      })
      .post('/', function(req, res, next) {
        res.render('index', { title: 'Ввести показатель' });
      })
      .put('/', function(req, res, next) {
        res.render('index', { title: 'Скорректировать показатель' });
      })
      .delete('/', function(req, res, next) {
        res.render('index', { title: 'Удалить показатель' });
      })

module.exports = router;
