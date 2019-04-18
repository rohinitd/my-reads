import React, {Component} from 'react';
import BookShelf from './BookShelf';
import SearchPage from './SearchPage';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';
import {Route} from 'react-router-dom';
import './App.css'

const SHELVES = {
        currentlyReading: ['Currently Reading', 'currentlyReading'],
        wantToRead: ['Want to Read', 'wantToRead'],
        read: ['Read', 'read']
}

class BooksApp extends Component {
  // state variable maintaining the list of books in multiple book shelves
  state = {
    currentlyReading : [
    ],
    wantToRead :[
    ],
    read : [
    ]
  }



  constructor(props) {
    super(props);
    this.shelfUpdate = this.shelfUpdate.bind(this);
  }

  // Initialting the first API call to populate the list of books in book shelf
  componentDidMount() {
    //This API call returns books, which is filtered and added to its respective book shelf
    BooksAPI.getAll()
    .then((books) => {
      this.setState({
          currentlyReading : books.filter((book) => {
            return book.shelf === "currentlyReading";
          }),
          wantToRead : books.filter((book) => {
            return book.shelf === "wantToRead";
          }),
          read : books.filter((book) => {
            return book.shelf === "read";
          })
      })
    }
  )
 }

 // This method returns the current book shelf from state of the app
 // Takes the shelf as input and returns the shelf from state variable
 getBooksFromShelf(shelf) {
   if(shelf === SHELVES.currentlyReading[1]) {
     return this.state.currentlyReading;
   }
   if(shelf === SHELVES.wantToRead[1]) {
     return this.state.wantToRead;
   }
   if(shelf === SHELVES.read[1]) {
     return this.state.read;
   }
 }

 // This method updates a book from one shelf to another.
 // It takes the book info and shelf as input. Changes the book from one to another in the UI and also calls the update API to update the book in the backend.
 shelfUpdate(book, shelf) {
   var that = this;
   BooksAPI.update(book, shelf)
   .then((res) => {
     let toShelf = shelf;
     let fromShelf = book.shelf;
     let fromBooks = that.getBooksFromShelf(book.shelf);
     let toBooks = that.getBooksFromShelf(shelf);

     let _state = {};
     if(fromBooks !== undefined) {
       _state[fromShelf] = fromBooks.filter((book_) => {
         return book_.id !== book.id;
       });
     }
     if(toBooks !== undefined) {
       toBooks.push(book);
     }
     _state[toShelf] = toBooks;
     book.shelf = shelf;
     that.setState(_state);
   }).catch((error) => console.log(error));
 }

  // This method renders the UI onto the main page of application in MyReads app.
  render() {
    const newProps = [...this.state.currentlyReading,
                ...this.state.wantToRead,
                ...this.state.read]

    // Have two components <BookShelf> and <SearchPage> which is passed the appropriate props and state.
    // Also has the <Route> and <Link> for URL and navigation.
    return (
        <div>
          <Route exact path='/' render={ () => (
            <div>
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf title={SHELVES.currentlyReading[0]} books={this.state.currentlyReading} updateCbk={this.shelfUpdate}/>
                <BookShelf title={SHELVES.wantToRead[0]} books={this.state.wantToRead} updateCbk={this.shelfUpdate}/>
                <BookShelf title={SHELVES.read[0]} books={this.state.read} updateCbk={this.shelfUpdate}/>
              </div>

              <div className="open-search">
                  <Link to='/search' >
                  </Link>
              </div>
            </div>

        )} />
        <Route path='/search'  render={ () => (
            <SearchPage
              bookInfo={newProps}
              updateCbk={this.shelfUpdate}>
            </SearchPage>
        )}/>
      </div>
      );
   }
}

export default BooksApp
