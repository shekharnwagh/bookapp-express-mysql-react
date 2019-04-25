const booksModel = require('../models/books');

async function getAllBooks(req, res) {
  try {
    const allBooks = await booksModel.getAllBooks();
    res.status(200).send(allBooks)
  }
  catch (err) {
    console.log(`ERR in controllers/Books getAllBooks : ${err.stack}`);
    res.send(404).send({Err : 'Not found'});
  }
}

async function upsertBook(req, res) {
  try {
    const book = req.body;
    const bookAuthor = `${book.name} (${book.author})`
    const returnValue = await booksModel.upsertBook(book);
    res.status(200).send({upsertStatus: `${returnValue ? 'Added' : 'Updated'} ${bookAuthor}`});
  }
  catch (err) {
    console.log(`ERR in controllers/Books upsertBook : ${err.stack}`);
    res.status(404).send({Err : 'Upsert Operation failed'});
  }
}

async function getBook(req, res) {
  try {
    const id = req.params.id;
    const book = await booksModel.getBook(id);
    if (book) {
      res.status(200).send(book);
    }
    else {
      res.status(404).send({Err : `No book found for id=${id}`});
    }
  }
  catch (err) {
    console.log(`ERR in controllers/Books getBook : ${err.stack}`);
    res.status(404).send({Err : `No book found for id=${req.params.id}`});
  }
}

async function deleteBook(req, res) {
  try {
    const id = req.params.id;
    const book = await booksModel.deleteBook(id);
    if (book) {
      res.status(200).send({message: `Deleted book with id=${id}`});
    }
    else {
      res.status(404).send({Err : `Delete operation failed for book with id=${id}`});
    }
  }
  catch(err) {
    console.log(`ERR in controllers/Books deleteBook : ${err.stack}`);
    res.status(404).send({Err : `Error in deleting book with id=${req.params.id}`});
  }
}

module.exports = {
    getAllBooks,
    getBook,
    upsertBook,
    deleteBook
}