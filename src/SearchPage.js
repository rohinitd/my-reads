import React, {Component} from 'react';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';
import Book from './Book';
import {debounce} from 'throttle-debounce';

class SearchPage extends Component {
  // This state variable holds the result returned from search API.
  state = {
    queryString : '',
    queryResult : []
  }

  // This method makes an API call to return the list of books which matches the text inputed by the user.
  updateQuery = (event) => {
    event.persist();
    let query = event.target.value;
    this.setState({
    	queryString : query
    });
    debounce(500, () => {
      if(query === undefined || query.length <= 0) {
      	this.setState({queryResult : []});
        return
      }
      if(query !== this.state.queryString) {
      	return
      }

      BooksAPI.search(query)
        .then((bookResults) => {
        if(bookResults.error !== undefined) {
          this.setState({queryResult : []});
          return
        }
        this.setState({queryResult : bookResults.map((result) => {
          let filterItem = this.props.bookInfo.filter((item) => {
            return item.id === result.id})
            if (filterItem.length > 0) {
              result.shelf = filterItem[0].shelf;
            } else {
              result.shelf = "none";
            }
          return result;
         })})
        })
        .catch((error) => {
          throw error
       })
     }
    )();
 }

  render() {
    return(
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={(event) => this.updateQuery(event)}
            />
          </div>
        </div>
        <div className="search-books-results">
        <div className="bookshelf">
          <div className="bookshelf-books">
            <ol className="books-grid">
            {
              this.state.queryResult.map((book) => (
                <li key={book.id} className="book">
                  <Book bookItem={book} updateCbk={this.props.updateCbk}>
                  </Book>
                </li>
              ))
            }
            </ol>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SearchPage;
