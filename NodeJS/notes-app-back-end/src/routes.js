const {
    addNoteHandler,
    getAllNotesHandler,
    getNoteByIdHandler,
} = require("./handler");

const router = [
    {
        method: "POST",
        path: "/notes",
        handler: addNoteHandler,
    },
    {
        method: "GET",
        path: "/notes",
        handler: getAllNotesHandler,
    },
    {
        method: "GET",
        path: "/notes/{id}",
        handler: getNoteByIdHandler,
    },
];

module.exports = router;
