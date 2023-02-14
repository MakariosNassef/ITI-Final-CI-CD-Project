import React ,{Component, Fragment} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";

class AdminBookUpdate extends Component
{  
    constructor(props){
        
        super(props);
        
        this.state={
            bookId:this.props.location.state.details._id,
            bookName:this.props.location.state.details.bookName,
            category:this.props.location.state.details.category._id,
            author:this.props.location.state.details.author._id,
            img:null
        }
     }

    handlebookIdChange = (e) => {
        this.setState({bookId: e.target.value});
      }

      handleImageChange=(e)=>{  
        this.setState({img: e.target.files[0]});    
      }
      handlebookNameChange = (e) => {
        this.setState({bookName: e.target.value});
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
      
      handleBook = () => {          
        var aformData = new FormData();
        aformData.append("bookName",this.state.bookName)
        aformData.append("category",this.state.category)
        aformData.append("author",this.state.author)        
        if(this.state.img) aformData.append("img",this.state.img)
        axios.patch('http://localhost:4000/admin/book/'+this.props.location.state.details._id, aformData,{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          this.props.history.push('/admin/book/')
          }).catch(error => {
            console.log(error);
          });
      }
    
  render()
    { 
      return (
        <div>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Book Name</Form.Label>
              <Form.Control type="text" name="bookName" value={this.state.bookName} onChange={this.handlebookNameChange}/>
              <Form.Label>Author</Form.Label>
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
export default AdminBookUpdate