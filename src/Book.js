import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
   static propTypes = {
      book: PropTypes.array.isRequired,
      onChangeShelf: PropTypes.func.isRequired
   }

   render() {
      const { book, onChangeShelf } = this.props

      return (
       <li key={book.id}>
         <div className="book">
           <div className="book-top">
             <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
             <div className="book-shelf-changer">
               <select onChange={(event) => onChangeShelf(book,event.target.value)} value={book.shelf || 'none'}>
                 <option value="none" disabled>Move to...</option>
                 <option value="currentlyReading">Currently Reading</option>
                 <option value="wantToRead">Want to Read</option>
                 <option value="read">Read</option>
                 <option value="none">None</option>
               </select>
             </div>
           </div>
           <div className="book-title">{book.title}</div>
           <div className="book-authors">{book.authors.join(", ")}</div>
         </div>
       </li>
      )
   }
}

export default Book