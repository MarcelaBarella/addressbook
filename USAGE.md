# API Adress book
All the responses of this API will be served on the JSON format


## Register: POST - /auth/register
Endpoint to log on the application. The allowed parameters are:
| Attribute | Type | Description |
| --------- | -----| --------- |
| email | string | e-mail with valid format |
| password| string | the desired password |

**Example of usage:**

**Request**
``` 
POST /auth/login
{
    "email": "marcela.barella@hotmail.com",
    "password": "s@fep@assword123"
}
```

**cURL**
```
curl -X POST \ <host>/auth/login \
-H 'Content-Type: application/json' \
-d '{
    "email": "marcela.barella@hotmail.com",
    "password": "s@fep@assword123"
}'
```

**Response**
```
Status Code: 200
```

```
{ 'token': <ACCESS_TOKEN> }
```


## Login: POST - /auth/login
Endpoint to log on the application. The allowed parameters are:
| Attribute | Type | Description |
| --------- | -----| --------- |
| email | string | e-mail with valid format |
| password| string | the correct password of the user |

**Example of usage:**
**Request**
``` 
POST /auth/register
{
    "email": "marcela.barella@hotmail.com",
    "password": "s@fep@assword123"
}
```

**cURL**
```
curl -X POST <host>/auth/register \
-H 'Content-Type: application/json' \
-d '{
    "email": "marcela.barella@hotmail.com",
    "password": "s@fep@assword123"
}'
```

**Response**
```
Status Code: 200
```

```
{ 'token': <ACCESS_TOKEN> }
```

### This requests can only be made with a logged and authenticated user!

## List all contacts: GET - /contacts/
Endpoint to get all the user contacts.

**Example of usage:**
**Request**
``` 
GET /contacts/
```

**cURL**
```
curl -H "Authorization: Bearer <ACCESS_TOKEN>" -X GET \ <HOST>/contacts
```

** Response**
```
Status Code: 200
```

## Get a given contact: GET - /contacts/<contact_id>
Endpoint to get a contact by its id.

**Example of usage:**

**Request**
``` 
GET /contacts/id
```

**cURL**
```
curl -H "Authorization: Bearer <ACCESS_TOKEN>" -X GET \<change> /contacts/id
```

**Response**
```
Status Code: 200
```
```
{
    first_name: "Marcela",
    last_name: "Barella",
    phone_number: "+55 11 963534656",
    address: "São Paulo - Brasil",
}
```

## Create a contact: POST - /contacts/create
Endpoint to get a contact by its id. The allowed parameters are:
| Attribute | Type | Description |
| --------- | -----| --------- |
| first_name | string | contact first name |
| first_last | string | contact first last |
| phone_number | string | contact phone number, with the desired formatting|
| address | string | contact address, with the desired formatting|

**Example of usage:**

**Request**
``` 
POST /contacts/create
{
    "first_name": "Marcela",
    "last_name": "Barella",
    "phone_number": "+55 11 963534656",
    "address": "São Paulo - Brasil"
}
```

**cURL**
```
curl -H "Authorization: Bearer <ACCESS_TOKEN>"
    -X POST \
  <host>/contacts/create \
  -H 'Content-Type: application/json' \
  -d '{
    "first_name": "Marcela",
    "last_name": "Barella",
    "phone_number": "+55 11 963534656",
    "address": "São Paulo - Brasil"
}'
```

**Response**
```
Status Code: 201
```
```
{
    first_name: "Marcela",
    last_name: "Barella",
    phone_number: "+55 11 963534656",
    address: "São Paulo - Brasil",
}
```

## Delete a contact: DELETE - /contacts/delete
Endpoint to get a contact by its id.

**Example of usage:**

**Request**
``` 
DELETE /contacts/delete/
```

**cURL**
```
curl -H "Authorization: Bearer <ACCESS_TOKEN>"
curl -X DELETE \
  <host>/contacts/delete/<id>
```

**Response**
```
Status Code: 200
```
```
{ message: 'Contact successfully deleted' }
```

## Update a contact: PATCH - /contacts/update/<contact_id>
Endpoint to update a contact. The allowed parameters are:
| Attribute | Type | Description |
| --------- | -----| --------- |
| first_name | string | contact first name |
| first_last | string | contact first last |
| phone_number | string | contact phone number, with the desired formatting|
| address | string | contact address, with the desired formatting|

**Example of usage:**

**Request**
``` 
PATCH /contacts/update/<id>
{
    "first_name": "Marcela",
    "last_name": "Barella",
    "phone_number": "+55 11 963534656",
    "address": "São Paulo - Brasil"
}
```

**cURL**
```
curl -H "Authorization: Bearer <ACCESS_TOKEN>"
    -X PUT \
  <host>/contacts/update/<id> \
  -H 'Content-Type: application/json' \
  -d '{ \
    "first_name": "Marcela",
    "last_name": "Barella",
    "phone_number": "+55 11 963534656",
    "address": "São Paulo - Brasil"
}'
```

**Response**
```
Status Code: 200
```
```
{ message: 'Contact successfully updated' }
```
