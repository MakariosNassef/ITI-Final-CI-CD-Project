import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import DataTable from './data-table-book';
import HomeBookTable from './HomeBookTable'
import axios from 'axios';

export default class Category_books extends Component {

  componentDidMount() {
    this.getBooks()  
  }
  getBooks = () => {
    const currentPage = this.props.match.params.pageid || 1
    this.setState({
      currentPage
    })
    // get category name  
    axios.get(`http://127.0.0.1:4000/category/${this.props.match.params.id}/name`)
      .then(res=>{
        if (!res.data.categoryName){
          this.props.history.push(`/404`)
        }
        this.setState({
          categoryName: res.data.categoryName
        })
      }).catch(err=>{
        console.log(err);
      })
      
      // get category books
      axios.get(`http://127.0.0.1:4000/category/${this.props.match.params.id}/${currentPage}`)
      .then(res=>{
        if (res.data.length==0){
            this.props.history.push(`/404`)
        }
        this.setState({
          bookList: res.data
        })
      }).catch(err=>{
        console.log(err);
      })

      axios.get(`http://127.0.0.1:4000/category/${this.props.match.params.id}/count`)
      .then(res=>{
        console.log(res.data);
        this.setState({
          pageCount: (res.data+5)/6
        })
      }).catch(err=>{
        console.log(err);
      })

  }

  state = {
    categoryName: "",
    bookList: [],
    pageCount: 0,
    currentPage: 1,
  }
  render() {
    const { categoryName, bookList, currentPage } = this.state
    const pageList = []
    for (let i=1;i<=this.state.pageCount;++i){
      pageList.push(i)
    }
    return (
      <div class="container">
        <h1>{categoryName}</h1>
        <div class="row">
          {
            bookList.map((book)=>
              <div className="col-md-3 col-sm-6 item" key={book.key}>
                  <HomeBookTable id={book.key} obj={book} />
              </div>
            )
          }
        </div>
        <ul class="pagination justify-content-center">
          {
              pageList.map(pagerNum=>
                <li class={'page-item '+ (currentPage == pagerNum ? 'active': '')}><a class="page-link" href={'/category/'+this.props.match.params.id+'/'+pagerNum}>{pagerNum}</a></li>
              )
          }
        </ul>
      </div>
    )
  }
}
