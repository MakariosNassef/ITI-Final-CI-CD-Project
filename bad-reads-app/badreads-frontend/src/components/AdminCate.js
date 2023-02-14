import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {ButtonGroup} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import AdminCateList from './AdminCateList'
import './AdminAuthor.css'


class AdminCate extends Component{
    state={
      cates:[
      ]
    }
  componentDidMount(){
    this.updateView()   
  }
  
  updateView = () => {
    axios.get("http://localhost:4000/admin/category")
    .then(res=>{
      const data = res.data;
      this.setState({cates:data})
    })
  }
  onSubmit = () => {
        
    
      this.props.history.push('/admin/category/create')
    
  }
  
  Submit = (cate) => {
    
    this.props.history.push(  { pathname: '/admin/category/update', state : { details: cate } })
  
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
  
    handledeletecate=(index)=>{
      axios.delete("http://localhost:4000/admin/category/"+this.state.cates[index]._id)
      .then(res=>{
        this.updateView()
        this.props.history.push("/admin/category")
      }).catch(error=>
      {
        console.log(error);
      })
  
    }
    
  
      render()
      
     {
       const cates=this.state.cates;
       const catelist =cates.map((cate,index)=>{
         return <AdminCateList details={cate} key={index} index={index} update={this.handleChange}  handledeletecate={this.handledeletecate} Submit={this.Submit}/>
        })       
      return (
       <div>
        <>
        <br/>
    <ButtonGroup size="lg" className="mb-2">
      <Button variant="light" className="btns" onClick={this.catepath}>Categories</Button>
      <Button variant="light" className="btns" onClick={this.bookpath}>Books</Button>
      <Button variant="light"className="btns"onClick={this.authorspath}>Authors</Button>
    
    
    </ButtonGroup>
    <Button  className="add" onClick={this.onSubmit}>Add
   </Button>
  </>
    
  <Table striped bordered hover className="table">
    <thead>
      <tr>
        <th>ID </th>
        <th> Name</th>
        <th> Describition</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      
  
    
  {catelist}
  
  
    
    </tbody>
  </Table>
  
      
  
     
      
       </div>
  
    );
    }
  
  }
  export default AdminCate 