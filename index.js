const express         = require('express');
const morgan          = require('morgan');
const expressLayouts  = require('express-ejs-layouts');
const bodyParser      = require('body-parser');
const mongoose        = require('mongoose');
mongoose.Promise      = require('bluebird');
const methodOverride  = require('method-override');
const session = require('express-session');
const User = require('./models/user');
const flash = require('express-flash');
const env             = require('./config/env');
const router          = require('./config/routes');
const app             = express();



mongoose.connect(env.db);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);

app.use(morgan('dev'));
app.use(expressLayouts);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

//secret will be used to decrypt user's id
app.use(session({
  secret: process.env.SESSION_SECRET || 'Dude!! it\'s a secret',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());

app.use((req, res, next) => {
  if (!req.session.userId) return next();
  //find user based on userid stored in session cookie
  User
    .findById(req.session.userId)
    .then((user) => {

      //logout user and redirect to '/' if user logged in but account deleted/suspended whilst //being logged in

      //regenerate the session cookie and log out user
      if(!user){
        return req.session.regenerate(() => {
          req.flash('danger', 'You need to be logged in for that!!');
          res.redirect('/');
        });
      }
      //re-assign session id
      req.session.userId = user._id;
      //setting user to res.locals
      res.locals.user = user;
      res.locals.isLoggedIn = true;
      next();
    });
});

app.use(router);

app.listen(env.port, () => console.log(`Server is a go on port: ${env.port}.`));
