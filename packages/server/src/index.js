require('dotenv/config');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { join } = require('path');
const session = require('express-session');
const passport = require('passport');
const router = require('./routes');
const path = require('path');

const PORT = process.env.CUSTOM_PORT;
const app = express();
dotenv.config();

app.use(
  session({
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(passport.initialize());
app.use(passport.session());

app.use(cors());

app.use(
  '/src/public/profile',
  express.static(path.join('./src/public/profile')),
);

app.use(express.json());
app.use('/api', router);

app.get('/api', (req, res) => {
  res.send(`Hello, this is my API`);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});
