const assert = require('assert');
const Greetings = require('../Greetings');
const pg = require('pg');
const Pool = pg.Pool;

//choosing a db connection 
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:201735469@localhost:5432/codexdb'
//connect with a connection pool
const pool = new Pool({
    connectionString: connectionString,
});


pool.on('connect', () => {
    console.log('database connection has started')
})

describe('Database test', async () => {
    beforeEach(async () => {
        console.log('******')
        await pool.query('delete from usernames');
    });
    let greet = Greetings(pool);
    it('get count when there is no name  greeted', async () => {
        let get = await greet.getAllUsers()
        assert.equal(0, get.length)

    });
    it('get count when there is one name  greeted', async () => {

        await greet.checkIt('imma', 'Hello')
        let get = await greet.getAllUsers()
        assert.equal(1, get.length)

    })
    it('should get a count for two names', async () => {
        await greet.checkIt('imma', 'Hello');
        await greet.checkIt('imma', 'Dumela');

        await greet.checkIt('ladi', 'Hello');

        let get = await greet.countUsers();
        assert.equal(2, get)

    })
    
    it("Show that three users are greeted", async () => {
        await greet.checkIt('imma', 'Dumela');
        await greet.checkIt('ladi', 'Hello');
        await greet.checkIt('quincy', 'Dumela');
        let getCount = await greet.countUsers()
        assert.equal(3, getCount)
    });
    it("Show that three users are greeted even when Imma is greeted 3 times ", async () => {
        await greet.checkIt('imma', 'Dumela');
        await greet.checkIt('imma', 'Dumela');
        await greet.checkIt('imma', 'Dumela');

        await greet.checkIt('ladi', 'Hello');
        await greet.checkIt('quincy', 'Dumela');
        let getCount = await greet.countUsers();
        assert.equal(3, getCount)
    });
   



})

