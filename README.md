## RS Clone

Final group project at RS School (EPAM) for 3 people. Development time limit - 3 weeks.

This app is a TypeScript educational platform, where users can read lessons, pass the tests and play games, practice with algorithmical tasks and track their progress with statistics. [Task description](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/rsclone/rsclone.md)

## Deploy

https://elian-team-rsclone.netlify.app/

## Back-End server

https://github.com/elian-cheng/rs-clone/tree/server

## Developers:

- [Olga Chernega](https://github.com/elian-cheng)
- [Eugene Burkovskiy](https://github.com/eugeneburkovskiy)
- [Oleksandr Mazghin](https://github.com/ordinaraviro)

## Install instructions:

### Front-End:

```bash
1. git clone https://github.com/elian-cheng/rs-clone.git
2. cd rs-clone
3. git checkout develop
4. npm i
5. npm run start
```

### Back-End:

```bash
1. git clone https://github.com/elian-cheng/rs-clone.git
2. cd rs-clone
3. git checkout server
4. npm i
5. npm run start
```

### Server requests:

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

### Used technologies

- React
- React Router
- TypeScript
- React Ace (code editor)
- Chart JS
- @hello-pangea/dnd (Drag and Drop)
- SCSS
- Node Express
- Mongoose
- JWT Authentication
