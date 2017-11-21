import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = (props) => {

  const { books, title, onChangeBookFromShelf } = props

  return (
     <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
           <div className="bookshelf-books">
           {books.length > 0 && (
             <ol className="books-grid">
               {books.map((book) => (
                  <Book key={book.id}
                        book={book}
                        onChangeShelf={onChangeBookFromShelf}
                  />
               ))}
             </ol>
           )}
           </div>
     </div>
  )
}

BookShelf.propTypes = {
  books: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

export default BookShelf