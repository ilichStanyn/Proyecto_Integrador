const express = require('express');
const morgan = require ('morgan');
/*const {engine} = require('express-handlebars');  cambio todas las plantillas por ejs */
const flash = require('connect-flash');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

// Database
const { database } = require('./keys');

// Initializations
const app = express();
require('./lib/passport');

//settings
app.set('port', process.env.PORT || 4000 );

app.set('views', path.join(__dirname, 'views')); /* para traer la carpeta views*/
app.set('views/partials', path.join(__dirname, '/views/partials')); /* para traer la carpeta views*/
app.set('view engine', 'ejs');


// middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
    secret: 'sessionSql',
    resave: false,
    saveUninitialized: false,
    store: new MySQLStore(database)
  }));
// aca tengo que llamar a flash para poder levantar mensajes ver documentacion de flash y passport
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(expressValidator()); 


// Global variables
  app.use(async (req, res, next) => {
    app.locals.success = await req.flash("success");
    app.locals.message = req.flash('message');
    app.locals.error = await req.flash("error");
    app.locals.user = req.user; // para almencenar el usuario loggeado
    next();
  });


/*  app.use((req,res,next)=> {
    next();
});*/

// Routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/links', require('./routes/links'));
app.use('/public', require('./routes/index'));
// traigo todas las carpetas porque no puedo obtener los links
app.get('/pages/contact', (req, res)=> res.render(__dirname + '/views/pages/contact.ejs'));
app.get('/pages/item', (req, res)=> res.render(__dirname + '/views/pages/item.ejs'));
app.get('/pages/login', (req, res)=> res.render(__dirname + '/views/pages/login.ejs'));
/*app.get('/pages/shop', (req, res)=> res.render(__dirname + '/views/pages/shop.ejs'));*/
app.get('/pages/cart', (req, res)=> res.render(__dirname + '/views/pages/cart.ejs'));


app.get('/', (req,res)=>{
    res.render("index");
}
)



// Public -- static
app.use(express.static(path.join(__dirname, 'public')));

// Starting the server

app.listen(app.get('port'),()=>{
    console.log('Server on port ==>', app.get('port'));
} )