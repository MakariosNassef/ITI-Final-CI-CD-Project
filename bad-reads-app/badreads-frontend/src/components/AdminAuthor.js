import React ,{Component,Fragment} from 'react';
import {Table} from 'react-bootstrap';
var moment = require('moment');

class AdminAuthor extends Component{
 render()
 {   
  return(
    <Fragment>
   
      
      <tr>
   
      <td>{this.props.details._id}</td>
      <td>{this.props.details.authorName}</td>
      <td>{this.props.details.authorInfo}</td>
      <td>{this.props.details.img}</td>
      <td>{moment(this.props.details.date_of_birth).format("DD-MM-YYYY")}</td>
        
      <td><button  className ="update" onClick={()=>{this.props.Submit(this.props.details)}} >Update</button> 
      <button   className ="delete" onClick={()=>{this.props.handledeleteauthor(this.props.index)}} >Delete</button>
      
      </td>
     

      </tr>
       
   
 </Fragment>

     
)



}




}
export default AdminAuthor;