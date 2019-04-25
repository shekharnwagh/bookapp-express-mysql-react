const db = require('../db');

function getAllBooks() {
  return db.Books.findAndCountAll();
}

function upsertBook(book) {
  return db.Books.upsert(book);
}

function getBook(id) {
  return db.Books.findOne({
    where: { id }
  });
}

function deleteBook(id) {
  return db.Books.destroy({ where: { id }});
}

module.exports = {
  getAllBooks,
  upsertBook,
  getBook,
  deleteBook
}