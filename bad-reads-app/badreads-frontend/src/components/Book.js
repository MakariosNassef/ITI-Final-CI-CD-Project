import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Book extends Component {
  state = {
    categoryName: "programming",
    bookList: [
      {
        bookImg: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1454296875l/25666050.jpg",
        bookName: "Algorithms to Live By: The Computer Science of Human Decisions",
        bookLink: "#",
        bookAuthor: "Brian Christian",
        bookAuthorLink: "#https://www.goodreads.com/author/show/4199891.Brian_Christian"
      },
      {
        bookImg: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1454296875l/25666050.jpg",
        bookName: "Algorithms to Live By: The Computer Science of Human Decisions",
        bookLink: "#",
        bookAuthor: "Brian Christian",
        bookAuthorLink: "#https://www.goodreads.com/author/show/4199891.Brian_Christian"
      },
      {
        bookImg: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1454296875l/25666050.jpg",
        bookName: "Algorithms to Live By: The Computer Science of Human Decisions",
        bookLink: "#",
        bookAuthor: "Brian Christian",
        bookAuthorLink: "#https://www.goodreads.com/author/show/4199891.Brian_Christian"
      },
      {
        bookImg: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1454296875l/25666050.jpg",
        bookName: "Algorithms to Live By: The Computer Science of Human Decisions",
        bookLink: "#",
        bookAuthor: "Brian Christian",
        bookAuthorLink: "#https://www.goodreads.com/author/show/4199891.Brian_Christian"
      },
      {
        bookImg: "https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1454296875l/25666050.jpg",
        bookName: "Algorithms to Live By: The Computer Science of Human Decisions",
        bookLink: "#",
        bookAuthor: "Brian Christian",
        bookAuthorLink: "#https://www.goodreads.com/author/show/4199891.Brian_Christian"
      },
    ]
  }
  render() {
    const { categoryName, bookList } = this.state
    return (
      <div class="container">
        <h1>{categoryName}</h1>s
        <div class="row">
          {
            bookList.map((book)=>
              <div class="col-3">
                <div class="container">
                  <img  src={book.bookImg} style={{maxWidth: "200px",maxHeight: "300px"}} />
                </div> 
                <div class="container">
                  <Link onClick={book.bookLink}><span>{book.bookName}</span></Link>
                </div>
                <div class="container">
                  <Link onClick={book.bookAuthorLink}><span>{book.bookAuthor}</span></Link>
                </div>
              </div>
            )
          }
        </div>
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li class="page-item "><a class="page-link" href="#">1</a></li>
          <li class="page-item"><a class="page-link" href="#">2</a></li>
          <li class="page-item active"><a class="page-link" href="#">3</a></li>
          <li class="page-item">
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </div>
    )
  }
}
