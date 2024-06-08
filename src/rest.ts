import { app } from "./";
const memory = new Set();
app.get("/test", (req: any, res: any) => {
  res.send({ success: true });
});

app.get("/add", (req: any, res: any) => {
  memory.add(count);
  count++;
  res.send({ success: true });
});

app.get("/get", (req: any, res: any) => {
  const mems = Array.from(memory);
  res.send({ success: mems });
});

let count = 0;

app.get("/test", (req: any, res: any) => {
  res.send({ success: true });
});

app.get("/add", (req: any, res: any) => {
  memory.add(count);
  count++;
  res.send({ success: true });
});

app.get("/get", (req: any, res: any) => {
  const mems = Array.from(memory);
  res.send({ success: mems });
});

const sleep = (delay: any) =>
  new Promise((resolve) => setTimeout(resolve, delay));

app.get("/timeout", async (req: any, res: any) => {
  await sleep(10000);
  res.send({ success: true });
});

app.get("/name", (req: any, res: any) => {
  res.send({ success: `Hi ${process.env.NAME}` });
});
