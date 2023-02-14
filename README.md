# TS Academy

A backend part of [TS Academy RS-clone](https://github.com/elian-cheng/rs-clone)

## Install instructions:

### Clone the repository:

```bash
1. git clone https://github.com/elian-cheng/rs-clone.git
2. cd rs-clone
3. git checkout server
```

### Initial setup:

(For the testing purpose `.env` file is already in the folder)

4. Create a file `.env` in the downloaded app folder
5. Write the necessary variables in this file:

```
PORT=<port to open app>
MONGO_CONNECTION_STRING=<your local or cloud mongodb address>
JWT_SECRET_KEY=<your secret key for JWT sign>
JWT_REFRESH_SECRET_KEY=<your secret key for JWT refresh sign>
```

### Install dependencies and run the app:

```bash
6. npm i
7. npm run start
```

## Used technologies

- Node Express
- Mongoose
- JWT Authentication

## Server requests:

- GET /lessons - get lessons list;
- GET /lessons/${id} - get lesson by it's ID;
- GET /lessons?theme=${theme} - get lessons by themes ${theme};
- GET /quiz - get quiz tests list;
- GET /quiz/${id} - get quiz test by it's ID;
- GET /quiz?difficulty=${difficulty} - get quiz tests by difficulty ${difficulty};
- GET /missing-type - get tasks list for the Missing Type game;
- GET /missing-type/${id} - get the task for the Missing Type game by it's ID;
- GET /users/${id}/tokens - get user's (ID) access token;
- POST /users - create(register) a user;
- POST /signin - login user;
- GET users/${userID}/statistics - get user's (ID) statistics;
- PUT users/${userID}/statistics - send (save) user's (ID) statistics to the server;

