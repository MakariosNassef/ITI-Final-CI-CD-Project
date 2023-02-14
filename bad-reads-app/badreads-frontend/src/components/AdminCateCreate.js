import React ,{Component} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Form} from 'react-bootstrap';
class AdminCateCreate extends Component{
  constructor(props){
    super(props);
    this.state={
    categoryName:'',
    categoryDescription:''
    }
 }
 handlecategoryNameChange = (e) => {
  this.setState({categoryName: e.target.value});
}
handlecategoryDescriptionChange = (e) => {
    this.setState({categoryDescription: e.target.value});
  }



handleCate = () => {
  var aformData = new FormData();
  aformData.append("categoryName",this.state.categoryName)
  aformData.append("categoryDescription",this.state.categoryDescription)
  axios.post('http://localhost:4000/admin/category', {categoryName:this.state.categoryName,  categoryDescription:this.state.categoryDescription}
  ).then(response => {
      this.props.history.push('/admin/category/')
    }).catch(error => {
      console.log(error);
    });
}

render()
  {  return (


     <div>
         <Form>
  <Form.Group controlId="formBasicEmail">
    <Form.Label>Category</Form.Label>
    <Form.Control type="text" name="categoryName" value={this.state.categoryName} onChange={this.handlecategoryNameChange}/>
    <Form.Label>Describition</Form.Label>
    <Form.Control type="text" name="categoryDescription" value={this.state.categoryDescription} onChange={this.handlecategoryDescriptionChange}/>

  </Form.Group>

 
  <Button variant="primary" type="button" onClick={this.handleCate}>
    Submit
  </Button>
</Form>
       
  </div>


  )
  }

}

export default AdminCateCreate