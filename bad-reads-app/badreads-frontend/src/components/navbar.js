import React, {Fragment, Component} from 'react';
import './nav.css';
import Navbar from 'react-bootstrap/Navbar';
import { getUser } from '../utils/common';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import SelectSearch from 'react-select-search';

 

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false,
          books: null
        };
        this.changeNav(props);                
    }
    componentWillReceiveProps(nextprop){
        this.changeNav(nextprop); 
    }
    
    componentDidMount(){
        axios.get(`http://localhost:4000/book`)
            .then(res => {
                this.setState({
                    books: res.data.map(book=>(
                        {name:book.bookName, value:book._id}
                    ))
                })
                this.changeNav(this.props)
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    handleSelect = (elem) => {
        console.log(elem);  
        window.location.href = '/book/'+elem     
    }

    toggle() {
        this.setState({
          isOpen: !this.props.isOpen
        });
    }
    MavList;
    AdminList(user){        
        if(user.user.isAdmin){
            return <li><a href="/admin/author">Admin Panel</a></li>
        }
        return null;
    }
    changeNav = (props) =>{
        if(props.loggedIn){
            const user = getUser();
            this.MavList = (
                <Fragment>
                    <li>
                        <Link to="/home">
                        {/* <img src="/images/house.svg" alt="" id="small-logo1"/> */}
                        Home
                        </Link>
                    </li>
                    <li>
                        <Link to="/author">
                        {/* <img src="/images/author-book-512.png" alt="" id="small-logo1"/> */}
                        Authors
                        </Link>
                    </li>
                    <li>
                        <Link to="/category">
                        Categories
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                        <img src={user.img} alt="Avatar" className="avatar"/>
                         {user.firstName} {user.lastName}
                        </Link>
                        <ul className="drop">
                            <div className="menu-arrow"></div>
                            <this.AdminList user={user}/>
                            <li><a href="/logout">Sign Out</a></li>
                        </ul>
                    </li>
                    
                </Fragment>
            );
        }else{
            this.MavList =(
                <Fragment>
                    <li><Link to="/login">Login</Link></li>  
                    <li><Link to="/admin/login">Admin panel</Link></li>    
                    <li><Link to="/register">Register</Link></li>   
                </Fragment>
            );
        }
    }
    render(){        
        if(this.state.books == null){
            return null;
        }
        return(
             <Navbar>
                <div className="logo">
                    <Link to="/">
                    <img src="/images/logo.png" alt="" id="small-logo"/>
                    <img src="images/badreads.png" alt="" id="large-logo"/>
                    </Link>
                    <h4>A Community<br/>For Book Haters</h4>
                    
                </div>
            

                <ul className="main-nav">
                    { this.MavList }
                    <li>
                        <ul>
                        <SelectSearch onChange={this.handleSelect} options={this.state.books} placeholder="Search Books" search={true} autoComplete="on" />
                        </ul>
                    </li>
                </ul>
                <button type="button" name="button" className="hamburger">&#9776;</button>

            </Navbar>
        );
    }
}
export default NavBar;