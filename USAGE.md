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
curl -X POST \<change> /auth/login \
-d '{
    "email": "marcela.barella@hotmail.com",
    "password": "s@fep@assword123"
}'
```

** Response**
```
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
curl -X POST \<change> /auth/register \
-d '{
    "email": "marcela.barella@hotmail.com",
    "password": "s@fep@assword123"
}'
```

** Response**
```
```

This requests can only be made with a logged and authenticated user!

## List all contactec: GET - /contacts/
Endpoint to log on the application. The allowed parameters are:
| Attribute | Type | Description |
| --------- | -----| --------- |
| first_name | string | contact first name |
| first_last | string | contact first last |
| phone_number | string | contact phone number, with the desired formatting|
| address | string | contact address, with the desired formatting|

**Example of usage:**
**Request**
``` 
GEST /contacts/
```

**cURL**
```
curl -X GET \<change> /contacts
```

** Response**
```
```
