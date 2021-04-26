# Address book
Simple API to manage a list of contacts.

## Table Of Contents
- [Installation](#instalation)
- [Usage](#usage)
- [Running](#running)
- [Tests](#tests)
- [Architecture](#architecture)
- [Improvements](#improvements)

## Architecture

This project is a `address book` service writted in `Node.js`, with allows a logged user to::
- create a contact with address, first name, last name and phone number.
- get a list with all contacts.
- get a especific contact.
- change a contact informations.
- delete a contact.
The flow of use for this application consists on register a user using an `email` and a `password`, after that, you must
take your generated token and use it to access your list of contacts. You can perform the actions previously mentioned on the paragraph above to manage your contacts.

In this solution was used:
- [Node.js](https://nodejs.org/en/) - 
- [Postgres](https://www.postgresql.org/) - An Open Source relational databse.
- [Firebase Realtime Database](https://firebase.google.com/products/realtime-database?gclid=CjwKCAjwg4-EBhBwEiwAzYAlsuHrcum0tiVQDbJDYbc6ZmYNhftZbVaQ3sT8S1jB87hHsIRGBWCj_RoCssEQAvD_BwE&gclsrc=aw.ds) - 
- [Jest](https://jestjs.io/) - Javascript test framework that can be used with various frameworks.

## Usage
To see more details about how to use this API, please read the [USAGE](USAGE.md)

## Running
To use this application on your computer you must install [docker](https://www.docker.com/), please refer to it official documentation to install it.
You also need to create and configure you `.env.development` and `.env.test` following the `.env.example` to set your environment with the variables values for this enviroments and if you want to deploy this application in some other place you have to configure your `env.production` to.
When you have docker installed and your variables set up, then you can build this application typing the following in your computer terminal:
```
docker-compose up --build
```
After up and building the application use te following command to sync the models with the database:
```
syncDB
```

## Tests
To run this application tests you can type the following command on your terminal:
```
NODE_ENV=test; jest tests/ --watch
```

## Improvements
- Create user interface for the project.
- Generating a UUID using sequelizer.
- Use offline mode on firebase for testing or create a project test to avoid conflict between production data and test data.
- Improve register validation with more complex validations to email and password.

