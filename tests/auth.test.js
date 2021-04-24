/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../app')
const dbHelper = require('./utils/sequelize')

beforeAll(async () => {
  await dbHelper.restartUsersTable()
})

afterAll(async () => {
  await dbHelper.closeConnection()
})

describe('The API on auth/register endpoint at POST method should', () => {
  afterEach(async () => {
    await dbHelper.resetUsers()
  })

  test('return 201 status and an auth JWT token after creating a new user', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'lulalivre@gmail.com',
      password: 'd3m0cr4cy'
    })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toMatchObject({
      token: expect.any(String)
    })
  })

  test('return 400 when the user payload is not valid', async () => {
    const response = await request(app).post('/auth/register').send({
      email: 'lulalivre@gmail.com',
      password: ''
    })

    expect(response.statusCode).toEqual(400)
    expect(response.body).toMatchObject({
      message: 'You must provide a valid email and password!'
    })
  })

  test.todo('return 400 if user already exists')
})

describe('The API on auth/login endpoint at POST method should', () => {
  beforeEach(async () => {
    await dbHelper.resetUsers()

    await dbHelper.createUser({
      email: 'bolsocida@gmail.com',
      password: 'antid3m0cr4cy'
    })
  })

  afterEach(async () => {
    await dbHelper.resetUsers()
  })

  test('return 200 status and an auth JWT token for the logged user', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'bolsocida@gmail.com',
      password: 'antid3m0cr4cy'
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toMatchObject({
      token: expect.any(String)
    })
  })

  test('return 404 status and a error message if the user does not exists', async () => {
    const response = await request(app).post('/auth/login').send({
      email: 'dontexists@gmail.com',
      password: 'antid3m0cr4cy'
    })

    expect(response.statusCode).toEqual(404)
    expect(response.body).toMatchObject({
      message: 'User Not Found!'
    })
  })

  test.todo(
    'return 401 status and a error message if the password is not valid'
  )
})
