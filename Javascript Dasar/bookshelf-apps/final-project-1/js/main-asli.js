const bookShelf = [];
const RENDER_EVENT = "render-book";
const SUDAH_BACA = "sudah-baca";
const BELUM_BACA = "belum-baca";
const BOOK_STORAGE_KEY = "BOOK_APPS";

// Awal web dimuat
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

// fungsi menambahkan
function addBook() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const isComplete = document.getElementById("inputBookIsComplete").checked;
  // menuju fungsi bikin ID
  const generateBookId = bikinId();
  // menuju fungsi membuat buku (array)
  const bookObject = membuatBookObject(
    generateBookId,
    bookTitle,
    bookAuthor,
    bookYear,
    isComplete
  );
  // memasukkan array ke dalam variable bookkShelf
  bookShelf.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  alert("Buku berhasil ditambahkan!");
  saveData();
}

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

// fungsi bikin id
function bikinId() {
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

  // container element
  const container = document.createElement("div");
  container.classList.add("item", "shadow");

  // memberi ID kepada setiap  element
  container.setAttribute("id", `bookShelf-${bookObject.id}`);

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
    // fungsi hapus buku
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("trash-button");
    // fungsi hapus buku
    deleteButton.addEventListener("click", function () {
      deleteBookFromCompleted(bookObject.id);
    });
    // memasukan button2 ke dalam container div

    const checkButton = document.createElement("button");
    checkButton.classList.add("check-button");

    checkButton.addEventListener("click", function () {
      completeBookShelf(bookObject.id);
    });

    container.append(checkButton, deleteButton);
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
  const confirm = window.confirm("Yakin ingin menghapus buku ?");

  if (confirm) {
    const bookTarget = findBookIndex(bookId);

    if (bookTarget === -1) return;

    bookShelf.splice(bookTarget, 1);
  } else {
    alert("Buku tidak jadi dihapus.");
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
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

function isStorageExist() /* boolean */ {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

document.addEventListener(SUDAH_BACA, function () {
  alert("Buku selesai dibaca!");
  console.log(localStorage.getItem(BOOK_STORAGE_KEY));
});

document.addEventListener(BELUM_BACA, function () {
  alert("Buku belum dibaca!");
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
