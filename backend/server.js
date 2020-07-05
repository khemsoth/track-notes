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
const flash = require('connect-flash')

const PORT = 3000 || process.env.PORT;

const models = require('./models')

dotenv.config();

/*
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    console.log('looking for user')
    models.User.findOne({
      where: {
        username: username
        }
      }, function(err, user) {
      if(err) { return done(err) }
      if(!user) {
        return done(null, false, { message: 'Incorrect username' })
      }
      if(!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password' })
      }
      return done(null, user)
    })
  }
))
*/

app.use(express.static("public"));
app.use(cookieParser())
app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(express.json());
app.use(cors());

require('./Routes/apiRoutes')(app);


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







app.listen(PORT, () =>{
  console.log(`App listening on port ${PORT}`);
}
)