const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;
const url = "mongodb://localhost:27017/temperatures";
const userScheme = new Schema({
    time: String,
    temperature: {
      type: Number,
      default: 36.6
    }
});
const Value = mongoose.model("Value", userScheme);

let temperatures;

const addTemperature = async temperature => {
  await mongoose.connect(url);
  let value = new Value({
      time: (new Date()).toLocaleString(),
      temperature
  });
  await value.save();
  mongoose.disconnect(); 
}

const getTemperature = async () => {
  await mongoose.connect(url);
  temperatures = await Value.find();
  mongoose.disconnect();
}

/* Вся температура за сутки. */
router.get('/', (req, res) => {
          getTemperature().then(() => res.render('index', { title: 'Все показатели за сегодня', temperatures } )).catch(err => {
              mongoose.disconnect(); 
              return res.render('error', { err })
          })
      }).post('/', (req, res) => {
          addTemperature(parseFloat(req.body.val)).then(() => res.redirect("/")).catch(err => {
              mongoose.disconnect(); 
              return res.render('error', { err })
          })
      })
      
      // .put('/', async (req, res) => {
      //   res.render('index', { title: 'Скорректировать показатель' });
      // })
      // .delete('/', async (req, res) => {
      //   res.render('index', { title: 'Удалить показатель' });
      // })

module.exports = router;
