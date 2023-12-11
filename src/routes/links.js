const express = require('express');
const router = express.Router();

const pool = require('../database');

const { isLoggedIn } = require('../lib/auth'); // protejo las rutas hasta que defina rol de usuarios
/*
router.get('/admin',(req,res)=> {
    res.redirect('product');
});
*/

router.get('/add', isLoggedIn ,(req,res)=> {
    res.render('links/add');
});


router.post('/add', async (req,res)=> {
    const { sku, product_name, product_description, price, stock, licence_id, category_id } = req.body;
    const NewProduct = {
        sku, 
        product_name, 
        product_description, 
        price, 
        stock,
        licence_id,
        category_id
    };
    
    product = await pool.query('INSERT INTO PRODUCT SET ?', NewProduct);
    console.log(NewProduct);
    res.redirect('/links/product');
});


router.get('/product', async(req,res)=>{
    const product = await pool.query('SELECT * FROM PRODUCT');
    res.render('links/product',{data:product});
    
})

// sentencia para el delete
router.get('/delete/:id', isLoggedIn,  async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM PRODUCT WHERE PRODUCT_ID = ?', [id]);
   /* req.flash('success', 'Producto eliminado correctamente');*/
    res.redirect('/links/product');
});


// sentencia para editar
router.get('/edit/:id', isLoggedIn,  async (req, res) => {
    const { id } = req.params;
    const Product = await pool.query('SELECT * FROM PRODUCT WHERE PRODUCT_ID = ?', [id]);
    console.log(Product);
    res.render('links/edit', {data:Product});
});


router.post('/edit/:id', async (req, res) => {
    const { id } = req.params;
    const { sku, product_name, product_description, price, stock, licence_id, category_id } = req.body;
    const ProductView = {
        sku, 
        product_name, 
        product_description, 
        price, 
        stock,
        licence_id,
        category_id
    };
    await pool.query('UPDATE PRODUCT SET ? WHERE PRODUCT_ID = ?', [ProductView, id]);
    console.log(ProductView);
   /*req.flash('success', 'Link Updated Successfully');*/
    res.redirect('/links/product');
});

// sentencia para buscar
/*
router.get('/search', async (req, res) => {
    const { id } = req.params;
    const {product_name} = req.body;
    const Product = await pool.query("SELECT * FROM PRODUCT WHERE PRODUCT_NAME LIKE '%"+ [product_name]+"%'");
    console.log(product);
    res.render('links/product',{data:product});
}); */

module.exports = router;