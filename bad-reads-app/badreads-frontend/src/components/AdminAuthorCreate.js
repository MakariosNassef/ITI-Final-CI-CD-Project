import React ,{Component, Fragment} from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class AdminAuthorCreate extends Component{
  constructor(props){
    super(props);
    
    this.state={
    authorName:'',
    date_of_birth:new Date(),
    authorInfo:'',
    img:null,
    error:'',
    errorStatus: false
    }
 }
 handleauthorNameChange = (e) => {
  this.setState({authorName: e.target.value});
}
handledate_of_birthChange = (date) => {
  this.setState({
    date_of_birth: date
  });  
}
handleauthorInfoChange = (e) => {
  this.setState({authorInfo: e.target.value});
}
handleImageChange=(e)=>{  
  this.setState({img: e.target.files[0]});    
}


handleAuthor = () => {
  var aformData = new FormData();
  aformData.append("authorName",this.state.authorName)
  aformData.append("date_of_birth",this.state.date_of_birth)
  aformData.append("authorInfo",this.state.authorInfo)
  aformData.append("img",this.state.img)
  if(!this.state.img){
    this.setState({errorStatus: true})

    this.setState({error: "Must choose an image for the author"})
  }else{
  axios.post('http://localhost:4000/admin/author', aformData,{
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }).then(response => {
      this.props.history.push('/admin/author/')
    }).catch(error => {
      console.log(error);
    });
  }
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
    <Form.Label>Author Name</Form.Label>
    <Form.Control type="text" name="authorName" value={this.state.authorName} onChange={this.handleauthorNameChange}/>
    <Form.Label>Author Information</Form.Label>
    <Form.Control type="text" name="authorInfo" value={this.state.authorInfo} onChange={this.handleauthorInfoChange}/>
    <Form.Label>Author Birthday</Form.Label>
    <DatePicker selected={this.state.date_of_birth} 
      onChange={this.handledate_of_birthChange} 
      format='yyyy-MM-dd' 
      placeholder='Enter date' 
      dateFormat="yyyy-MM-dd" 
      showMonthDropdown
      showYearDropdown
      dropdownMode="select"
    /><br />
    <Form.Label>Author Photo</Form.Label>
    <div className="form-group">
      <input type="file" name="img" onChange={this.handleImageChange}/>
    </div>    
  </Form.Group>

 
  <Button variant="primary" type="button" onClick={this.handleAuthor}>
    Submit
  </Button>
</Form>
       
  </div>


  )
  }

}
export default AdminAuthorCreate