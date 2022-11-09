import express from "express";
import { remultExpress } from "remult/remult-express";
import { Task } from "../shared/Task";

export const app = express();

app.use(remultExpress({
  entities: [Task]
}))
app.get('/hi', (req, res) => res.send("hi"))
if (!process.env['VITE'])
  app.listen(3002, () => console.log("Started"));
