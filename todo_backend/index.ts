import express = require('express');
import cors = require('cors');
import {todoSchema} from "./schemas/todoSchema";
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const SERVER_PORT = process.env;
const startServer = async () => {
  const app = express();
  app.use(cors());
  const port = Number(SERVER_PORT) || 3001;

  app.use('/api', graphqlHTTP({
    schema: todoSchema,
    graphiql: true,
  }));

  app.listen(port, () => {
    console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
  });
};
startServer();