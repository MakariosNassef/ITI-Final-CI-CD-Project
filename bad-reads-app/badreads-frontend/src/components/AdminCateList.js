import React ,{Component,Fragment} from 'react';
import {Table} from 'react-bootstrap';
class AdminCateList extends Component{
 render()
 {  
 
  return(
    <Fragment>
   
      
      <tr>
   
      <td>{this.props.details._id}</td>
      <td>{this.props.details.categoryName}</td>
      <td>{this.props.details.categoryDescription}</td>

      
       
        
      <td><button className="update" onClick={()=>{this.props.Submit(this.props.details)}} >Update</button> 
      <button  className ="delete"onClick={()=>{this.props.handledeletecate(this.props.index)}} >Delete</button>
      
      </td>
     

      </tr>
       
   
 </Fragment>

     
)



}




}
export default AdminCateList;