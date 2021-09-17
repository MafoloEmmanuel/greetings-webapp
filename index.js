const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash')
const session = require('express-session')

const app = express();


const {Pool}= require('pg');
 /*const pool = new Pool({
     host: "localhost",
     port : 5432,
     user: "codex",
     password: "201735469",
     database : "codexdb"

 })
 */
 
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

const Greetings = require('./Greetings')
const greetingsInsta = Greetings(pool)
//const greetInsta = GreetingEvent(client)


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



app.get("/",  async (req, res)=> {
     let count =await greetingsInsta.countNames();
    res.render("index", {
        getCounter:   count
    })   
})

app.post('/greetings', async (req, res)=> {
    if(!req.body.language && !req.body.user) {
        req.flash('info', "Please enter a name and select a language!");
        res.render('index');
    } else if (!req.body.language) {
        req.flash('info', 'Please select a language!');
        res.render('index');

    } else if (!req.body.user) {
        req.flash('info', 'Please enter a name!');
        res.render('index');
    } else if (!req.body.user.match(/^[a-zA-Z]{1,15}$/gi)) {
        req.flash('info', 'Please enter a valid name!');
        res.render('index');
    } else {
       await greetingsInsta.saveNames(req.body.user);
        greetingsInsta.setLanguage(req.body.language);

        res.render('index',{
            getGreetings: greetingsInsta.displayGreetings(),
            getCounter:   await greetingsInsta.countNames()

        })
    
    }
})
app.get('/greeted', async (req, res) => {

    res.render('greeted', {
        greetedNames: await greetingsInsta.nameList(),
        
    });
    req.flash("info", "The counter has been reset to zero")

})
app.get('/counter/:greetedPerson', async (req, res) => {
    const greetedPerson = req.params.greetedPerson;
    res.render('usernameGreeted', {
        greeted: greetedPerson,
        getCounter: result
        
    })

})
app.post('/reset', async(req,res)=>{
    await greetingsInsta.deleteNames();
    res.redirect('/')

})
const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log('starting on port ', PORT)
})