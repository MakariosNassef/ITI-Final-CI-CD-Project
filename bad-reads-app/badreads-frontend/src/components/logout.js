import React, {Component} from 'react';
import { removeUserSession } from '../utils/common';

class Logout extends Component{
    componentDidMount(){
        removeUserSession();
        this.props.checkUser();
    }

    render(){
        return(
            <div>
                Now loggedOut; 
                {this.props.history.push('/')}
            </div>
        )
    }
}
export default Logout;