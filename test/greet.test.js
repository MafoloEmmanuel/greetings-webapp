const assert = require('assert');
const Greetings = require('../Greetings');
const pg= require('pg');
const Pool = pg.Pool;

 //choosing a db connection 
 const connectionString = process.env.DATABASE_URL || 'postgresql://codex:201735469@localhost:5432/codexdb'
 //connect with a connection pool
     const pool = new Pool({
         connectionString: connectionString,
     });


pool.on('connect', ()=>{
    console.log('database connection has started')
})

describe('Database test', async()=>{
    beforeEach(async()=>{
        console.log('******')
        await pool.query('delete from usernames');
    })
    it('get count when there is no name  greeted', async()=>{

       let greet = Greetings(pool);

      let get= await greet.getAllUsers()
       assert.equal(0,get.length)

    });
    it('get count when there is one name  greeted', async()=>{

        let greet = Greetings(pool);
        await greet.checkIt('imma', 'Hello')
       let get= await greet.getAllUsers()
        assert.equal(1,get.length)
 
     })
     it('should get a count for two names',async()=>{
        let greet = Greetings(pool);
        await greet.checkIt('imma', 'Hello');
        await greet.checkIt('ladi', 'Hello');

let get = await greet.countUsers();
assert.equal(2,get)

     })
     it('should get a count for two names',async()=>{
        let greet = Greetings(pool);
        await greet.checkIt('imma', 'Hello');
        await greet.checkIt('imma', 'Dumela');

        await greet.checkIt('ladi', 'Hello');

let get = await greet.countUsers();
assert.equal(2,get)

     })
     
})
/*
describe('Greetings with routes testing', function(){
    describe("Show greetings in three different languages", function () {
        it('Should greet in English, "Hello "', function () {
            let greeting = GreetingEvent();
            greeting.setLanguage('english');
            assert.equal("Hello ", greeting.getLanguage());
        });
        it('Should greet in Sepedi, "Dumela "', function () {
            let greeting = GreetingEvent();
            greeting.setLanguage('sepedi');
            assert.equal("Dumela ", greeting.getLanguage());
        });
        it('Should greet in Isizulu, "Sawubona "', function () {
            let greeting = GreetingEvent();
            greeting.setLanguage('zulu');
            assert.equal("Sawubona ", greeting.getLanguage());
        });
    });
    describe('Greet Imma in the three different languages', function(){
        it('Should greet Imma in Sepedi, "Dumela Imma"', function(){
            let greeting = GreetingEvent();
            greeting.setName('Imma');
            greeting.setLanguage('sepedi');
            greeting.setGreetingsMessage('Dumela Imma');

            assert.equal('Dumela Imma', greeting.greetingsMessage())
        });
        it('Should greet Imma in English, "Hello Imma"', function(){
            let greeting = GreetingEvent();
            greeting.setName('Imma');
            greeting.setLanguage('english');
            greeting.setGreetingsMessage('Hello Imma');

            assert.equal('Hello Imma', greeting.greetingsMessage())
        });
        it('Should greet Imma in Isizulu, "Sawubona Imma"', function(){
            let greeting = GreetingEvent();
            greeting.setName('Imma');
            greeting.setLanguage('zulu');
            greeting.setGreetingsMessage('Sawubona Imma');

            assert.equal('Sawubona Imma', greeting.greetingsMessage())
        })
    })
    describe('Check the names greeted', function () {
      
        it('Should get the name imma and greet as Imma', function () {
            let greeting = GreetingEvent();
            greeting.setName('imma');
            assert.equal("Imma", greeting.getName('Imma'))
        });
        it('Should get the name IMMA and greet as Imma', function () {
            let greeting = GreetingEvent();
            greeting.setName('IMMA');
            assert.equal("Imma", greeting.getName('Imma'))
        });
    })
    describe('Count how many names are greeted', function () {
        it('Should show a counter of 1 for one name', function () {
            let greeting = GreetingEvent();
            greeting.setName('Emmanuel');
            greeting.getName();
            assert.equal(1, greeting.getCounter());

        });
        it('Should show a counter of 2 for two names', function () {
            let greeting = GreetingEvent();
            greeting.setName('Emmanuel');
            greeting.setName('Puleng');
            greeting.getName();
            assert.equal(2, greeting.getCounter());
        });
        it('Should count a name once even when its repeated', function () {
            let greeting = GreetingEvent();
            greeting.setName('Emmanuel');
            greeting.setName('Emmanuel');
            greeting.setName('Emmanuel');
            greeting.setName('Puleng');
            greeting.setName('Puleng');
            greeting.setName('puleng');
            greeting.getName();
            assert.equal(2, greeting.getCounter());
        });
        it('Should show a counter of 2 for two names', function () {
            let greeting = GreetingEvent();
            greeting.setName('Emmanuel');
            greeting.setName('Puleng');
            greeting.getName();
            assert.equal(2, greeting.getCounter());
        });
        it('Should show a counter of 5 for five names', function () {
            let greeting = GreetingEvent();
            greeting.setName('Emmanuel');
            greeting.setName('Puleng');
            greeting.setName('Rudolf');
            greeting.setName('Kevin');
            greeting.setName('Shante');

            greeting.getName();
            assert.equal(5, greeting.getCounter());
        });
    })
   
})
*/