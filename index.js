const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash')
const session = require('express-session')
const GreetingEvent = require('./greet-factory')
const app = express();

//connecting to the database
const {Pool} = require('pg');
//connect with SSL 

//choosing a db connection 
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/usernames'
//connect with a connection pool
const pool = new Pool({
    connectionString: connectionString,
    // ssl:  { rejectUnauthorized: false }
});
const greetInsta = GreetingEvent(pool)


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
    res.render("index", {
        getGreetings: await greetInsta.greetingsMessage(),
        getCounter: await greetInsta.getCount() 
    })   
})

app.post('/greetings', async (req, res)=> {
    if(!req.body.language && !req.body.user) {
        req.flash('info', "Please enter a name and select a language!");
        res.redirect('/');
    } else if (!req.body.language) {
        req.flash('info', 'Please select a language!');
        res.redirect('/');

    } else if (!req.body.user) {
        req.flash('info', 'Please enter a name!');
        res.redirect('/');
    } else if (!req.body.user.match(/^[a-zA-Z]{1,15}$/gi)) {
        req.flash('info', 'Please enter a valid name!');
        res.redirect('/');
    } else {
        greetInsta.setName(req.body.user);
        greetInsta.setLanguage(req.body.language);
        greetInsta.setGreetingsMessage();

        res.redirect('/')
    }

})
app.get('/greeted', async (req, res) => {
    let greetedList = await greetInsta.getGreetedNames()
    res.render('greeted', {
        greetedNames: greetedList
    })
})
app.get('/counter/:greetedPerson', async (req, res) => {
    const greetedPerson = req.params.greetedPerson;
    let result = await greetInsta.countEach(greetedPerson)
    res.render('usernameGreeted', {
        greeted: greetedPerson,
        getCounter: result
        
    })

})
app.post('/reset', async(req,res)=>{

})
const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log('starting on port ', PORT)
})