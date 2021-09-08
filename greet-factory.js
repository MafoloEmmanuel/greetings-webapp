module.exports = function GreetingEvent(pool) {
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
              //  console.log({ user })
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
function setErrors(err){
if(!setName().match(regExp)){
err = "Please enter a valid name!"
} else if(setName() === ""){
    err="Please enter a name!"
} else if(setLanguage()=== undefined){
    err="Please select a language!"
} else if(!setName() && !setLanguage()){
    err="Please enter a name and select a language!"   
}
}
function getErrors(){
    return setErrors()
}

    function getGreetedNames() {
        console.log(greetedNames)
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
       // console.log({ lang })
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
       //  console.log({ message })
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
    // get greeted names using SQL
    async function getAll(){
        let result = await pool.query("SELECT * FROM usernames ");
        return result.rows
    }
    // get a count of greeted names using SQL
    async function getCount(){
        let result = await pool.query("SELECT count FROM usernames")
        return result.rows[0].count
    }
    //reset the counter 
    async function resetCounter(){
        let result = await pool.query("DELETE FROM usernames ");
        return result.rows
    }
    // get a count for each username
    async function getCountEach(){
        let result = await pool.query("SELECT count FROM usernames WHERE id=$1");
        return result.rows
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
        getGreetedNames,
        setErrors,
        getErrors,

        getAll,
        getCountEach,
        resetCounter,
        getCount
    }

}

