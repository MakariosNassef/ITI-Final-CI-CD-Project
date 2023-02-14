import axios from 'axios';
import React,{Redirect} from 'react';
// return the token from the session storage
export const getToken = () => {
  return sessionStorage.getItem('token') || null;
}
 
// remove the token and user from the session storage
export const removeUserSession = () => {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
}
 
// set the token and user from the session storage
export const setUserSession = (token, user) => {
  sessionStorage.setItem('token', token);
  sessionStorage.setItem('user', JSON.stringify(user));
}
const verifyUser = () =>{
  var token = getToken();   
    if(token){
      var token = getToken(); 
    axios.get(`http://localhost:4000/login/verifyToken?token=${token}`)
    .then(response => {
      }).catch(error => {
        removeUserSession();
        window.location.assign("/");
      });
    }
}
export const getUser = () => {
  verifyUser();
  const userStr = sessionStorage.getItem('user');
  if (userStr){
      return JSON.parse(sessionStorage.getItem('user'))
  } 
  else return null;
}