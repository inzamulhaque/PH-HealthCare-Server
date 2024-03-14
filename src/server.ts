import { Server } from "http";
import app from "./app";

const port = 7000;

async function main() {
  const server: Server = app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}

main();
