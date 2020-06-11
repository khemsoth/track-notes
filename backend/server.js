const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const Sequelize = require('sequelize');
const cors = require('cors');
const db = require('./models')
const dotenv = require('dotenv');

const PORT = 3000 || process.env.PORT;

dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(cors());


const sequelize = new Sequelize('track_notes', process.env.DB_USER, process.env.DB_PASS, {
  host: 'localhost',
  dialect: 'mysql'
});

db.sequelize.sync({force: true})

sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });





app.listen(PORT, () =>{
  console.log(`App listening on port ${PORT}`);
}
)