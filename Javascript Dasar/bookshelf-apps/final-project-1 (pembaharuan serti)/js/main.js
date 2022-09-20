const bookShelf = [];
const RENDER_EVENT = "render-book";
const SUDAH_BACA = "sudah-baca";
const BELUM_BACA = "belum-baca";
const BOOK_STORAGE_KEY = "BOOK_APPS";

document.addEventListener("DOMContentLoaded", function () {
    const cariBuku = document.getElementById("searchBook");
    const submitBook = document.getElementById("inputBook");

    submitBook.addEventListener("submit", function (event) {
        event.preventDefault();
        addBook();
    });

    cariBuku.addEventListener("submit", function (event) {
        event.preventDefault();
        searchBuku();
    });

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});

function searchBuku() {
    const searchBook = document
        .getElementById("searchBookTitle")
        .value.toLowerCase();
    const bookList = document.querySelectorAll(".inner > h3");
    for (book of bookList) {
        if (book.innerText.toLowerCase().includes(searchBook)) {
            book.parentElement.parentElement.style.display = "flex";
        } else {
            book.parentElement.parentElement.style.display = "none";
        }
    }
}

function addBook() {
    const bookTitle = document.getElementById("inputBookTitle").value;
    const bookAuthor = document.getElementById("inputBookAuthor").value;
    const bookYear = document.getElementById("inputBookYear").value;
    const isComplete = document.getElementById("inputBookIsComplete").checked;
    const generateBookId = bikinId();
    const bookObject = membuatBookObject(
        generateBookId,
        bookTitle,
        bookAuthor,
        bookYear,
        isComplete
    );
    bookShelf.push(bookObject);

    document.dispatchEvent(new Event(RENDER_EVENT));
    alert("Buku ditambahkan!");
    saveData();
}

function membuatBookObject(id, judul, penulis, tahun, isComplete) {
    return {
        id,
        judul,
        penulis,
        tahun,
        isComplete,
    };
}

function bikinId() {
    return +new Date();
}

function createBookShelf(bookObject) {
    const bookJudul = document.createElement("h3");
    bookJudul.innerHTML = bookObject.judul;

    const bookPenulis = document.createElement("p");
    bookPenulis.innerHTML = `Author: ${bookObject.penulis}`;

    const bookTahun = document.createElement("p");
    bookTahun.innerHTML = `Tahun: ${bookObject.tahun}`;

    const divElement = document.createElement("div");
    divElement.classList.add("inner");

    divElement.append(bookJudul, bookPenulis, bookTahun);

    const container = document.createElement("div");
    container.classList.add("item", "shadow");

    container.setAttribute("id", `bookShelf-${bookObject.id}`);

    container.append(divElement);

    if (bookObject.isComplete) {
        const notyetButton = document.createElement("button");
        notyetButton.classList.add("undo-button");
        notyetButton.title = "Jadikan belum dibaca";

        notyetButton.addEventListener("click", function () {
            undoBookFromCompleted(bookObject.id);
        });

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("trash-button");
        deleteButton.title = "Hapus";

        deleteButton.addEventListener("click", function () {
            deleteBookFromCompleted(bookObject.id);
        });
        const divAction = document.createElement("div");
        divAction.classList.add("action");
        container.append(divAction);
        divAction.append(notyetButton, deleteButton);
    } else {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("trash-button");
        deleteButton.title = "Hapus";

        deleteButton.addEventListener("click", function () {
            deleteBookFromCompleted(bookObject.id);
        });

        const checkButton = document.createElement("button");
        checkButton.classList.add("check-button");
        checkButton.title = "Jadikan selesai dibaca";

        checkButton.addEventListener("click", function () {
            completeBookShelf(bookObject.id);
        });
        const divAction = document.createElement("div");
        divAction.classList.add("action");
        container.append(divAction);
        divAction.append(checkButton, deleteButton);
    }
    return container;
}

function completeBookShelf(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = true;
    document.dispatchEvent(new Event(RENDER_EVENT));
    document.dispatchEvent(new Event(SUDAH_BACA));
    saveData();
}

function findBook(bookId) {
    for (const bookItem of bookShelf) {
        if (bookItem.id === bookId) {
            return bookItem;
        }
    }
    return null;
}

function deleteBookFromCompleted(bookId) {
    swal({
        title: "Apakah kamu yakin?",
        text: "Jika dihapus, kamu tidak akan bisa mengembalikannya lagi!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
    }).then((willDelete) => {
        if (willDelete) {
            const bookTarget = findBookIndex(bookId);
            if (bookTarget === -1) return;
            bookShelf.splice(bookTarget, 1);
            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
            alert("Berhasil dihapus!", {
                icon: "success",
            });
        } else {
            alert("Buku tidak jadi dihapus!");
        }
    });
}

function undoBookFromCompleted(bookId) {
    const bookTarget = findBook(bookId);

    if (bookTarget == null) return;

    bookTarget.isComplete = false;
    document.dispatchEvent(new Event(RENDER_EVENT));
    document.dispatchEvent(new Event(BELUM_BACA));
    saveData();
}

function findBookIndex(bookId) {
    for (const index in bookShelf) {
        if (bookShelf[index].id === bookId) {
            return index;
        }
    }

    return -1;
}

function saveData() {
    if (isStorageExist()) {
        const parsed = JSON.stringify(bookShelf);
        localStorage.setItem(BOOK_STORAGE_KEY, parsed);
    }
}

function isStorageExist() {
    if (typeof Storage === undefined) {
        alert("Browser kamu tidak mendukung local storage");
        return false;
    }
    return true;
}

document.addEventListener(SUDAH_BACA, function () {
    alert("Buku selesai dibaca!");
});

document.addEventListener(BELUM_BACA, function () {
    alert("Buku belum dibaca!");
});

function loadDataFromStorage() {
    const serializedData = localStorage.getItem(BOOK_STORAGE_KEY);
    let data = JSON.parse(serializedData);

    if (data !== null) {
        for (const book of data) {
            bookShelf.push(book);
        }
    }

    document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompleteBookShelfList = document.getElementById(
        "incompleteBookShelfList"
    );
    uncompleteBookShelfList.innerHTML = "";

    const completeBookShelfList = document.getElementById(
        "completeBookShelfList"
    );
    completeBookShelfList.innerHTML = "";

    for (const bookItem of bookShelf) {
        const bookElement = createBookShelf(bookItem);

        if (!bookItem.isComplete) {
            uncompleteBookShelfList.append(bookElement);
        } else {
            completeBookShelfList.append(bookElement);
        }
    }
});

function alert(event) {
    swal({
        title: "Berhasil!",

        text: event,

        icon: "success",

        button: true,
    });
}
