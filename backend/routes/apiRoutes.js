const express = require('express')
const app = express()
const axios = require('axios')
const models = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10

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

  //POST ROUTES
  app.post('/users', (req, res) => {
    models.User.create({
      username: req.body.username,
      password: req.body.password
    }).then(function(user) {
      res.send(`New user created: ${user}`)
    });
  });

  app.post('/sims', function(req, res) {
    models.Sim.create({
      name: req.body.name,
    }).then(function(sim) {
      res.send(`Created new sim: ${sim}`);
    });
  });

  app.post('/notes', function(req, res) {
    models.Note.create({
      sim: req.body.sim,
      car: req.body.car,
      track: req.body.track,
      setupName: req.body.setup,
      date: new Date().toLocaleString(),
      goals: req.body.goals,
      time: req.body.time,
      session: req.body.session,
      notes: req.body.notes
    }).then(function(note) {
      res.send(`Created new note: ${note}`);
    });
  });
}