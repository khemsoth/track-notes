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
const bcrypt = require('bcrypt')
const methodOverride = require('method-override')

const PORT = 3000 || process.env.PORT;

const models = require('./models')

dotenv.config()

const initializePassport = require('./config/passport')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const hashedPass = bcrypt.hashSync('keith', 10)

const users = [
  {
    email: 'k@k.com',
    password: hashedPass,
    id: 3
  }
]

console.log(users)

//app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(flash())
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))
app.use(cors())

app.post('/api/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: 'http://localhost:8080/',
  failureRedirect: 'http://localhost:8080/register'
}))

function checkNotAuthenticated(req, res, next) {
  if(req.isAuthenticated()) {
    return this.$router.push(home)
  }
  next()
}


/*
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
/*
app.use(express.static("public"));
//app.use(cookieParser())
app.use(bodyParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }))
app.use(express.json());
app.use(cors());
*/
require('./routes/apiRoutes')(app);
/*
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    })
  })*/
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

  


/*
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
*/
require('./Routes/apiRoutes')(app);


app.listen(PORT, () =>{
  console.log(`App listening on port ${PORT}`);
}
)