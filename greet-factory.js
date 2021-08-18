module.exports = function GreetingEvent() {
    var greetedNames = [];
    var lang;
    var user;
    var message;
    var regExp = /^[a-zA-Z]{1,15}$/gi;

    function setName(userName) {
        if (userName.match(regExp)) {
            user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
            if (!greetedNames.includes(user)) {
                greetedNames.push(user)
            }
        } 
    }
    function getName() {
        //console.log(user)

        return user;
    }

    function checkGreetedNames() {
        if (!greetedNames.includes(user)) {
            greetedNames.push(user)
        }
    }
    function getGreetedNames() {

        //console.log(greetedNames)
        return greetedNames;
    }
    function setLanguage(language) {
        if (language === "english") {
            lang = "Hello";
        } else if (language === "sepedi") {
            lang = "Dumela";
        } else if (language === "zulu") {
            lang = "Sawubona"
        }
    }
    function getLanguage() {
        return lang;
    }

    function greetingsMessage() {
        return message;
    }
    function setGreetingsMessage(){
        message = getLanguage() + ", " + getName();
    }
    function getCounter() {

        return greetedNames.length
    }
    function reset() {
        greetedNames = [];
    }
    return {
        //  displayGreetings,
        setName,
        getCounter,
        getName,
        reset,
        setLanguage,
        getLanguage,
        setGreetingsMessage,
        greetingsMessage,
        checkGreetedNames,
        getGreetedNames,
        //setCounter
    }

}

