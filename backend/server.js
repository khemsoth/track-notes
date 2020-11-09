const express = require('express');
const app = express();
const session = require('express-session')
const bodyParser = require('body-parser');
const axios = require('axios');
const Sequelize = require('sequelize');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const db = require('./models');
const dotenv = require('dotenv');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const flash = require('express-flash')

const PORT = 3000 || process.env.PORT;

const models = require('./models')

dotenv.config();

passport.use(new LocalStrategy(
  function(username, password, done) {
    models.User.findOne({ username: username })
    .then(user => {
      if(!user) {
        return done(null, false, { message: 'That user does not exist' })
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if(err) throw (err)
        if(isMatch) {
          return done(null, user)
        } else {
          return done(null, false, { message: 'Password incorrect' })
        }
      })
    })
  }
))
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })
const sequelize = new Sequelize('track_notes', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

  db.sequelize.sync({force: false})

  

//app.use(express.static("public"));
app.use(cookieParser())
//app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))
app.use(passport.initialize())
app.use(passport.session())
//app.use(express.json());
app.use(cors())
app.use(flash())

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

require('./Routes/apiRoutes')(app);


app.listen(PORT, () =>{
  console.log(`App listening on port ${PORT}`);
}
)