const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

// db.execute('SELECT * FROM products')
//   .then(result => {
//     console.log(result[0], result[1]);
//   })
//   .catch(err => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// relationships of models defined here
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);

// synchronizing the db
sequelize.sync()
// sequelize.sync({force: true})    // dont use force in production.. it will delete table. it user to create relationships by force
.then(result => { 
    // console.log(result);
    app.listen(4000);
}).catch(err => {
    console.log(err);
})


