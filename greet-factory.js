const database = require('./database')
module.exports = function GreetingEvent(client) {
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
        return getLanguage()+getName()
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
        greetingsMessage,
        getGreetedNames,
        
        
    }

}

module.exports = (pool) => {
    let regExp = /^[a-zA-Z]{1,15}$/gi;
    let setName
    let lang
    let user
    let saveNames = (async (userName) => {
        await pool.connect();
        if (userName.match(regExp)) {
           user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
                setName = await pool.query('insert into usernames(username,count) values($1,1)', [user])
                const seeNames = await pool.query('select * from usernames');
                // console.log(result.rowCount);
                console.log(setName.rows)
                console.log(seeNames.rows)
        }
    
    });

    let setLanguage= (language)=> {
        if (language === "english") {
            lang = "Hello ";
        } else if (language === "sepedi") {
            lang = "Dumela ";
        } else if (language === "zulu") {
            lang = "Sawubona "
        }
        return lang;
    }
    let getName =() => {
    return user;
    
    }
  
    let getLanguage = () => {
        return lang;
    }
    let countNames = async () => {
        let nameadded = getName();
        if(!nameadded){
            let sql = 'select * from usernames'
        let result = await pool.query(sql);
        console.log(result.rowCount);
        return result.rowCount;

        }else{
            let sql = "update usernames set count = count + 1 where username = $1";
            let result = await pool.query(sql)
            return result.rowCount
        }

    }
    let updateCounter=(name)=>{
        

    }

    let displayGreetings = async() => {

        let message = getLanguage() + getName();
        return message;
    }
    let deleteNames = async()=>{
        let result = await pool.query('delete from usernames ');
        console.log(result.rows);
        console.log(result.rowCount);
        return result.rows;
    }
let nameList = async()=>{
    let names = await pool.query('select username from usernames ');
   console.log(names.rows)
    return names.rows;
}
    return {
        saveNames,
        getName,
        countNames,
        setLanguage,
        getLanguage,
        displayGreetings,
        nameList,
        deleteNames,
    }
}




