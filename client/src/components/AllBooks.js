import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.rowDelete = this.rowDelete.bind(this);
    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    this.fetchAllBooks();
  }

  fetchAllBooks = async () => {
    try {
      const res = await axios.get(process.env.REACT_APP_ALL_BOOKS_API);
      if (res.data.count) {
        this.setState({
          books: res.data.rows
        })
      }
    }
    catch (err) {
      console.log("ERR : ", err.stack);
    }
  }

  rowDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BOOK_API}/${id}`
        );
      console.log("DELETE response : ", res.data.message);
    }
    catch(err) {
      console.log("ERR : ", err.stack);
    }

    this.fetchAllBooks();

  }

  render() {
    var bookNodes = this.state.books.map(book => (
      <tr key={book.id}>
        <td>{book.name}</td>
        <td>{book.author}</td>
        <td>{book.genre}</td>
        <td>{book.price}</td>
        <td>
          <div className="row">
            <NavLink
              className="col-sm-4"
              to={`/edit/${book.id}`}>
              <button className="btn btn-primary col-sm-12">
                Edit
            </button>
            </NavLink>
            <button
              className="btn btn-danger col-sm-4"
              onClick={() => this.rowDelete(book.id)}
            >
              Delete
            </button>
          </div>
        </td>
      </tr>
    ))
    return (
      <div>
        <h1>BOOK LIST</h1>
        <table className="table table-striped" border="1">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookNodes}
          </tbody>
        </table><br></br>
        <NavLink to="/addbook">
          <button className="btn btn-success col-sm-2">
            Add Book
          </button>
        </NavLink>
      </div>
    );
  }
}

export default AllBooks;