// TODO: FIX TESTS

// Integretion tests for Contact scenarios
const request = require('supertest');
const { query, insertOnTable } = require('../tests/utils');

describe.only("The API on contacts/ endpoint at get method should", async () => {
    beforeAll(async () => {
        await insertOnTable({'first_name': 'Marcela', 
                            'last_name': 'Barella', 
                            'phone_number': '123456', 
                            'address': 'somewhere in brasil'})
        await insertOnTable({'first_name': 'Dua', 
                            'last_name': 'Lipa', 
                            'phone_number': '56789987', 
                            'address': 'i dont know'});
    })

    afterAll(async () => await cleanTable())

    test("return 200 as status and list all contacts with the correct body", () =>{
        const expectedResult = 2;
        expect.assertions(expectedResult)

        const response = request(app).get('/')

        expect(response.statusCode).toEqual(200)
        expect(Object.keys(response.body).length).toEqual
    })

    test("return all the contacts with the properly attributes", async () => {
        expect.assertions(1)
        
        const response = request(app).get('/')

        expect(response.body).toMatchObject(
            {
                "first_name": "Marcela",
                "last_name": "Barella",
                "phone_number": "123456",
                "addresss": "somewhere in brasil"
            },
            {
                "first_name": "Dua",
                "last_name": "Lipa",
                "phone_number": "789098",
                "addresss": "i dont know"
            }
        )
    })

    test("return 404 as status and an error message when called in a wrong way", () => {
        excpect.asserrtions(1)
        
        const response = request(app).get('contacts/')

        expect(response.body).toMatchObject({ 'message': 'Could not found the contacts'})
    })
})


// describe.only("The API on contacts/:id endpoint at get method should", async () => {
//     beforeAll(async () => {
//         await insertOnTable('Marcela', 'Barella', '123456', 'somewhere in brasil')
//         await insertOnTable('Dua', 'Lipa', '789098', 'i dont know');
//     })

//     afterAll(async () => await cleanTable())

//     test("return 200 as status and list the correct contact when called porperly", async () => {
//         expect.assertions(1)

//         const response = request(app).get('contacts/1')

//         expect(response.statusCode).toEqual(200)
//         expect(response.body).toMatchObject(
//             {
//                 "first_name": "Marcela",
//                 "last_name": "Barella",
//                 "phone_number": "123456",
//                 "addresss": "somewhere in brasil"
//             }
//         )
//     })

//     test("return 404 as status and an error message when called with a nonexistent or wrong id", async () => {
//         expect.assertions(1)

//         const response = request(app).get('contacts/24')

//         expect(response.statusCode).toEqual(404)
//         expect(response.body).toMatchObject({ "message": 'Could not found this contact'})
//     })
// })

// describe.only("The API on contacts/create endpoint at post method should", async () => {
//     beforeAll(async () => {
//         await insertOnTable('Marcela', 'Barella', '123456', 'somewhere in brasil')
//         await insertOnTable('Dua', 'Lipa', '789098', 'i dont know');
//     })

//     afterAll(async () => await cleanTable())

//     test("return 200 as status when called with the properly attributes", async () => {
//         expect.assertions(1)

//         const response = request(app).post('contacts/create').send(
//             {
//                 "first_name": "Geedy",
//                 "last_name": "Lee",
//                 "phone_number": "2112",
//                 "address": "Lotus Land"
//             }
//         )

//         expect(response.statusCode).toEqual(200)
//     })

//     test("return the correct object that was persisted on db when called with the properly attributes", async () => {
//         expect.assertions(1)

//         const response = request(app).post('contacts/create').send(
//             {
//                 "first_name": "Geedy",
//                 "last_name": "Lee",
//                 "phone_number": "2112",
//                 "address": "Lotus Land"
//             }
//         )

//         expect(response.body).toMatchObject({
//             "first_name": "Geedy",
//             "last_name": "Lee",
//             "phone_number": "2112",
//             "address": "Lotus Land"
//         })
//     })

//     test("return a response that matches with the queryed field on database when called with the porperly attributes", async () => {
//         excpect.assertions(1)

//         const response = request(app).post('contacts/create').send(
//             {
//                 "first_name": "Geedy",
//                 "last_name": "Lee",
//                 "phone_number": "2112",
//                 "address": "Lotus Land"
//             }
//         )
//         const expectedContact = query(response.body.dataId)

//         expect(response.body).toMatchObject({
//             expectedContact
//         })
//     })

//     test("return 403 as status and a error message when called with a wrong field", async () => {
//         expect.assertions(2)

//         const response = request(app).post('contacts/create').send(
//             {
//                 "wrong_field": "Neil"
//             }
//         )

//         expect(response.statusCode).toEqual(403)
//         expect(response.body).toMatchObject({ 'message': 'Could not create the contact'})
//     })

//     // Since none of the fields are mandatory, they have not been tested
// })


// describe.only("The API on contacts/delete/:id endpoint at delete method should", async () => {
//     beforeAll(async () => {
//         await insertOnTable('Marcela', 'Barella', '123456', 'somewhere in brasil')
//         await insertOnTable('Dua', 'Lipa', '789098', 'i dont know');
//     })

//     afterAll(async () => await cleanTable())

//     test("should return 200 as status code and sucess message when called with properly id", async () => {
//         expect.assertions(2)

//         const response = request(app).delete('contacts/delete/1')

//         expect(response.statusCode).toEqual(200)
//         expect(response.body).toMatchObject({ 'message': 'Contact was deleted with success'})
//     })

//     test("should not find the deleted contact on database", async () => {
//         expect.assertions(1)

//         const response = request(app).delete('contacts/delete/1')
//         const expectedResult = query(response.body.dataId)

//         expect(expectedResult).toBeNull();
//     })

//     test("should return 403 as status and a error message called with an inexistent id", async () => {
//         expect.assertions(2)

//         const response = request(app).delete('contacts/delete/24')

//         expect(response.statusCode).toEqual(403)
//         expect(response.body).toMatchObject({ 'message': 'Could not delete the contact'})
//     })
// })


// describe.only("The API on contacts/update/:id endpoint at put method should", async () => {
//     beforeAll(async () => {
//         await insertOnTable('Marcela', 'Barella', '123456', 'somewhere in brasil')
//         await insertOnTable('Dua', 'Lipa', '789098', 'i dont know');
//     })

//     afterAll(async () => await cleanTable())

//     test("should return 200 as status code and updated contact as response", async () => {
//         expect.assertions(2)

//         const response = request(app).put('contacts/update/1').send(
//             {
//                 "first_field": "Marcelinha"
//             })

//         const expectedResult = {
//             "first_name": "Marcelinha",
//             "last_name": "Barella",
//             "phone_number": "123456",
//             "address": "somewhere in brasil"
//         }
//         expect(response.statusCode).toEqual(200)
//         expect(response.body).toMatchObject(expectedResult)
//     })

//     test("should return 403 as status and a error message called with an inexistent id", async () => {
//         expect.assertions(2)

//         const response = request(app).delete('contacts/update/24').send(
//             {
//                 "first_field": "Marcelinha"
//             })

//         expect(response.statusCode).toEqual(403)
//         expect(response.body).toMatchObject({ 'message': 'Could not update the contact'})
//     })
// })