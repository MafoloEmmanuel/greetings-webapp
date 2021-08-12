module.exports = function GreetingEvent() {
    var greetedNames =  [] ;
    var lang
    var name
    var user
    function displayGreetings(name, myLanguage) {
        if (myLanguage === "english") {
            return "Hello, " + name;
        } else if (myLanguage === "sepedi") {
            return "Dumela, " + name;
        } else if (myLanguage === "zulu") {
            return "Sawubona, " + name;
        }
    }
    function setName(userName) {
         user= userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
    }
    function getName(){
        console.log(user)
         return user;
     }
   
    function checkGreetedNames(){
        if(!greetedNames.includes(user)){
            greetedNames.push(user)  
            console.log(greetedNames)  
        }
    }
    function getGreetedNames(){
        
        console.log(greetedNames)
        return greetedNames;
    }
    function setLanguage(language){
        if(language=== "english"){
            lang = "Hello";
        } else if (language==="sepedi"){
            lang = "Dumela";
        } else if (language==="xulu"){
            lang = "Sawubona"
        }
    }
    function getLanguage(){
        return lang;
    }
    
    
function greetingsMessage(){
    return getLanguage() + ", " + getName()
}
    function getCounter() {
        
        return greetedNames.length
    } 
    function reset(){
        greetedNames=[];
    }
    return {
        displayGreetings,
        setName,
        getCounter,
        getName,
        reset,
        setLanguage,
        getLanguage,
        greetingsMessage,
        checkGreetedNames,
        getGreetedNames,
        //setCounter
    }
    
}

