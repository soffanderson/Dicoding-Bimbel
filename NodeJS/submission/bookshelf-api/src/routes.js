const { addBookHandler, getAllBooksHandler } = require("./handler");

const router = [
    {
        method: "POST",
        path: "/books",
        handler: addBookHandler,
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBooksHandler,
    },
    // {
    //     method: "GET",
    //     path: "/notes/{id}",
    // },
    // {
    //     method: "PUT",
    //     path: "/notes/{id}",
    // },
    // {
    //     method: "DELETE",
    //     path: "/notes/{id}",
    // },
];

module.exports = router;
