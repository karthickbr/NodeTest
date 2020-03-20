const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const expressHbs = require('express-handlebars');
const app = express();
const errorController = require('./controllers/errors');

// for handlebars

// app.engine(
//     'hbs', // all file extensions of handlebars
//     expressHbs({
//       layoutsDir: 'views/layouts/',
//       defaultLayout: 'main-layout',
//       extname: 'hbs' // only for layout files extension
//     })
//   );
// app.engine('hbs', expressHbs()); // any name (hbs)
// app.set('view engine', 'hbs'); // should be same name in previous one and it is used for file extension


// for pug

// app.set('view engine', 'pug');     // set is used to store the value or saying the express to use this value


// for ejs
app.set('view engine', 'ejs');



               // folder name
app.set('views', 'views');
// app.get() used to get the value


const adminRouts = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouts);
app.use(shopRoutes);

app.use(errorController.get404);

app.listen(4000);

