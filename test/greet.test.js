const assert = require('assert');
const GreetingEvent = require('../greet-factory');

describe('Greetings with routes testing', function(){
    describe("Greeting in three different languages", function () {
        it('Should greet a person in English', function () {
            let greeting = GreetingEvent();
            greeting.setLanguage('english');
            assert.equal("Hello ", greeting.getLanguage());
        });
        it('Should greet a person in Sepedi', function () {
            let greeting = GreetingEvent();
            greeting.setLanguage('sepedi');
            assert.equal("Dumela ", greeting.getLanguage());
        });
        it('Should greet a person in Isizulu', function () {
            let greeting = GreetingEvent();
            greeting.setLanguage('zulu');
            assert.equal("Sawubona ", greeting.getLanguage());
        });
    });
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