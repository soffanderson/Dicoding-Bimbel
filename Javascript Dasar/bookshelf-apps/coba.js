const bookList = [];
const RENDER_EVENT = "render-book";
const SAVED_EVENT = "saved-book";
const BOOK_KEY = "BOOKSHELF_APPS";

function bookId() {
  return +new Date();
}

function generateBookObject(id, title, author, year, isComplete) {
  return {
    id,
    title,
    author,
    year,
    isComplete,
  };
}

function addBook() {
  const bookTitle = document.getElementById("inputBookTitle").value;
  const bookAuthor = document.getElementById("inputBookAuthor").value;
  const bookYear = document.getElementById("inputBookYear").value;
  const bookCheck = document.getElementById("inputBookIsComplete").checked;

  const generateBookId = bookId();
  const bookObject = generateBookObject(
    generateBookId,
    bookTitle,
    bookAuthor,
    bookYear,
    bookCheck
  );
  bookList.push(bookObject);

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

function findBook(bookId) {
  for (const bookItem of bookList) {
    if (bookItem.id === bookId) {
      return bookItem;
    }
  }
  return null;
}

function findBookIndex(bookId) {
  for (const index in bookList) {
    if (bookList[index].id === bookId) {
      return index;
    }
  }
  return -1;
}

function bookShelf(bookObject) {
  const bookTitle = document.createElement("h3");
  bookTitle.innerText = bookObject.title;

  const bookAuthor = document.createElement("p");
  bookAuthor.innerText = "Penulis: " + bookObject.author;

  const bookYear = document.createElement("p");
  bookYear.innerText = "Tahun: " + bookObject.year;

  const container = document.createElement("article");
  container.classList.add("book_item");

  const bookButton = document.createElement("div");
  bookButton.classList.add("green", "red", "action");

  container.append(bookTitle, bookAuthor, bookYear);
  container.append(bookButton);
  container.setAttribute("id", `bookList-${bookObject.id}`);

  if (bookObject.isComplete) {
    const incompleteButton = document.createElement("button");
    incompleteButton.classList.add("green");
    incompleteButton.innerText = "Belum Selesai dibaca";

    incompleteButton.addEventListener("click", function () {
      incompleteBookshelf(bookObject.id);
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("red");
    removeButton.innerText = "Hapus buku";

    removeButton.addEventListener("click", function () {
      removeBookshelf(bookObject.id);
    });

    bookButton.append(incompleteButton, removeButton);
  } else {
    const completeButton = document.createElement("button");
    completeButton.classList.add("green");
    completeButton.innerText = "Selesai dibaca";

    completeButton.addEventListener("click", function () {
      completeBookshelf(bookObject.id);
    });

    const removeButton = document.createElement("button");
    removeButton.classList.add("red");
    removeButton.innerText = "Hapus buku";

    removeButton.addEventListener("click", function () {
      removeBookshelf(bookObject.id);
    });

    bookButton.append(completeButton, removeButton);
  }

  return container;
}

function completeBookshelf(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.bookCheck = true;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

function removeBookshelf(bookId) {
  const bookTarget = findBookIndex(bookId);

  if (bookTarget === -1) return;

  bookList.splice(bookTarget, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

function incompleteBookshelf(bookId) {
  const bookTarget = findBook(bookId);

  if (bookTarget == null) return;

  bookTarget.bookCheck = false;
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveBook();
}

function saveBook() {
  if (isStorageExist()) {
    const parsed = JSON.stringify(bookList);
    localStorage.setItem(BOOK_KEY, parsed);
    document.dispatchEvent(new Event(SAVED_EVENT));
  }
}

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Browser kamu tidak mendukung local storage");
    return false;
  }
  return true;
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(BOOK_KEY);
  let data = JSON.parse(serializedData);

  if (data !== null) {
    for (const book of data) {
      bookList.push(book);
    }
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});

document.addEventListener(RENDER_EVENT, function () {
  const incompleteBookshelfList = document.getElementById(
    "incompleteBookshelfList"
  );
  incompleteBookshelfList.innerHTML = "";

  const completeBookshelfList = document.getElementById(
    "completeBookshelfList"
  );
  completeBookshelfList.innerHTML = "";

  for (const bookItem of bookList) {
    const bookElement = bookShelf(bookItem);

    if (!bookItem.isComplete) {
      incompleteBookshelfList.append(bookElement);
    } else {
      completeBookshelfList.append(bookElement);
    }
  }
});

document.addEventListener(SAVED_EVENT, function () {
  console.log(localStorage.getItem(BOOK_KEY));
});
