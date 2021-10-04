module.exports = (pool)=>{
    let regExp = /^[a-zA-Z]{1,15}$/gi;
var message =''
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
    let getLanguage = () => {
        return lang;
    }
    let setUser = async(name,language)=>{
         await pool.query('insert into usernames (username,langauge,count) values ($1,$2,1)',[name,language]);
    }
    let getUser= async(name)=>{
        let result = await pool.query('select * from usernames where username=$1',[name])
      return result.rows
     }
   let getAllUsers=async()=>{
       let result = await pool.query("select * from usernames");
       console.log(result.rows[0])
       return result.rows;
   }
   let countUsers=async()=>{
       let result = await pool.query('select * from usernames');
       console.log(result.rowCount);
       return result.rowCount
   }
   
   let update= async(username,language,count)=>{
       let result = await pool.query("update usernames set count = $1, language=$2 where username = $1",[count,language,username]);
       return result.rows.rowCount
   }
   let getGreetings=()=>{
       return getLanguage()+ getUser() 
   }
   let nameList = async()=>{
    let names = await pool.query('select username from usernames ');
   console.log(names.rows)
    return names.rows;
}
   let deleteUsers= async()=>{
let result = await pool.query('delete from usernames');
return result.rows

   }
  let checkIt=async(username, language) =>{
    const user = await getUser(username);
    if (user.length !== 0) {
        let countIncrease = user[0].count + 1;
        await update(countIncrease, language, username);
    } else {
        await setUser(username, language);
    }
}
   return {
       setUser,
       getAllUsers,
       getUser,
       countUsers,
       update,
       getLanguage,
       setLanguage,
       deleteUsers,
       getGreetings,
       checkIt,
       nameList
       
   }
}
