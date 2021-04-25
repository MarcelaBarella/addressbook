// Integretion tests for Contact scenarios
const request = require("supertest");
const app = require("../app");
const firebaseHelper = require('./utils/firebase');
const sequelizeHelper = require('./utils/sequelize');

beforeAll(async () => {
  await sequelizeHelper.restartUsersTable();
});

afterAll(async () => {
  await sequelizeHelper.closeConnection()
});

const createUserAndGetToken = async () => {
  const { body: { token }} = await request(app).post('/auth/register').send({
    email: 'naosei@seila.com',
    password: 'm4di0c@@@@'
  });

  return token;
}

describe('The API on contacts/ endpoint at POST method should', () => {
  afterEach(async () => {
    await sequelizeHelper.resetUsers();
    await firebaseHelper.restartContactsTable();
  })

  test('return 201 as status and the contact created in its body when called with a valid contact', async () => {
    const token = await createUserAndGetToken();
    const response = await request(app)
      .post("/contacts")
      .set('Authorization', `Bearer ${token}`)
      .send({
        first_name: 'Marcela',
        last_name: 'Barella',
        phone_number: '11995118191',
        address: 'Rua dos Crazy',
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body).toMatchObject({
      result: {
        first_name: 'Marcela',
        last_name: 'Barella',
        phone_number: '11995118191',
        address: 'Rua dos Crazy',
      }
    });
  });

  test('return 400 as status and a error message in its body when called with a invalid contact', async () => {
    const token = await createUserAndGetToken();
    const response = await request(app)
      .post("/contacts")
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Marcela',
        last_name: 'Barella',
        phone_number: '11995118191',
        address: 'Rua dos Crazy',
      });

    expect(response.statusCode).toEqual(400);
    expect(response.body).toMatchObject({ message: 'Please, send a valid Contact.' });
  });
})

describe('The API on contacts/ endpoint at GET method should', () => {
  beforeEach(async () => {
    await firebaseHelper.createContact({
      first_name: 'Geedy',
      last_name: 'Lee',
      phone_number: '1221',
      address: 'Lotus Land'
    })
    await firebaseHelper.createContact({
      first_name: 'Lady',
      last_name: 'Gaga',
      phone_number: '911',
      address: 'I wish to know'
    })
  })
  
  afterEach(async () => {
    await sequelizeHelper.resetUsers()
  })

  test('return 200 as status and a list with all contacts when called with valid parameters', async () => {
    const token = await createUserAndGetToken();
    const response = await request(app)
      .get("/contacts")
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });
});

describe('The API on contacts/:id endpoint at GET method should', () => {

  afterEach(async () => {
    await sequelizeHelper.resetUsers()
  })

  test('return 200 as status and the searched contact on its body when is called with correct id', async () => {
    const token = await createUserAndGetToken();
    const { key } = await firebaseHelper.createContact({
      first_name: 'Lara',
      last_name: 'Croft',
      phone_number: '1234567',
      address: 'Nice mansion'
    })

    const response = await request(app)
      .get(`/contacts/${key}`)
      .set('Authorization', `Bearer ${token}`);

    expect(response.statusCode).toEqual(200);
  });

  test('return 400 as status and error message on its body when called with incorrect id', async () => {
    const token = await createUserAndGetToken();

    const response = await request(app)
      .get(`/contacts/InExIsTeNtKeY`)
      .set('Authorization', `Bearer ${token}`);

    
    expect(response.statusCode).toEqual(404);
    expect(response.body).toMatchObject({ message: 'Could not found this contact.' });
  });
});

describe('The API on contacts/:id endpoint at PATCH method should', () => {
  afterEach(async () => {
    await sequelizeHelper.resetUsers()
  })

  test('return 200 as status and a message on its body when updated with correct arguments', async () => {
    const token = await createUserAndGetToken();
    const { key } = await firebaseHelper.createContact({
      first_name: 'Et',
      last_name: 'Bilu',
      phone_number: '1234567',
      address: 'Chapada diamantina'
    });

    const response = await request(app)
      .patch(`/contacts/${key}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        first_name: 'Sponge',
        last_name: 'Bob',
        phone_number: '1196753423',
        address: 'Bikini Slit',
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({ message: 'Contact successfully updated.' });
  });

  test('return 404 as status and a error message on its body when updated incorrect id', async () => {
    const token = await createUserAndGetToken();

    const response = await request(app)
      .patch('/contacts/banana')
      .set('Authorization', `Bearer ${token}`)
      .send({
        first_name: 'Sponge',
        last_name: 'Bob',
        phone_number: '1196753423',
        address: 'Bikini bottom',
      });

    expect(response.statusCode).toEqual(404);
    expect(response.body).toMatchObject({ message: 'Could not found this contact' });
  });
});

describe('The API on contacts/:id endpoint at DELETE method should', () => {
  afterEach(async () => {
    await sequelizeHelper.resetUsers()
  })

  test('return 200 as status and a message on its body when deleted with correct arguments', async () => {
    const token = await createUserAndGetToken();
    const { key } = await firebaseHelper.createContact({
      first_name: 'Et',
      last_name: 'Bilu',
      phone_number: '1234567',
      address: 'Chapada diamantina'
    });

    const response = await request(app)
      .delete(`/contacts/${key}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(200);
    expect(response.body).toMatchObject({ message: 'Contact successfully deleted' });
  });

  test('return 404 as status and a error message on its body when deleted incorrect id', async () => {
    const token = await createUserAndGetToken();
    const { key } = await firebaseHelper.createContact({
      first_name: 'Et',
      last_name: 'Bilu',
      phone_number: '1234567',
      address: 'Chapada diamantina'
    });

    const response = await request(app)
      .delete(`/contacts/${key}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toEqual(404);
    expect(response.body).toMatchObject({ message: 'Contact not found this contact' });
  });
});