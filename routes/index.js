const express = require('express');
const mongoose = require('mongoose');

// const getTemperature = require('./modules/getTemperature');
// const addTemperature = require('./modules/addTemperature');
// const correctTemperature = require('./modules/correctTemperature');
// const deleteTemperature = require('./modules/deleteTemperature');

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

const getTemperature = async () => {
  await mongoose.connect(url);
  temperatures = await Value.find();
  mongoose.disconnect();
}

const addTemperature = async temperature => {
  await mongoose.connect(url);
  let value = new Value({
      time: (new Date()).toLocaleString(),
      temperature
  });
  await value.save();
  mongoose.disconnect(); 
}

const correctTemperature = async (id, temperature) => {
    await mongoose.connect(url);
    await Value.findByIdAndUpdate(id, {temperature})
    mongoose.disconnect();
}

const deleteTemperature = async (id) => {
    await mongoose.connect(url);
    await Value.findByIdAndRemove(id)
    mongoose.disconnect();
}

/* Вся температура за сутки. */
router.get('/', (req, res) => {
          getTemperature()
          .then(() => res.render('index', { title: 'Все показатели за сегодня', temperatures } ))
          .catch(err => {
              mongoose.disconnect(); 
              return res.render('error', { err })
          })
      }).post('/', (req, res) => {
          addTemperature(parseFloat(req.body.val))
          .then(() => res.redirect("/"))
          .catch(err => {
              mongoose.disconnect(); 
              return res.render('error', { err })
          })
      }).put('/:id/:val', (req, res) => {
         correctTemperature(req.params.id, parseFloat(req.params.val))
          .then(() => res.redirect("/"))
          .catch(err => {
              mongoose.disconnect(); 
              return res.render('error', { err })
          })
      }).delete('/:id', (req, res) => {
          deleteTemperature(req.params.id)
          .then(() => res.redirect("/"))
          .catch(err => {
              mongoose.disconnect(); 
              return res.render('error', { err })
          })
      })


module.exports = router;
