# Todo list web application
The simple todo list typescript application.
## Project structure
There are 2 main folders **todo_frontend** and **todo_backend** with parts of project that should be run separately.
## Technological stack
- React
- Typescript
- Eslint + prettier
- Material UI
- Graphql
- Node + Express
## How to run
### Prerequisites
Node version 15 or higher
### Frontend
-  run command ``npm install`` in **todo_frontend** folder for installing dependencies
- run comand ``npm run start`` in **todo_frontend** folder starts React web client on `http://localhost:3000/`
### Backend
- run command ``npm install`` in **todo_backend** folder for installing dependencies
- run command ``npm run dev`` in **todo_backend** folder starts server in dev mode on `http://localhost:3001` or on port from environment variable
Also there is possibility to make production build for client and server with command - ``npm run build``