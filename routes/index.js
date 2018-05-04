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

let temperatures, isProcessing = false;

const getTemperature = async res => {
    try {
        if(!isProcessing){
            isProcessing = true
            await mongoose.connect(url);
            temperatures = await Value.find();
            await mongoose.disconnect();
            isProcessing = false
            res.render('index', { title: 'Все показатели за сегодня', temperatures } )
        }else{
            res.render('index', { title: 'Все показатели за сегодня', temperatures } )
        }
    } catch (err) {
        console.log(err)
        res.render('error', { err })
    }
}

const addTemperature = async (res, temperature) => {
    try {
        if(!isProcessing){
            isProcessing = true
            await mongoose.connect(url);
            let value = new Value({
                time: (new Date()).toLocaleString(),
                temperature
            });
            await value.save();
            await mongoose.disconnect(); 
            isProcessing = false
            res.redirect("/")
        }else{
            res.redirect("/")
        }
    } catch (err) {
        console.log(err)
        res.render('error', { err })
    }
}

const correctTemperature = async (res, id, temperature) => {
    try {
        if(!isProcessing){
            isProcessing = true
            await mongoose.connect(url);
            await Value.findByIdAndUpdate(id, {temperature})
            await mongoose.disconnect();
            isProcessing = false
            res.redirect("/")
        }else{
            res.redirect("/")
        }
    } catch (err) {
        console.log(err)
        res.render('error', { err })
    }
}

const deleteTemperature = async (res, id) => {
    try {
        if(!isProcessing){
            isProcessing = true
            await mongoose.connect(url);
            await Value.findByIdAndRemove(id)
            await mongoose.disconnect();
            isProcessing = false
            res.redirect("/")
        }else{
            res.redirect("/")
        }
    } catch (err) {
        console.log(err)
        res.render('error', { err })    
    }
}

/* Вся температура за сутки. */
router.get('/', (req, res) => {
          getTemperature(res)
      }).post('/', (req, res) => {
          addTemperature(res, parseFloat(req.body.val))
      }).put('/:id/:val', (req, res) => {
         correctTemperature(res, req.params.id, parseFloat(req.params.val))
      }).delete('/:id', (req, res) => {
          deleteTemperature(res, req.params.id)
      })

module.exports = router;
