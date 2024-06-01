const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

dotenv.config()

// router
const mainRouter = require('./src/router/mainRouter')
const authRouter = require('./src/router/authRouter')
const dashRouter = require('./src/router/dashboardRouter')

const app = express();
const PORT = process.env.PORT || 4000;

app.use(session({secret: 'my_session_secret', resave: true, saveUninitialized: true}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride("_method"));

app.use(express.static('public'));

app.use(expressLayouts);

app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// use routes
app.use('/', mainRouter)
app.use('/', authRouter)
app.use('/', dashRouter)


const start = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URL)
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
}

start()

