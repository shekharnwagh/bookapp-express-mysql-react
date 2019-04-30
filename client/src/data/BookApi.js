import BookData from './BookData';

let currentID = 3;

export default class BookApi {

    static getAllBooks() {
        return BookData.books;
    }

    static getBook(id){
        var books = BookData.books;
        for(let i = 0; i<books.length; i++){
            if(books[i].id===parseInt(id)){
                return books[i];
            }
        }
    }

    static editBook(id, book) {
        for(let i = 0; i<BookData.books.length; i++){
            if((BookData.books[i].id)===parseInt(id)){
                BookData.books[i] = Object.assign({}, book);
            }
        }
    }

    static saveBook(book) {
        book.id = ++currentID;
        BookData.books.push(book);
        console.log(BookData.books);
    }
}