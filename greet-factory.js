module.exports = function GreetingEvent() {
    var greetedNames = [];
    var lang;
    var user;
    var message;
    var regExp = /^[a-zA-Z]{1,15}$/gi;
    var error;

    function setName(userName) {
        if (userName.match(regExp)) {
            user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
            if (!greetedNames.includes(user)) {
                greetedNames.push(user);
                console.log({ user })

                return true;
            }
        } return false;
    }
    function getName() {
        return user;

    }
    function errors() {
        if (!setName()) {
            error = "Please enter a name"
        } else if (!setLanguage()) {
            error = "Please select a language"
        } else if (!setName().match(regExp)) {
            error = "Please enter a valid name"
        }
    }
    function getErrors() {
        return error;
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
        getErrors,
        errors
        //setCounter
    }

}

