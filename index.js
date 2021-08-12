const express = require('express');
const exphbs = require('express-handlebars');
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
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

app.get("/", function(req,res){
    res.render("index",{
       // getName: greetInsta.getName(),
      //  getLanguage: greetInsta.getLanguage(),
      getGreetings: greetInsta.greetingsMessage(),
        getCounter: greetInsta.getCounter(),
        greetedNames: greetInsta.getGreetedNames()
    })
})  

app.post('/greetings', function(req,res){
 greetInsta.setName(req.body.user),
 greetInsta.setLanguage(req.body.language),


  res.redirect('/');
})
app.post('/greeted', (req,res) => {

greetInsta.checkGreetedNames(req.body.greetedNames),
res.redirect('/')


})
const PORT = process.env.PORT || 3012;

app.listen(PORT, function() {
    console. log('starting on port ', PORT)
})