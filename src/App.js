import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookShelf from './BookShelf'
import BooksSearch from './BooksSearch'

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

  componentDidMount() {
    this.getBooks()
  }

  getBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books })
    })
  }

  changeShelf = (book,newShelf) => {
     book.shelf = newShelf

     // Atualiza o state antes de dar update no server para evitar delay
     this.setState((state) => ({
        books: this.state.books.filter((b) => b.id !== book.id).concat([ book ])
     }))

     BooksAPI.update(book, newShelf).then((res) => this.getBooks())
  }

  render() {
    const { books } = this.state

    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf onChangeBookFromShelf={this.changeShelf} books={books.filter((book) => (book.shelf === 'currentlyReading'))} title="Currently Reading" />
                <BookShelf onChangeBookFromShelf={this.changeShelf} books={books.filter((book) => (book.shelf === 'wantToRead'))} title="Want to Read" />
                <BookShelf onChangeBookFromShelf={this.changeShelf} books={books.filter((book) => (book.shelf === 'read'))} title="Read" />
              </div>
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
          </div>
        )}/>

        <Route exact path="/search" render={() => (
          <BooksSearch books={books} onChangeShelf={this.changeShelf}/>
        )}/>
      </div>
    )
  }
}

export default BooksApp
