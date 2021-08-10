function GreetingEvent(greetedList) {
    var greetedNames =greetedList || [];
    function getNameAndLanguage(name, myLanguage) {
        if (myLanguage === "english") {
            return "Hello, " + name;
        } else if (myLanguage === "sepedi") {
            return "Dumela, " + name;
        } else if (myLanguage === "zulu") {
            return "Sawubona, " + name;
        }
    }
    function setName(userName) {
        var user= userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
        if (!greetedNames.includes(user)) {
            //add an entry for the user that was greeted in the Object Map
           // console.log(userName)
        console.log(user)
          greetedNames.push(user) ;
        } 
    }
    function reset(){
        greetedNames=[];
    }
    function getName(){
       // console.log(greetedNames)
        return greetedNames;
    }
    function getCounter() {
        console.log(greetedNames);
        return greetedNames.length 
    } 
    return {
        getNameAndLanguage,
        setName,
        getCounter,
        getName,
        reset
    }
    
}

