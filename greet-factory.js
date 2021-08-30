module.exports = function GreetingEvent() {
    var greetedNames = {};
    var lang;
    var user;
    var message;
    var regExp = /^[a-zA-Z]{1,15}$/gi;
    function setName(userName) {
        if (userName.match(regExp)) {
            user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
            if (greetedNames[user] === undefined) {
                greetedNames[user]=1;
                console.log({ user })
                return true;
            } else{
                greetedNames[user] +=1;
                return true;
            }
        } return false;
    }
    function getName() {
        return user;
    }

    function getGreetedNames() {
        return greetedNames;
    }
    function setLanguage(language) {
        if (language === "english") {
            lang = "Hello ";
        } else if (language === "sepedi") {
            lang = "Dumela ";
        } else if (language === "zulu") {
            lang = "Sawubona "
        }
        console.log({ lang })
        return lang;
    }
    function getLanguage() {
        return lang;
    }
    function greetingsMessage() {
        return message
    }
    function setGreetingsMessage() {
            message = getLanguage() + getName();
         console.log({ message })
    }
    function getCounter() {
        const counterObject = Object.getOwnPropertyNames(greetedNames)
        return counterObject.length
    }
    function countEach(name){
        return greetedNames[name]
    }
    function reset() {
        greetedNames = {};
    }
    return {
        countEach,
        setName,
        getCounter,
        getName,
        reset,
        setLanguage,
        getLanguage,
        setGreetingsMessage,
        greetingsMessage,
       // checkGreetedNames,
        getGreetedNames,
        //getErrors,
    }

}

