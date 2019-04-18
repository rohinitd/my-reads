import React, {Component} from 'react';
import Book from './Book'

class BookShelf extends Component {
  render() {
    // Returns the list of book for multiple book shelves.
    // Iterated through the list of books which is passed as props and passes some props to the Book component.
    return(
      <div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.title} </h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
			{
              this.props.books.map((book) => {
                 return <li key={book.id} className="book">
                  <Book bookItem={book} updateCbk={this.props.updateCbk}>
                  </Book>
                </li>
				})
			}
          </ol>
        </div>
      </div>
    )
  }

}

export default BookShelf;
