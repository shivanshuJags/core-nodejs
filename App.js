const http = require("http");
const routes = require("./Routes");
const server = http.createServer(routes.requestHandler);

server.listen(3000);
