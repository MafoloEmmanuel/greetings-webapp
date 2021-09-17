
module.exports = (pool) => {
    let regExp = /^[a-zA-Z]{1,15}$/gi;
    let user
    let lang
    let greetedNames={}
    let saveNames = (async (userName) => {
        await pool.connect();
        if (userName.match(regExp)) {
            user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase();
                const setName = await pool.query('insert into usernames(username,count) values($1,$2)', [user, "1"])
                const seeNames = await pool.query('select * from usernames');
               
                // console.log(result.rowCount);
                console.log(setName.rows)
                console.log(seeNames.rows)
        }
    });
    function setLanguage(language) {
        if (language === "english") {
            lang = "Hello ";
        } else if (language === "sepedi") {
            lang = "Dumela ";
        } else if (language === "zulu") {
            lang = "Sawubona "
        }
        return lang;
    }
    let getName = () => {
        console.log(user)
        return user
    }
    let getLanguage = () => {
        return lang;
    }
    let countNames = async () => {
    
        let result = await pool.query('select id from usernames');
        console.log(result.rowCount);
        return result.rowCount;
    }

    let displayGreetings = () => {
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
        deleteNames
    }
}


