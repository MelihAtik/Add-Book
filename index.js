const form = document.querySelector(".form");
const bookList = document.querySelector("#bookList");

const books = JSON.parse(localStorage.getItem("books")) || [];


function renderBooks() {
  bookList.innerHTML = ""; 

    books.forEach((book, index) => {
    const newRow = document.createElement("tr");

    const newTitle = document.createElement("td");
    const newAuthor = document.createElement("td");
    const newIsbn = document.createElement("td");
    const deleteIcon = document.createElement("td");

    newTitle.textContent = book.title;
    newAuthor.textContent = book.author;
    newIsbn.textContent = book.isbn;
    deleteIcon.textContent = "X";
    deleteIcon.addEventListener("click", () => deleteBook(index));

    newRow.appendChild(newTitle);
    newRow.appendChild(newAuthor);
    newRow.appendChild(newIsbn);
    newRow.appendChild(deleteIcon);

    bookList.appendChild(newRow);
  });
}

function addBook(e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const isbn = document.getElementById("isbn").value;

  if (title === "" || author === "" || isbn === "") {
    alertFunc("unsuccessful");
  } else {
    const newBook = { title, author, isbn };
    books.push(newBook);
    localStorage.setItem("books", JSON.stringify(books));
    renderBooks();
    clear();
    alertFunc("successful");
  }
}


function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
  alertFunc("delete");
}


function clear() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("isbn").value = "";
}

function alertFunc(type) {
  const alertDiv = document.getElementById("alert");
  const alert = document.createElement("p");

  if (type === "successful") {
    alert.textContent = "Book Added Successfully";
  } else if (type === "delete") {
    alert.textContent = "Book Deleted";
  } else {
    alert.textContent = "Please fill in all fields";
  }

  if (type === "unsuccessful") {
    alert.setAttribute("class", "alertMessage-unsuccessful");
  } else if (type === "delete") {
    alert.setAttribute("class", "alertMessage-delete");
  } else {
    alert.setAttribute("class", "alertMessage-successful");
  }

  alertDiv.appendChild(alert);
  setTimeout(function () {
    alertDiv.removeChild(alert);
  }, 2000);
}


renderBooks();


form.addEventListener("submit", addBook);
