import express = require("express");
import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";

const app = express();

app.use(remultExpress({
  entities: [Task]
}))

import('vite').then(async ({ createServer }) => {
  const viteDevServer = await createServer({
    server: {
      middlewareMode: true
    }
  });
  app.use(viteDevServer.middlewares)
  app.listen(3002, () => console.log("Started"));
})
