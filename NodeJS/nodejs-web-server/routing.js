const http = require("http");

const requestListener = (request, response) => {
    const { method, url } = request;

    if (url === "/") {
        if (method === "GET") {
            response.end("Ini adalah homepage.");
        } else {
            response.end(
                `Halaman tidak dapat diakses dengan ${method} method.`
            );
        }
    } else if (url === "/about") {
        if (method === "GET") {
            response.end("Ini adalah halaman about.");
        } else if (method === "POST") {
            let body = [];

            request.on("data", (chunk) => {
                body.push(chunk);
            });

            request.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.end(
                    `<h1>Hello, ${name} ini adalah halaman about.</h1>`
                );
            });
        } else {
            response.end(
                `Halaman tidak dapat diakses dengan ${method} method.`
            );
        }
    } else {
        response.end("<h1>Halaman tidak ditemukan!</h1>");
    }

    response.setHeader("Content-Type", "text/html");
    response.statusCode = 200;
    // response.end("<h1>Hello HTTP Server!</h1>");
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
