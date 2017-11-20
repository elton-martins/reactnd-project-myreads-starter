import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class BookShelf extends Component {
   static propTypes = {
      books: PropTypes.array.isRequired,
      title: PropTypes.string.isRequired
   }

   state = {
      query: ''
   }

   render() {
      const { books } = this.props
      return (
         <div className="bookshelf">
            <h2 className="bookshelf-title">{this.props.title}</h2>
               <div className="bookshelf-books">
               {books.length > 0 && (
                 <ol className="books-grid">
                   {books.map((book) => (
                      <Book key={book.id}
                            book={book}
                            onChangeShelf={this.props.onChangeBookFromShelf}
                      />
                   ))}
                 </ol>
               )}
               </div>
         </div>
      )
   }
}

export default BookShelf