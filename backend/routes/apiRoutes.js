const express = require('express');
const app = express();
const axios = require('axios');
const models = require('../models');

module.exports = function(app) {
  //GET ROUTES
  app.get('/notes', (req, res) => {
    models.Note.findAll({})
      .then(function(notes) {
        res.send(notes);
      });
  });

  app.get('/users', (req, res) => {
    models.User.findAll({})
      .then(function(users) {
        res.send(users);
      });
  });

  app.get('/sims', (req, res) => {
    models.Sim.findAll({})
      .then(function(sims) {
        res.send(sims);
      });
  });
}