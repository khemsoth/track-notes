const express = require('express')
const app = express()
const router = express.Router()
const axios = require('axios')
const models = require('../models')
const bcrypt = require('bcrypt')
const saltRounds = 10
const passport = require('passport')

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
  app.post('/api/users', async (req, res) => {
    const hashedPass = await bcrypt.hash(req.body.password, 12)
    models.User.create({
      username: req.body.username,
      password: hashedPass,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    }).then(function() {
      console.log('User created')
    });
  });

  app.post('/api/sims', function(req, res) {
    models.Sim.create({
      name: req.body.name,
    }).then(function(sim) {
      res.send(`Created new sim: ${sim}`);
    });
  });

  app.post('/api/notes', function(req, res) {
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
/*
  app.post('/api/login',
    passport.authenticate('local', 
      (err, user, res, info) => {
        if(err) {
          return next(err)
        }
        if(!user) {
          return console.log('no user')
        }
        req.login(user, err => {
          res.send('Logged in')
        })
      })
  )
  //app.post('/api/login', passport.authenticate('local', {
    /*successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true*/
    
  //}))

// DELETE ROUTES
  app.delete('/delete/note/:id', function(req, res) {
    models.Note.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(id) {
      res.send(`Deleted note with id of ${id}`)
    })
    })
}