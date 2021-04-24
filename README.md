## Table Of Contents

- [Architecture](#architecture)
- [Installation](#instalation)
- [Usage](#usage)
- [Running](#running)
- [Tests](#tests)
- [Improvements](#improvements)

## Architecture

This project is a `address book` service writted in `Node.js`.
This RESTful API allows a logged and authenticated user to:
- create a contact with address, first name, last name and phone number.
- get a list with all contacts.
- get a especific contact.
- change a contact informations.
- delete a contact.


In this solution was used:
- [Node.js](https://nodejs.org/en/) - 
- [Postgres](https://www.postgresql.org/) - An Open Source relational databse.
- [Firebase Realtime Database]() - 
- [Jest](https://jestjs.io/) - Javascript test framework that can be used with various frameworks.

## Usage
To see more details about how to use this API, please read the [USAGE](USAGE.md)

## Running
To run all the tests of the application and verify the coverage run the command `make tests`.



## Improvements
- Create a front-end stack for the project.
- Generating a UUID using sequelizer.
