// GLOBAL VARIABLES //
let form = document.querySelector('.sidebar form');
let bookContainer = document.querySelector('.book-container');


//Store Book Objects in an Array
const myLibrary = [];


// FUNCTIONS //

class Book {
  constructor(title, author, pages, isRead){
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }

  info(){
    let readStatus = this.isRead ? 'Read' : 'Not Read Yet'
    return `${this.title} by ${this.author}, ${this.pages} pages, ${readStatus}.`;
  }

  toggleReadStatus(){
    this.isRead = !this.isRead;
  }
}

// Function creates a book and then stores it in library.

function addBookToLibrary(title, author, pages, isRead){
  //Create book object
  const book = new Book(title, author, pages, isRead);
  //Store the book in the library array
  myLibrary.push(book);
}

// Clears Book Container Content

function clearBookContainer(){
  // Grab the book container
  const bookContainer = document.querySelector('.book-container');
  // Grab all the children that have the .book-card class
  const bookCards = bookContainer.querySelectorAll('.book-card');
  // Safely remove them from the book-container element
  bookCards.forEach(card => card.remove());
}

// Creates Book Card

function createBookCard(book){
  // 1. Create Outer Structure
  let bookCard = document.createElement('div');
  bookCard.classList.add('book-card');
  bookCard.dataset.id = book.id;

  // 2. Create .book-card-content
  let bookCardContent = document.createElement('div');
  bookCardContent.classList.add('book-card-content');

  // 3. Create the .text section
  let textSection = document.createElement('div');
  textSection.classList.add('text-section');

    // Inside text section...

    let bookTitle = document.createElement('h3');
    bookTitle.classList.add('book-title');
    bookTitle.innerHTML = `${book.title}`;

    let bookDetails = document.createElement('div');
    bookDetails.classList.add('book-details');

    let author = document.createElement('p');
    author.innerHTML = `Author: ${book.author}`
    let amountOfPages = document.createElement('p');
    amountOfPages.innerHTML = `Number Of Pages: ${book.pages}`
    let isRead = document.createElement('p');
    let isReadStatus = book.isRead ? 'Read' : 'Not Read Yet';
    isRead.innerHTML = isReadStatus;

    bookDetails.append(author, amountOfPages, isRead);

    // 4. Create card buttons container

    let cardButtons = document.createElement('div');
    cardButtons.classList.add('card-btns');

    let removeButton = document.createElement('button');
    removeButton.classList.add('btn', 'remove-btn');
    removeButton.innerHTML = 'Remove';

    let markAsReadButton = document.createElement('button');
    markAsReadButton.classList.add('btn', 'toggle-read-btn');
    markAsReadButton.innerHTML = book.isRead ? 'Mark As Unread' : 'Mark As Read';

    cardButtons.append(removeButton, markAsReadButton);

  textSection.append(bookTitle, bookDetails, cardButtons);

  // 5. Create Book img div
  let bookImageDiv = document.createElement('div');
  bookImageDiv.classList.add('book-image');
  
  let bookImage = document.createElement('img');
  bookImage.src = 'assets/book-cover-placeholder.png';
  bookImage.alt = 'Book Cover Image';

  bookImageDiv.append(bookImage);


  bookCardContent.append(textSection, bookImageDiv);
  bookCard.append(bookCardContent);

  return bookCard;
}

// Render Books

function renderBooks(){

  // Target Book Container
  let bookContainer = document.querySelector('.book-container');
  let emptyState = document.querySelector('.empty-state');
  

  // Clear the book container
  clearBookContainer();

  // Show/Hide empty state message depending on whether library has books
  if(myLibrary.length === 0){
    emptyState.classList.remove('hidden');
    //Since there's no books, best to return early
    return;
  } else {
    emptyState.classList.add('hidden');
  }

  //Loop through myLibrary
  for(const book of myLibrary){
    // For each book, call the createBookCard function
    let completedBookCard = createBookCard(book);
    // Append into book container
    bookContainer.append(completedBookCard);
  }
}


// EVENT LISTENERS // 

// Form Submission Logic

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Grab each input value
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let isRead = document.getElementById('isRead').checked;

  // Pass in input values to addBookToLibrary function
  addBookToLibrary(title, author, pages, isRead);

  //Render Book onto page
  renderBooks();

  //Reset the Form
  form.reset();
});

// Central Container for Remove/Mark As Read logic.

bookContainer.addEventListener('click', (e) => {

  // Did the event occur on the remove button?
  if(e.target.classList.contains('remove-btn')){
    // Find the closest .book-card ancestor that the click event occurs in;
    let bookCard = e.target.closest('.book-card');

    // Extract the data id attribute value from the book card
    let bookId = bookCard.dataset.id;

    // Find the book in the library
    let indexOfBook = myLibrary.findIndex((element) => {
    return element.id === bookId;
    });

    if (indexOfBook !== -1) {
    myLibrary.splice(indexOfBook, 1);
    renderBooks();
    }
  } 
  // If not did the event occur on the mark as read button?
  else if(e.target.classList.contains('toggle-read-btn')){
    // Find the closest .book-card ancestor that the click event occurs in;
    let bookCard = e.target.closest('.book-card');

    // Extract the data id attribute value from the book card
    let bookId = bookCard.dataset.id;

    // Find the book in the myLibrary array using the id.
    let book = myLibrary.find((element) => {
      return element.id === bookId;
    })

    // In case a book isn't found.
    if (!book) return;

    //Flip the isRead property
    book.toggleReadStatus();

    //Rerender the book container
    renderBooks();
  }

});

document.addEventListener('DOMContentLoaded', () => {
  renderBooks();
});