REST API with Express.js & Sequelize

## API Testing (Postman)

- Import collection dari folder `/postman/backend-test-concise.postman_collection.json`
- Use environment variables according to this project's `.env`
- Run the API with `npm run dev` then test the endpoint in Postman

## DB configuration (.env)

- DB_HOST=db-host
- DB_PORT=db-port
- DB_NAME=db-name
- DB_USER=db-user
- DB_PASSWORD=db-pass
- DB_DIALECT=db-dialect


## file config/config.json for Sequelize CLI

```json
{
  "development": {
    "username": "db-user",
    "password": "db-pass",
    "database": "db-name",
    "host": "db-host",
    "port": db-port,
    "dialect": "postgres"
  },
  "test": {
    "username": "db-user",
    "password": "db-pass",
    "database": "db-name_test",
    "host": "db-host",
    "port": db-port,
    "dialect": "postgres"
  },
  "production": {
    "username": "db-user",
    "password": "db-pass",
    "database": "db-name_prod",
    "host": "db-host",
    "port": db-port,
    "dialect": "postgres"
  }
}
```

## create new migration

npx sequelize-cli migration:generate --name models-name

## migrations

npx sequelize-cli db:migrate

## API USERS

- POST /users -> Create user
- PUT /users/:id -> Update user
- DELETE /users/:id -> Delete user
- GET /users -> Get all users
- GET /users/:id -> Get user by id (include groups & task)
- GET /users/:id/groups -> Get user by id with their groups
- GET /user/:id/tasks -> Get user by id with their tasks

## API GROUPS

- POST /groups -> Create group
- PUT /groups/:id -> Update group
- DELETE /groups/:id -> Delete group
- GET /groups -> Get all Groups
- GET /groups/:id -> Get group by id
- GET /groups/:id/users -> Get group by id with their users
- POST /groups/:id/users/:id -> Add user to group by id

## API TASK

- POST /tasks -> Create task
- PUT /tasks/:id -> Update task
- DELETE /tasks/:id -> Delete task
- GET /tasks -> Get all tasks
- GET /tasks/:id -> Get tasks by id
