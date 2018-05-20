const express = require('express');
const router = express.Router();
const getTemperature = require('../modules/get');
const addTemperature = require('../modules/add');
const correctTemperature = require('../modules/correct');
const deleteTemperature = require('../modules/delete');

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
