 const {Client}= require('pg');
 const client = new Client({
     host: "localhost",
     port : 5432,
     user: "codex",
     password: "201735469",
     database : "codexdb"

 })
client.on('connect', ()=>{
    console.log('connection has started')
})
client.on('end', ()=>{
    console.log('connection has ended')
})
 module.exports =client;
 