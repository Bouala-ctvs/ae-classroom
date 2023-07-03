const http = require("http");
const app = require("./app");
const mongodb = require("./api/database/mongodb");

const server = http.createServer(app);
const port =  process.env.PORT || 7000;
console.log(port);
async function StartAPI() {
  await mongodb.connectDB();

  server.listen(port, () => {
    console.log(`Server running at ${port}`);
  });
}

StartAPI();
