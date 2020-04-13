const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session'); // maintain session
const mongoDBStore = require('connect-mongodb-session')(session); // to store the session in mongodb
const csrf = require('csurf'); // routing auth security
const flash = require('connect-flash');

const errorController = require('./controllers/error');
const User = require('./models/user');
const MONGODB_URI = 'mongodb+srv://NodeFull:node@cluster0-dbrlk.mongodb.net/shop?retryWrites=true&w=majority';
// const MONGODB_URI = 'mongodb://localhost:27017/shop'
const app = express();

const store = new mongoDBStore({
  uri: MONGODB_URI,
  collection: 'sessions',
  // expires: 600000
})

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'my secret', 
  resave: false, 
  saveUninitialized: false, 
  store: store, 
  // cookie:{expires:60000, maxAge: 30000}
}));

app.use(csrfProtection);
app.use(flash());

app.use((req, res, next) => {

  if(!req.session.user) {
       return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(result => {
    app.listen(4000);
    console.log('Server Started...');
  })
  .catch(err => {
    console.log(err);
 });
