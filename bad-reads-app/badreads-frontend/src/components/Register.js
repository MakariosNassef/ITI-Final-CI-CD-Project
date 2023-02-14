import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { setUserSession } from '../utils/common';
import './login.css'
 
class Register extends Component {
  constructor(props){
    super(props);
    this.state={
        firstName:'',
        lastName:'',
        email: '', 
        password: '',
        confirmPassword:'',
        file:null,
        error:'',
        errorStatus: false
      }
   }
  handlefirstNameChange = (e) => {
    this.setState({firstName: e.target.value});
  }
  handlelastNameChange = (e) => {
    this.setState({lastName: e.target.value});
  }
  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  handleconfirmPasswordPasswordChange = (e) => {
    this.setState({confirmPassword: e.target.value});
  }
  handleImageChange=(e)=>{  
    this.setState({file: e.target.files[0]});    
  }
  checkUser(){
    this.props.checkUser();
  }
  handleSignup = () => {
    var formData = new FormData();
    formData.append("firstName",this.state.firstName)
    formData.append("lastName",this.state.lastName)
    formData.append("email",this.state.email)
    formData.append("password",this.state.password)
    formData.append("confirmPassword",this.state.confirmPassword)
    formData.append("file",this.state.file)
    axios.post('http://localhost:4000/register', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      setUserSession(response.data.token, response.data.user);
      this.checkUser();
      this.props.history.push('/');
    }).catch(error => {
      this.setState({ error: error.response.data.message });
      this.setState({ errorStatus: error.response.data.error });
    });
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


  render(){  
    return (
      <div className="login-form">    
        <form>
          <div className="avatar"><i className="material-icons">&#xE7FF;</i></div>
          <h4 className="modal-title">Make a new account</h4>
          <this.WarningBanner />
            <div className="form-group">
              <input type="text" className="form-control" name="firstName" required="required" placeholder="first Name" value={this.state.firstName} onChange={this.handlefirstNameChange} />          
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="lastName" placeholder="last Name" value={this.state.lastName} onChange={this.handlelastNameChange} />
            </div>
            <div className="form-group">
              <input type="text" className="form-control" name="email" placeholder="Email" value={this.state.email} onChange={this.handleEmailChange} />
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="password" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
            </div>
            <div className="form-group">
              <input type="password" className="form-control" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleconfirmPasswordPasswordChange}/>
            </div>
            <div className="form-group">
              <input type="file" name="image" onChange={this.handleImageChange}/>
            </div>
            <button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.handleSignup}>Register</button>             
        </form>			
        <div className="text-center small">Have an account? <a href="/login">Sign In</a></div>
      </div>
    );
  }
}

export default Register;