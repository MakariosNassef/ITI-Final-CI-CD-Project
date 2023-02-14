import React ,{Component,Fragment} from 'react';
import {Table} from 'react-bootstrap';
var moment = require('moment');

class AdminBookList extends Component{
 render()
 {  
 
  return(
    <Fragment>
   
      
      <tr>
   
      <td>{this.props.details._id}</td>
      <td>{this.props.details.bookName}</td>
      <td>{this.props.details.category.categoryName}</td>
      <td>{this.props.details.author.authorName}</td>

      <td>{this.props.details.img}</td>
        
      <td><button  className ="update"onClick={()=>{this.props.Submit(this.props.details)}} >Update</button> 
      <button  className ="delete"onClick={()=>{this.props.handledeletebook(this.props.index)}} >Delete</button>
      
      </td>
     

      </tr>
       
   
 </Fragment>

     
)



}




}
export default AdminBookList;