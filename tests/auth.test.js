// Integration tests for Auth Scenarios
const response = require('supertest')
const jest = require('jest')

describe.only("The API on login/ endpoint at post method should", async () => {
    setUp(async () => {
        await insertOnTable('Marcela', 'Barella', '123456', 'somewhere in brasil')
        await insertOnTable('Dua', 'Lipa', '789098', 'i dont know');
    })

    afterAll(async () => await cleanTable())

    test("return 200 as status and re", () =>{
        
    })

    test("return all the contacts with the properly attributes", async () => {
        expect.assertions(1)
        
       
    })

    test("return 404 as status and an error message when called in a wrong way", () => {
        excpect.asserrtions(1)

    })
})