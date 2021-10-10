const assert = require('assert');
const Greetings = require('../Greetings');
const pg = require('pg');
const Pool = pg.Pool;

let useSSL =false;
 let local = process.env.LOCAL || false;
 if(process.env.DATABASE_URL && !local){
     useSSL = { rejectUnauthorized: false };
 }
//choosing a db connection 
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:201735469@localhost:5432/codexdb'
//connect with a connection pool
const pool = new Pool({
    connectionString: connectionString,
    ssl: useSSL
});


pool.on('connect', () => {
    console.log('database connection has started')
})

describe('Database test', async () => {
    beforeEach(async () => {
        console.log('******')
        await pool.query('delete from usernames');
    });
    it('get count when there is no name  greeted', async () => {
    let greet = Greetings(pool);
     
        let get = await greet.getAllUsers()
        assert.equal(0, get.length)

    });
    it('get count when there is one name  greeted', async () => {
        let greet = Greetings(pool);

        await greet.checkIt('imma')
        let get = await greet.getAllUsers()
        assert.equal(1, get.length)

    })
    it('should get a count for two names', async () => {
        let greet = Greetings(pool);
    
        await greet.checkIt('imma');
        await greet.checkIt('imma');

        await greet.checkIt('ladi');

        let get = await greet.countUsers();
        assert.equal(2, get)

    })
    
    it("Show that three users are greeted", async () => {
    let greet = Greetings(pool);
      
        await greet.checkIt('imma');
        await greet.checkIt('ladi');
        await greet.checkIt('quincy');
        let getCount = await greet.countUsers()
        assert.equal(3, getCount)
    });
    it("Show that three users are greeted even when Imma is greeted 3 times ", async () => {
    let greet = Greetings(pool);
       
       
        await greet.checkIt('imma');
        await greet.checkIt('imma');
        await greet.checkIt('imma');

        await greet.checkIt('ladi');
        await greet.checkIt('quincy');
        let getCount = await greet.countUsers();
        assert.equal(3, getCount)
    });
   
    
    it('should to be able to set the language to english and return "Hello"', async()=> {
      
    let greet = Greetings(pool);
      
        greet.setLanguage('english')
        let results =  greet.getLanguage();
        assert.equal('Hello ', results);
    });
    it('should to be able to set the language to sepedi and return "Dumela"', async()=> {
    let greet = Greetings(pool);
        
        greet.setLanguage('sepedi')
         let results =  greet.getLanguage();
         assert.equal('Dumela ', results);
     });
     it('should to be able to set the language to isizulu and return "Sawubona"', async()=> {
    let greet = Greetings(pool);
       
       
        greet.setLanguage('zulu')
         let results =  greet.getLanguage();
         assert.equal('Sawubona ', results);
     });
   

     after(()=>{
        pool.end();
    });

})