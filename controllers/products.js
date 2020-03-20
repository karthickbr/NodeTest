const products = [];

exports.getAddProduct = (req, res, next) => {
    //res.sendFile(path.join(rootDir, 'views', 'add-product.html')); // for html files
    res.render('add-product',{ pageTitle: 'Add Product', path:'/admin/anyPath', formsCSS: true, productCSS: true, activeAddProduct: true});   // the path variable is used to set active in layout page // it is for handelbars files
    // res.render('add-product', { pageTitle: 'Add Product', path: '/admin/add-product', formsCSS: true, productCSS: true, activeAddProduct: true }); // it for pug
  }

  
exports.postAddProduct = (req, res, next) => {
    products.push({ title: req.body.title, price: req.body.price });
    res.redirect('/');
  }

exports.getProducts = (req, res, next) => {
    
    // res.render('shop', {prods: products, pageTitle: 'My-Shop', path:'/anyPath', hasPoducts: products.length > 0}); // for pug templete
    res.render('shop', {
      prods: products,
      pageTitle: 'My-Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  }


  