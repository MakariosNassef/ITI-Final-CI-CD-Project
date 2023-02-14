import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { setUserSession } from '../utils/common';
import './login.css'
 
class Login extends Component {
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      error:'',
      errorStatus: false
      }
   }
  
  handleEmailChange = (e) => {
    this.setState({email: e.target.value});
  }
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value});
  }
  checkUser(){
    this.props.checkUser();
  }
  handleLogin = () => {
    axios.post('http://localhost:4000/login', { email: this.state.email, password: this.state.password }).then(response => {
      setUserSession(response.data.token, response.data.user);
      this.checkUser();      
      this.props.history.push('/');
    }).catch(error => {
      this.setState({error: error.response.data.message});
      this.setState({errorStatus: error.response.data.error});
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
        <h4 className="modal-title">Login to Your Account</h4>
        <this.WarningBanner />
          <div className="form-group">
              <input type="text" className="form-control" name="email" placeholder="Email" required="required" value={this.state.email} onChange={this.handleEmailChange} />
          </div>
          <div className="form-group">
              <input type="password" className="form-control" name="password" required="required" placeholder="Password" value={this.state.password} onChange={this.handlePasswordChange}/>
          </div>
          <div className="form-group small clearfix">
              <a href="#" className="forgot-link">Forgot Password?</a>
          </div> 
          <button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.handleLogin}>Login</button>             
      </form>			
      <div className="text-center small">Don't have an account? <a href="/register">Sign up</a></div>
    </div>
  );
  }
}

export default Login;