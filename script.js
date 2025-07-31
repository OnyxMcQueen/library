//Store Book Objects in an Array
const myLibrary = [];

// Constructor Function to create Book objects
function Book(title, author, pages, isRead){
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

// Put info function on Book instance prototype object.
Book.prototype.info = function () {
  let readStatus = this.isRead ? 'Read' : 'Not Read Yet'
  return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}.`;
};

// Function creates a book and then stores it in library.

function addBookToLibrary(title, author, pages, isRead){
  //Create book object
  const book = new Book(title, author, pages, isRead);
  //Store the book in the library array
  myLibrary.push(book);
}

// Clears Book Container Content

function clearBookContainer(){
  // Target the Book Container
  let bookContainer = document.querySelector('.book-container');

  // Clear it's content
  bookContainer.innerHTML = '';
}