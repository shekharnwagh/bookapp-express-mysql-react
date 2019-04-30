import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

class EditBook extends Component {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      author: '',
      name: '',
      genre: '',
      price: 0,
      id: 0,
    }
  }

  async componentDidMount() {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BOOK_API}/${this.props.match.params.id}`
        );
      if (res.data) {
        const book = res.data;
        this.setState({
          id: book.id,
          name: book.name,
          author: book.author,
          genre: book.genre,
          price: book.price
        });
      }
    }
    catch(err) {
      console.log("ERR : ", err.stack);
    }
  }

  async onSubmit(event) {
    event.preventDefault();
    var book = {};
    book["id"] = this.state.id;
    book["name"] = this.state.name;
    book["author"] = this.state.author;
    book["genre"] = this.state.genre;
    book["price"] = this.state.price;
    if (!book.name.length) {
      alert("Please enter a name !");
    }
    else if (!book.author.length) {
      alert("Please enter a author name");
    }
    else if (!book.price) {
      alert("Please enter a price")
    }
    else if (isNaN(book.price)) {
      alert("Please enter a number for price");
    }
    else {
      try {
        const res = await axios.post(process.env.REACT_APP_BOOK_API, book);
        console.log('POST response : ', res.data.upsertStatus);
      }
      catch(err) {
        console.log("ERR : ", err.stack);
      }
      this.props.history.push('/');
    }
  }

  render() {
    return (
      <form className="col-sm-6">
        <h1>EDIT BOOK</h1>
        <div className="form-group">
          <label htmlFor="name">
            Name:
          <span style={{ color: "red" }}>
              *
          </span>
          </label>
          <input
            id="name"
            className="form-control"
            type="text"
            ref="name"
            value={this.state.name}
            onChange={(e) => this.setState({ name: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">
            Author:
          <span style={{ color: "red" }}>
              *
          </span>
          </label>
          <input
            id="author"
            className="form-control"
            type="text"
            ref="author"
            value={this.state.author}
            onChange={(e) => this.setState({ author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="genre">
            Genre:
          <span style={{ color: "red" }}>
              *
          </span>
          </label>
          <input
            id="genre"
            className="form-control"
            type="text"
            ref="genre"
            value={this.state.genre}
            onChange={(e) => this.setState({ genre: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">
            Price:
          <span style={{ color: "red" }}>
              *
          </span>
          </label>
          <input
            id="price"
            className="form-control"
            type="number"
            ref="price"
            value={this.state.price}
            onChange={(e) => this.setState({ price: e.target.value })}
          />
        </div>
        <div>
          <span style={{ color: "red" }}>
            *
          </span>
          Mandatory fields
        </div>
        <br></br>
        <span>
          <input
            type="submit"
            value="Save"
            className="btn btn-success col-sm-3"
            onClick={this.onSubmit}
          />
          <span className="col-sm-1"></span>
          <NavLink to="/">
            <button className="btn btn-danger col-sm-3">
              Cancel
          </button>
          </NavLink>
        </span>
      </form>
    );
  }
}

export default EditBook;

/*

*/