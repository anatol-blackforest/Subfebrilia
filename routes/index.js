const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Schema = mongoose.Schema;

const userScheme = new Schema({
    time: String,
    temperature: {
      type: Number,
      default: 36.6
    }
});

let temperatures

const Value = mongoose.model("Value", userScheme);

const addTemperature = async temperature => {
  console.log(temperature)
  mongoose.connect("mongodb://localhost:27017/temperatures");
  let value = new Value({
      time: new Date(),
      temperature
  });
  await value.save();
  return mongoose.disconnect(); 
}

const getTemperature = async () => {
  mongoose.connect("mongodb://localhost:27017/usersdb");
  temperatures = await Value.find();
  console.log(temperatures)
  return mongoose.disconnect();
}

/* Вся температура за сутки. */
router.get('/',  (req, res) => {
          getTemperature().then(res.render('index', { title: 'Все показатели за сегодня', temperatures } )).catch(error => {
              mongoose.disconnect(); 
              return res.render('error', { err })
          })
      }).post('/:val', (req, res) => {
          addTemperature(parseFloat(req.params.val)).then(() => res.render('index', { title: 'Все показатели за сегодня', temperatures })).catch(error => {
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
