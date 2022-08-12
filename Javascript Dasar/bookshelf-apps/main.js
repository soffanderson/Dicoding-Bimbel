const bookShelf = [];
const RENDER_EVENT = "render-book";

// Awal web dimuat
document.addEventListener("DOMContentLoaded", function () {
  const submitBook = document.getElementById("inputBook");
  submitBook.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

// fungsi membuat buku array
function membuatBookObject(id, judul, penulis, tahun, isComplete) {
  return {
    id,
    judul,
    penulis,
    tahun,
    isComplete,
  };
}

// fungsi menambahkan
function addBook() {
  const judulBuku = document.getElementById("inputBookTitle").value;
  const penulisBuku = document.getElementById("inputBookAuthor").value;
  const tahunBuku = document.getElementById("inputBookYear").value;
  const checkComplete = document.getElementById("inputBookIsComplete").checked;
  // menuju fungsi bikin ID
  const bookID = bikinID();
  // menuju fungsi membuat buku (array)
  const bookObject = membuatBookObject(
    bookID,
    judulBuku,
    penulisBuku,
    tahunBuku,
    checkComplete
  );
  // memasukkan array ke dalam variable bookkShelf
  bookShelf.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

// fungsi bikin id
function bikinID() {
  return +new Date();
}

// fungsi membuat yang telah diinput
function createBookShelf(bookObject) {
  const bookJudul = document.createElement("h3");
  bookJudul.innerHTML = bookObject.judul;

  const bookPenulis = document.createElement("p");
  bookPenulis.innerHTML = `Author: ${bookObject.penulis}`;

  const bookTahun = document.createElement("p");
  bookTahun.innerHTML = `Tahun: ${bookObject.tahun}`;

  // membuat pembungkus (div) untuk buku, penulis, dan tahun
  const divElement = document.createElement("div");
  divElement.classList.add("inner");

  // memasukan elemen ke document
  divElement.append(bookJudul, bookPenulis, bookTahun);

  // memberi ID kepada setiap  element
  container.setAttribute("id", `bookShelf-${bookObject.id}`);

  // container element
  const container = document.createElement("div");
  container.classList.add("item", "shadow");

  container.append(divElement);

  if (bookObject.isComplete) {
    // fungsi belum selesai
    const notyetButton = document.createElement("button");
    notyetButton.classList.add("undo-button");

    notyetButton.addEventListener("click", function () {
      undoBookFromCompleted(bookObject.id);
    });

    // fungsi hapus buku
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("trash-button");
    // fungsi hapus buku
    deleteButton.addEventListener("click", function () {
      deleteBookFromCompleted(bookObject.id);
    });
    // memasukan button2 ke dalam container div
    container.append(notyetButton, deleteButton);
  } else {
    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      completeBookshelf(bookObject.id);
    });

    container.append(checkButton);
  }
  return container;
}

function completeBookshelf(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.isComplete = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
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
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  bookShelf.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function undoBookFromCompleted(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.checkComplete = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
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
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

const SAVED_EVENT = "saved-book";
const BOOK_STORAGE_KEY = "TODO_APPS";

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SAVED_EVENT, function () {
  alert("Buku Berhasil di Simpan!");
  console.log(localStorage.getItem(BOOK_STORAGE_KEY));
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

// fungsi menampilkan log di console
document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookShelfList = document.getElementById(
    "incompleteBookShelfList"
  );
  incompleteBookShelfList.innerHTML = "";

  const completeBookShelfList = document.getElementById(
    "completeBookShelfList"
  );
  completeBookShelfList.innerHTML = "";

  for (const bookItem of bookShelf) {
    const bookElement = createBookShelf(bookItem);

    if (!bookItem.isComplete) {
      incompleteBookShelfList.append(bookElement);
    } else {
      completeBookShelfList.append(bookElement);
    }
  }
});
