import React from 'react';
import { Route, HashRouter } from 'react-router-dom';
import AllBooks from './components/AllBooks';
import AddBook from './components/AddBook';
import EditBook from './components/EditBook';
import './App.css';

function App() {
  return (
    <HashRouter>
      <div className="App">
        <Route exact path="/" component={AllBooks} />
        <Route path="/addbook" component={AddBook} />
        <Route path="/edit/:id" component={EditBook} />
      </div>
    </HashRouter>
  );
}

export default App;
