const fs = require("fs");
const { resolve } = require("path");

const fileReadCallback = (error, data) => {
    if (error) {
        console.log("gagal membaca berkas");
        return;
    }
    console.log(data);
};

// fs.readFile("notes.txt", "UTF-8", fileReadCallback);
const data = fs.readFileSync(
    resolve(__dirname, "notes.txt"),
    "utf-8",
    fileReadCallback
);
console.log(data);
