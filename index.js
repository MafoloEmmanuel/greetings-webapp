const express = require('express');
const exphbs = require('express-handlebars');
//const greetInsta = GreetingEvent()
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

const PORT = process.env.PORT || 3012;
app.get("/", function(req,res){
    res.render("index");
})  

app.post('/greetings', function(req,res){
})
app.listen(PORT, function() {
    console. log('starting on port ', PORT)
})