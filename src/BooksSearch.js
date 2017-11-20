import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Book from './Book'
import PropTypes from 'prop-types'

class BooksSearch extends Component {

  static PropTypes = {
    onChangeShelf: PropTypes.func.isRequired
  }

  state = {
    query: '',
    foundBooks: []
  }

  updateQuery = (query) => {
    this.setState({foundBooks:[], query: query.trim()})

    if (query.trim().length > 0) {
      BooksAPI.search(query, 20).then((books) => {
        this.setState({ foundBooks: books })
      })
    }
  }

  render() {

    const {foundBooks, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
               type="text"
               placeholder="Search by title or author"
               value={query}
               onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          {foundBooks.length > 0 && (
          <ol className="books-grid">
             {foundBooks.map((b) => (
                <Book key={b.id}
                      book={b}
                      onChangeShelf={this.props.onChangeShelf}
                />
             ))}
          </ol>
          )}
        </div>
      </div>
    )}
}

export default BooksSearch