// Import necessary modules
const express = require('express');

// Import database of books and authentication functions
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;

// Create a router instance for public user routes
const public_users = express.Router();

// Route: Register a new user
public_users.post('/register', (req, res) => {
  const { username, password } = req.body

  if (!username || !password) {
    return res.status(400).json({ message: 'Invalid username or password' })
  }
  if (users.includes(username)) {
    return res.status(400).json({ message: 'User already exists' })
  } else {
    users.push({ username, password })
    return res.status(200).json({ message: 'User registered successfully' })
  }
})

// Route: Get the list of available books
public_users.get('/', function (req, res) {
  // Retrieve the list of available books from the database or any other source
  const availableBooks = Object.values(books);

  // Check if there are available books
  if (availableBooks.length === 0) {
    return res.status(404).json({ message: "No books available" });
  }

  // If books are available, send them as a response
  return res.status(200).json(availableBooks);
});

// Route: Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  // Extract ISBN from request parameters
  const isbn = req.params.isbn;

  // Retrieve the list of available books from the database or any other source
  const availableBooks = Object.values(books);

  // Implement logic to fetch and return book details for the specified ISBN
  const book = availableBooks[isbn];

  if (book) {
    return res.status(200).json(book);
  } else {
    return res.status(404).json({ message: "Book not found" });
  }
});

// Route: Get book details based on author
public_users.get('/author/:author', function (req, res) {
  // Extract author from request parameters
  const author = req.params.author;

  // Retrieve the list of available books from the database or any other source
  const availableBooks = Object.values(books);

  // Implement logic to fetch and return book details for the specified author
  const booksByAuthor = availableBooks.filter(book => book['author'] == author);

  if (booksByAuthor.length) {
    return res.status(200).json(booksByAuthor);
  } else {
    return res.status(404).json({ message: "Books by this author not found" });
  }
});

// Route: Get all books based on title
public_users.get('/title/:title', function (req, res) {
  // Extract title from request parameters
  const title = req.params.title;

  // Retrieve the list of available books from the database or any other source
  const availableBooks = Object.values(books);

  // Implement logic to fetch and return book details for the specified title
  const booksWithTitle = availableBooks.filter(book => book['title'] == title);

  if (booksWithTitle.length > 0) {
    return res.status(200).json(booksWithTitle);
  } else {
    return res.status(404).json({ message: "Books with this title not found" });
  }
});

// Route: Get book review
public_users.get('/review/:isbn', function (req, res) {
  // Extract ISBN from request parameters
  const isbn = req.params.isbn;

  // Retrieve the list of available books from the database or any other source
  const availableBooks = Object.values(books);

  // Implement logic to fetch and return book review for the specified ISBN
  const bookReview = availableBooks[isbn].reviews

  if (bookReview) {
    return res.status(200).json({ review: bookReview });
  } else {
    return res.status(404).json({ message: "Review for this book not found" });
  }
});

// Export the router containing public user routes
module.exports.general = public_users;