import React, {Component} from 'react';

class Book extends Component {
  // This method calls the shelfUpdate method in App.js to make a book change from one shelf ro another.
  // It takes the event and book info as input.
  handleChange(event, book) {
    this.props.updateCbk(book, event.target.value);
  }

  render() {
    const defaultImage = 'https://www.anglo-egyptian.com/books_posters/defbookcover.jpg';
    let thumbnail=this.props.bookItem.imageLinks ? this.props.bookItem.imageLinks.thumbnail : defaultImage;

    // returns the book infomation with cover, title, author, and book changer.
    return(
      <div>
        <div className="book-top">
          <div className="book-cover"
              style={{
                  backgroundImage:  `url(${thumbnail})`,
                  width : '110px',
                  height : '200px'
              }}
          />
          <div className="book-shelf-changer">
            <select value={this.props.bookItem.shelf} onChange={(e) => this.handleChange(e, this.props.bookItem)}>
              <option value="moveTo" disabled>Move To...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want To Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">
            {this.props.bookItem.title}
        </div>
        <div className="book-authors">
            {this.props.bookItem.authors}
        </div>
      </div>
    );
  }
}

export default Book
