module.exports = (greetingsInsta)=>{

let main=async(req,res,next)=>{
try{
    let count = await greetingsInsta.countUsers();
    res.render("index", {
        getCounter:   count
    })   
}
catch(err){
    next(err)
}
}
let showGreetings=async(req,res,next)=>{
    try{ let userName=  req.body.user;
        let language= req.body.language;
        var user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
     
         if(!language && !user) {
             req.flash('info', "Please enter a name and select a language!");
             res.render('index');
         } else if (!language) {
             req.flash('info', 'Please select a language!');
             res.render('index');
         } else if (!user) {
             req.flash('info', 'Please enter a name!');
             res.render('index');
         } else if (!user.match(/^[a-zA-Z]{1,15}$/gi)) {
             req.flash('info', 'Please enter a valid name!');
             res.render('index');
         } else {
            let isLanguage= greetingsInsta.setLanguage(language);
     
     req.flash('greetingsMessage', isLanguage + " " + user)
      
     await greetingsInsta.checkIt(user,isLanguage);
     let count = await greetingsInsta.countUsers();
     
     res.render('index',{
            getCounter: count
        })
         }
     
     }catch(err){
         console.log(err)
         next(err)
     }
}
let showGreeted = async(req,res,next)=>{
    try {
        res.render('greeted', {
            greetedNames: await greetingsInsta.getAllUsers(),
        });
    } catch (err) {
        next(err)
    }
}
let countEachGreeted = async(req,res,next)=>{
    try {
        const greetedPerson = req.params.greetedPerson;
        let result = await greetingsInsta.countEach(greetedPerson)
    
        res.render('usernameGreeted', {
            greeted: greetedPerson,
            countGreetedTimes: result
            
        })
    } catch (err) {
        next(err)
    }
}
let resetCount = async(req,res,next)=>{
    try {
        await greetingsInsta.deleteUsers();
        res.redirect('/')
    } catch (error) {
        next(error)
    }
}
return{
    main,
    showGreetings,
    showGreeted,
    countEachGreeted,
    resetCount
    
}
}