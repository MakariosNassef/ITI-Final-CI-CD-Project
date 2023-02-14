import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import AdminBookList from './AdminBookList'
import AdminAuthorCreate from './AdminAuthorCreate'
import './AdminAuthor.css'


class AdminBook extends Component{
 
 
  state={
    books:[
    ],
    authors:[
    ]
  }
componentDidMount(){
    this.updateView()
}

updateView = () =>{
  axios.get("http://localhost:4000/admin/book")
     .then(res=>{       
       const data = res.data;
       this.setState({books:data})
     })
}
onSubmit = async() => {
  await axios.get("http://localhost:4000/admin/author")
  .then(response => {
      var authors=response.data
      axios.get("http://localhost:4000/admin/category")
      .then(response => {
          var categories=response.data
          this.props.history.push({pathname: '/admin/book/create', state : { authors: authors, categories: categories }})
        }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
    console.log(error);
  });
  
}

Submit = async(book) => {
  await axios.get("http://localhost:4000/admin/author")
  .then(response => {
      var authors=response.data
      axios.get("http://localhost:4000/admin/category")
      .then(response => {
          var categories=response.data
          this.props.history.push({pathname: '/admin/book/update', state : { authors: authors, categories: categories, details: book }})
        }).catch(error => {
        console.log(error);
      });
    }).catch(error => {
    console.log(error);
  });
}

catepath=()=>{
  this.props.history.push('/admin/category/')
}
bookpath=()=>{
  this.props.history.push('/admin/book/')
}
authorspath=()=>{
  this.props.history.push('/admin/author/')
}

  handledeletebook=(index)=>{
    axios.delete("http://localhost:4000/admin/book/"+this.state.books[index]._id)
    .then(res=>{
      this.updateView()
      this.props.history.push("/admin/book/")
    }).catch(error=>
    {
      console.log(error);
      
    })

  }
  

  render()
   {
     const books=this.state.books;
     const booklist =books.map((book,index)=>{
       return <AdminBookList details={book} key={index} index={index} handledeletebook={this.handledeletebook} Submit={this.Submit}/>
      })
           
    return (  
     <div>
       
      <>
      <br/>
  <ButtonGroup size="lg" className="mb-2">
    <Button variant="light" className="btns"onClick={this.catepath}>Categories</Button>
    <Button variant="light" className="btns" onClick={this.bookpath}>Books</Button>
    <Button variant="light"className="btns"onClick={this.authorspath}>Authors</Button>
  
  
  </ButtonGroup>
  <Button className="add" onClick={this.onSubmit}>Add
 </Button>
</>
  
<Table striped bordered hover className="table">
  <thead>
    <tr>
      <th>ID </th>
      <th> Book Name</th>
      <th>Category Id</th>
      <th>Author Id</th>
      <th>photo</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    

  
{booklist}


  
  </tbody>
</Table>

    

   
    
     </div>

  );
  }

}
export default AdminBook