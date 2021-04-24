// TODO: FIX TESTS

// Integretion tests for Contact scenarios
const request = require("supertest");
const app = require("../app");
const dbHelper = require('./utils/firebase')
const env = process.env.NODE_ENV

beforeAll(async () => {
  // await dbHelper.restartContactsTable()

  // await dbHelper.createContact({
  //   first_name: 'Marcela',
  //   last_name: 'Barella',
  //   phone_number: '123456789',
  //   address: 'rua dos bobos numero zero'
  // })
})  

describe('The API on contacts/ endpoint at GET method should', () => {

  test('return 200 as status and list all contacts with the correct body', async () => {
    const user = await request(app).post('auth/register')
    .send({
      username: 'naosei@seila.com',
      password: 'm4di0c@@@@',
    })

    console.log(user)
    const response = await request(app).get("/").set('Authorization', 'bearer ' + token)

    expect(response.statusCode).toEqual(200);
  })
})