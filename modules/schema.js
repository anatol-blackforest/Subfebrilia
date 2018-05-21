const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userScheme = new Schema({
    time: String,
    temperature: {
      type: Number,
      default: 36.6
    }
});

exports.Value = mongoose.model("Value", userScheme);
