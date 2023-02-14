import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import { Route } from 'react-router';
import './AdminAuthorList.css'
import AdminAuthor from './AdminAuthor'
import AdminAuthorCreate from './AdminAuthorCreate'
import { Redirect} from "react-router-dom";
import { getUser } from '../utils/common';

class AdminAuthorList extends Component{
  constructor(props){
    super(props)
    var user = getUser();
    this.state={
      authors:[
      ]
    }
  }
componentDidMount(){
    this.updateView()
}

updateView = () =>{
  axios.get("http://localhost:4000/admin/author")
     .then(res=>{
       const data = res.data;
       this.setState({authors:data})
     })
}
onSubmit = () => {
  this.props.history.push('/admin/author/create')
}

Submit = (author) => {
  this.props.history.push(  { pathname: '/admin/author/update', state : { details: author } })
}

catepath=()=>{
  this.props.history.push('/admin/category/')
}
authorspath=()=>{
  this.props.history.push('/admin/author/')
}
bookpath=()=>{
  this.props.history.push('/admin/book/')
}

  handledeleteauthor=(index)=>{
    axios.delete("http://localhost:4000/admin/author/"+this.state.authors[index]._id)
    .then(res=>{
      this.updateView()
      this.props.history.push("/admin/author/")
    }).catch(error=>
    {
      console.log(error);
      
    })

  }
  

  render()
   {
     const authors=this.state.authors;
     const authorlist =authors.map((author,index)=>{
       return <AdminAuthor details={author} key={index} index={index} handledeleteauthor={this.handledeleteauthor} Submit={this.Submit}/>
      })
           
    return (  
     <div>
       
      <>
      <br/>
  <ButtonGroup size="lg" className="mb-2">
    <Button variant="light" className="btns"onClick={this.catepath}>Categories</Button>
    <Button variant="light" className="btns"onClick={this.bookpath}>Books</Button>
    <Button variant="light"className="btns"onClick={this.authorspath}>Authors</Button>
  
  
  </ButtonGroup>
  <Button  className ="add"  onClick={this.onSubmit}>Add
 </Button>
</>
  
<Table striped bordered hover className="table">
  <thead>
    <tr>
      <th>ID </th>
      <th> Name</th>
      <th>Information</th>
      <th>photo</th>
      <th>Date of Birth</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    

  
{authorlist}


  
  </tbody>
</Table>

    

   
    
     </div>

  );
  }

}
export default AdminAuthorList