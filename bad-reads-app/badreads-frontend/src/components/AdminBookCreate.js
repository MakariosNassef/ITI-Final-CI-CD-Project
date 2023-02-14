import React ,{Component, Fragment, Input} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Form} from 'react-bootstrap';

class AdminBookCreate extends Component{
  constructor(props)
    
  
  {
    super(props);
  
    this.state={
    bookId:'',
    bookName:'',
    img:null,
    author:'',
    category: false,
    }

 }

 handlebookIdChange = (e) => {
  this.setState({bookId: e.target.value});
}

handlebookNameChange = (e) => {
  this.setState({bookName: e.target.value});
}
 
handleImageChange=(e)=>{  
  this.setState({img: e.target.files[0]});    
}


handleBook = () => {
  var aformData = new FormData();
  aformData.append("bookId",this.state.bookId)
  aformData.append("bookName",this.state.bookName)
  aformData.append("category",this.state.category)
  aformData.append("author",this.state.author)
  aformData.append("img",this.state.img)
  if(!this.state.img){
    this.setState({errorStatus: true})

    this.setState({error: "Must choose an image for the book"})
  }else{
  axios.post('http://localhost:4000/admin/book', aformData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
      this.props.history.push('/admin/book/')
    }).catch(error => {
      console.log(error);
    });
  }
}

createSelectItems = () => { 
   let items = []; 
   items.push(
    <Fragment>
      <option key="nullauthor" value={null} disabled selected>Please Select an author</option>
    </Fragment>); 
  for (var i = 0; i < this.props.location.state.authors.length; i++){ 
  items.push(
  <Fragment>
    <option kaey={this.props.location.state.authors[i]._id} value={this.props.location.state.authors[i]._id}>{this.props.location.state.authors[i].authorName}</option>
  </Fragment>); 
}
 return items; 
}

createCategoriesSelectItems = () => { 
  let items = []; 
  items.push(
    <Fragment>
      <option key="null" value={null} disabled selected>Please Select a category</option>
    </Fragment>); 
 for (var i = 0; i < this.props.location.state.categories.length; i++){ 
 items.push(
 <Fragment>
   <option key={this.props.location.state.categories[i]._id} value={this.props.location.state.categories[i]._id}>{this.props.location.state.categories[i].categoryName}</option>
 </Fragment>); 
}
return items; 
}

onDropdownSelected = (e)=> { 
  this.setState({author: e.target.value});
} 
onCategoriesDropdownSelected = (e)=> { 
  this.setState({category: e.target.value});
} 

WarningBanner = () => {
  if (!this.state.errorStatus) {
    return null;
  }
  return (
    <Fragment>
    <div className="alert alert-danger" role="alert">
      {this.state.error}
    </div>
    </Fragment>
  );
}

render()
  {    

    return (
     <div>
      <this.WarningBanner />

      <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Book Name</Form.Label>
              <Form.Control type="text" name="bookName" value={this.state.bookName} onChange={this.handlebookNameChange}/>
              <Form.Label>Authors</Form.Label>
              
              <select id="authors" onChange={this.onDropdownSelected}>
                <this.createSelectItems />
              </select><br/>
              <Form.Label>Category</Form.Label>
              <select id="categories" onChange={this.onCategoriesDropdownSelected}>
                <this.createCategoriesSelectItems />
              </select><br/>
              <Form.Label>Book Photo</Form.Label>
              <div className="form-group">
                <input type="file" name="img" onChange={this.handleImageChange}/>
              </div>    
            </Form.Group>
            <Button variant="primary" type="button" onClick={this.handleBook}>
              Submit
            </Button>
          </Form> 
        </div>

  )
  }

}
export default AdminBookCreate