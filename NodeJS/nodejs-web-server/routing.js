const http = require("http");

const requestListener = (request, response) => {
    const { method, url } = request;

    response.setHeader("Content-Type", "application/json");
    response.setHeader("X-Powered-By", "NodeJS");

    if (url === "/") {
        if (method === "GET") {
            response.statusCode = 200;
            response.end(
                JSON.stringify({
                    message: "Ini adalah homepage.",
                })
            );
        } else {
            response.statusCode = 400;
            response.end(
                JSON.stringify({
                    message: `Halaman tidak dapat diakses dengan ${method} method.`,
                })
            );
        }
    } else if (url === "/about") {
        if (method === "GET") {
            response.statusCode = 200;
            response.end(
                JSON.stringify({
                    message: "Ini adalah halaman about.",
                })
            );
        } else if (method === "POST") {
            let body = [];

            request.on("data", (chunk) => {
                body.push(chunk);
            });

            request.on("end", () => {
                body = Buffer.concat(body).toString();
                const { name } = JSON.parse(body);
                response.statusCode = 200;
                response.end(
                    JSON.stringify({
                        message: `Hello, ${name} ini adalah halaman about.`,
                    })
                );
            });
        } else {
            response.statusCode = 400;
            response.end(
                JSON.stringify({
                    message: `Halaman tidak dapat diakses dengan ${method} method.`,
                })
            );
        }
    } else {
        response.statusCode = 404;
        response.end(
            JSON.stringify({
                message: "Halaman tidak ditemukan.",
            })
        );
    }

    // response.statusCode = 200;
    // response.end("<h1>Hello HTTP Server!</h1>");
};

const server = http.createServer(requestListener);

const port = 5000;
const host = "localhost";

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});
