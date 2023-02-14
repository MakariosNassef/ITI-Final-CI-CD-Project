import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './author.css'
import { getUser } from '../utils/common.js'

class HomeBookTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: this.props.obj,
            usersBook: "",
            };
        }
    componentDidMount() {
        if(getUser())
        {   
            let userId = getUser().userId
            let bookId = this.state.books._id
            axios.get(`http://localhost:4000/userbook/${userId}/${bookId}`)
            .then(res => {
                    this.setState({
                        usersBook: res.data
                    })
                })
                .catch(function (error) {
                    console.log(error);
            })
        }
    }
    actionCreate = (e,value) => {
        
        if(value == "WTR")
            var action = "Want to Read"
        else if(value == "Reading")
            var action = "Current Reading"
        else
            var action = "Read"

        let userId = getUser().userId
        let bookId = this.state.books._id
        
        axios.post(`http://127.0.0.1:4000/userBook/`, {
                userId,
                bookId,
                action
            }).catch(function (error) {
                console.log(error);
            })
            // window.location.reload(false);
            action = axios.get(`http://localhost:4000/userbook/${userId}/${bookId}`)
        .then(res => {
                
                this.setState({
                    usersBook: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
        })
    }

    actionUpdate = (e,value) => {
        
        if(value == "WTR")
            var action = "Want to Read"
        else if(value == "Reading")
            var action = "Current Reading"
        else
            var action = "Read"

        let userId = getUser().userId
        let bookId = this.state.books._id
        
        axios.put(`http://127.0.0.1:4000/userBook/${userId}/${bookId}`, {
                action
            }).catch(function (error) {
                console.log(error);
            })
            action = axios.get(`http://localhost:4000/userbook/${userId}/${bookId}`)
            .then(res => {
                
                this.setState({
                    usersBook: res.data
                })
            })
            .catch(function (error) {
                console.log(error);
        })
    }
    ShowButtons = () =>{

        
        if(this.state.usersBook == "Want to Read"){
            return(
                <span>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionUpdate(e,"Reading")}}>Reading</button>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionUpdate(e,"Read")}}>Read</button>
                </span>
            )
        } else if(this.state.usersBook == "Current Reading"){
            return(
                <span>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionUpdate(e,"WTR")}}>WTR</button>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionUpdate(e,"Read")}}>Read</button>
                </span>
            )
        }
        else if(this.state.usersBook == "Read"){
            return(
                <span>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionUpdate(e,"WTR")}}>WTR</button>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionUpdate(e,"Reading")}}>Reading</button>
                </span>
            )
        } else {
            return(
                <span>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionCreate(e,"WTR")}}>WTR</button>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionCreate(e,"Reading")}}>Reading</button>
                    <button className="buttonsSpan w3-button w3-white w3-border w3-border-green w3-round-large" onClick={e => {this.actionCreate(e,"Read")}}>Read</button>
                </span>
            )
        } 
    }
    
    render() {
        console.log(this.state.books);
        
        let bUrl = `http://localhost:3000/book/${this.state.books._id}`
        if (!getUser()) 
        {
            return (
                <div  key={this.props.id}>
                    <div className="card item-card card-block">
                            <img className="img" src={this.state.books.img} />
                            <h1 className="item-card-title mt-3 mb-3"> {this.state.books.bookName}</h1>
                            {/* <p className="card-text"><span>Birth Date :</span>{this.state.books.date_of_birth}</p>  */}
                    </div>
                </div>
            )
        } 
        return (
            <div  key={this.props.id}>
                {this.props.key}
                <div className="card item-card card-block">
                    <a href={bUrl}>
                        <img className="img" src={this.state.books.img} />
                        <h1 className="item-card-title mt-3 mb-3"> {this.state.books.bookName}</h1>
                        {/* <p className="card-text"><span>Birth Date :</span>{this.state.books.date_of_birth}</p>  */}
                     </a>
                     
                    <this.ShowButtons />
                    
                </div>
            </div>
            
        );
    }
}

export default HomeBookTable;