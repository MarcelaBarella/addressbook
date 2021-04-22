const database = require('../config/firebase');

const insertOnTable = async (values) => {
    console.log(values);
    return await database.ref('/contacts').push({
        first_name: values.first_value,
        last_name: values.last_name,
        phone_number: values.phone_number,
        address: values.address
    });
}

const query = async (values) => {
    return await database.ref('contacts/' + contactId).get()
}

module.exports = { query, insertOnTable }