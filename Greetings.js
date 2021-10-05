module.exports = (pool)=>{
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

    let setUser = async(userName)=>{
        user = userName.charAt(0).toUpperCase() + userName.slice(1).toLowerCase(); 
        var count = 1
        var checkName = await pool.query('select username from usernames where username = $1', [user]);
        if(checkName.rows.length <1){
            let result = await pool.query('insert into usernames (username,count) values ($1,$2)',[user,count]);
            return result.rows

        } else{
            await pool.query("update usernames set count=count +1 where username=$1", [user])
        }
    }
    let getUser= async(name)=>{
        let result = await pool.query('select * from usernames where username=$1',[name])
      return result.rows
     }
   let getAllUsers=async()=>{
       let result = await pool.query("select * from usernames");
      // console.log(result.rows[0])
       return result.rows;
   }
   let countUsers=async()=>{
       let result = await pool.query('select * from usernames');
      // console.log(result.rowCount);
       return result.rowCount
   }
   
   let update= async(username,count)=>{
       let result = await pool.query("update usernames set count = $1 where username = $1",[count,username]);
       return result.rows.rowCount
   }
   
   let nameList = async()=>{
    let names = await pool.query('select username from usernames ');
   //console.log(names.rows)
    return names.rows;
}
   let deleteUsers= async()=>{
let result = await pool.query('delete from usernames');
return result.rows

   }
   let countEach = async(username)=>{
    let user = await pool.query('select * from usernames where username=$1',[username])
       let result = user.rows[0].count;
      // console.log(result)
       return result
   }
  let checkIt=async(username, language) =>{
    const user = await getUser(username);
    if (user.length !== 0) {
       // let countIncrease = user[0].count + 1;
        await update(language, username);
    } else  {


        await setUser(username);
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
       checkIt,
       nameList,
       countEach
       
   }
}
