const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash')
const session = require('express-session')

const app = express();
const {Pool}= require('pg');
 
 let useSSL =false;
 let local = process.env.LOCAL || false;
 if(process.env.DATABASE_URL && !local){
     useSSL = { rejectUnauthorized: false };
 }
 //choosing a db connection 
 const connectionString = process.env.DATABASE_URL || 'postgresql://codex:201735469@localhost:5432/codexdb'
 //connect with a connection pool
     const pool = new Pool({
         connectionString: connectionString,
       ssl:  useSSL
     });
pool.on('connect', ()=>{
    console.log('connection has started')
})
const Greetings = require('./Greetings');
const Greet_routes = require('./routes/Greet_routes');
const greetingsInsta = Greetings(pool);
const greetRoute = Greet_routes(greetingsInsta)

const handlebarSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: './views', 
    layoutsDir: './views/layouts'
});
app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

// initialize session middleware
app.use(session({
    secret: "<This is the string used for my sessions  >",
    resave: false,
    saveUninitialized: true
}));

//initialize the flash middleware
app.use(flash());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/",greetRoute.main);
app.post('/greetings',greetRoute.showGreetings);
app.get('/greeted', greetRoute.showGreeted);
app.get('/counter/:greetedPerson',greetRoute.countEachGreeted);
app.post('/reset', greetRoute.resetCount);
const PORT = process.env.PORT || 3012;
app.listen(PORT, function () {
    console.log('starting on port ', PORT);
})