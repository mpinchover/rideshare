const express = require("express");
export const app = express();
export const server = require("http").createServer(app);
export const io = require("socket.io")(server);

import "./rest";
import "./event-handler";

// @ts-ignore
const PORT = parseInt(process.env.PORT) || 8080;

server.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});
