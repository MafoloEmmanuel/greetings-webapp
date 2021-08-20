const express = require('express');
const exphbs = require('express-handlebars');
const flash = require('express-flash')
const session = require('express-session')
const GreetingEvent = require('./greet-factory')
const greetInsta = GreetingEvent()
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

//initialize the flash middleware
app.use(flash());

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/", function (req, res) {
    console.log(greetInsta.greetingsMessage())
    res.render("index", {
        getGreetings: greetInsta.greetingsMessage(),
        getCounter: greetInsta.getCounter(),
    })
})

app.post('/greetings', function (req, res) {

    if (!greetInsta.setLanguage(req.body.language)) {
        req.flash('info', 'Please select a language')

        console.log('language')
    } else if (!greetInsta.setName(req.body.user)) {
        req.flash('info', 'Please enter a name!')
        
    } else {
        greetInsta.setGreetingsMessage()

    }
    res.redirect('/')


})

app.get('/greeted', (req, res) => {
    greetInsta.checkGreetedNames(req.body.greetedNames)

    res.render('greeted', {
        greetedNames: greetInsta.getGreetedNames()
    })
})

const PORT = process.env.PORT || 3012;

app.listen(PORT, function () {
    console.log('starting on port ', PORT)
})