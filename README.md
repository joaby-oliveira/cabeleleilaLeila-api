# Cabeleleila Leila's API

## Technologies used in this project

     - JWT
     - Bcrypt
     - Async/Await
     - Sequelize
     - Express
     - PostgreSQL
     - Husky

## To run this API you should install some dependencies
### Install project libraries

> `npm i`

### Create environment variables
> Create a .env file in the project's root, put in there your information to the server can run, there's already a .env.sample with the content to be filled

> In DB_DIALECT you can put the name of the database you are using, like MySQL or PostgreSQL
 
> In JWT_SECRET you can create a secret to serve the jwt library

### Maybe you should change the port where the server is running

*Note that you need to have a database running in your machine*

## API's Routes

   *this project uses JWT authentication, so you will need to get a token access by loggin in an user*

### Schedules
> `get` schedules/
>  `get` schedules/:id
>  
> `post` schedules/
 
*json sending example*

    {
    	"date": "2021-07-1",
    	"service": "Progressiva",
    	"startingTime": "0:5",
    	"endingTime": "07:30",
    	"clientId": 1
    }

> `put` schedules/:id

*json sending example*

    {
    	"date": "2021-07-1",
    	"service": "Progressiva",
    	"startingTime": "0:5",
    	"endingTime": "07:30",
    	"clientId": 1
    }

> `delete` schedules/:id

### Clients
> `get` client/
>  `get` client/:id
>  
> `post` client/
> 
*json sending example*
    
    {
    	"name": "joao oliveira",
    	"cellphoneNumber": "14999999999",
    	"email": "joao2@email.com",
    	"password": "joao"
    }

> `post` client/auth

*json sending example*

    {
    	"email": "joao2@email.com",
    	"password": "joao"
    }

