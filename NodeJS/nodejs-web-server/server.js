const http = require("http");

const requestListener = (request, response) => {
    const { method } = request;

    if (method === "GET") {
        response.end("Hello from GET!");
    }
    if (method === "POST") {
        response.end("Hello from POST!");
    }
    if (method === "PUT") {
        response.end("Hello from PUT!");
    }
    if (method === "DELETE") {
        response.end("Hello from DELETE!");
    }

    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    response.end("<h1>Hello HTTP Server!</h1>");
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
