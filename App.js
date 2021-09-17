const client = require('./database');
const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash')
const session = require('express-session')
///const GreetingEvent = require('./greet-factory')
const app = express();

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
app.use(flash());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//client.connect();
 // use query method , write the query and a callback 
 /*
 client.query('select * from usernames', (err,result)=>{
     if(!err){
         console.log(result.rows) //return rows
     }
     //end the connection
     client.end()
 })
*/

 //use async/await


 const saveNames = (async(userName)=>{
await client.connect();

user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    const setName = await client.query('insert into usernames(username) values($1)', [user])
    //const seeNames = await client.query('select * from usernames');
    console.log(result.rowCount);
    console.log(setName.rows)
    console.log(seeNames.rows)

    client.end();
 });
 saveNames();

 app.get('/', async(req,res)=>{
     res.render('index', {
     //    getGreetings: await 

     })
 })
 app.post('/greetings', async(req,res)=>{
 let saveNames = await saveNames(req.body.user);
 console.log(req.body.user);
     res.redirect('/')
 })
 const PORT = process.env.PORT || 1158;
 app.listen(PORT, ()=>{
     console.log('started')
 })
