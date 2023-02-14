import { getUser, removeUserSession } from '../utils/common';
import React, {
    Component
} from 'react';
import axios from 'axios';
import HomeBookTable from './HomeBookTable';
import './Profile.css'
import './author.css'
import DataTableErrorBook from './data-table-error-book'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersBooks: [],
            pageHeader: "All your Books"

        };
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/userbook/${getUser().userId}`)
            .then(res => {
                const userBooks = res.data.map((val) => {
                    return val.bookId
                })
                this.setState({
                    usersBooks: userBooks,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    all = () => {
        var header = document.querySelector('#lefa')
        header.innerHTML = "All your Books"
        let userId = getUser().userId
        axios.get(`http://localhost:4000/userbook/${userId}`)
            .then(res => {
                const userBooks = res.data.map((val) => {
                    return val.bookId
                })
                this.setState({
                    usersBooks: userBooks,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    readAction = (e, value) => {
        switch (value) {
            case "current":
                var header = document.querySelector('#lefa')
                header.innerHTML = "Your Currently Reading Books"
                break;
            
            case "wtr":
                var header = document.querySelector('#lefa')
                header.innerHTML = "Books you Wnat to Read"
                break;

            case "read":
                var header = document.querySelector('#lefa')
                header.innerHTML = "Your Already Read Books"
                break;

            default:
                var header = document.querySelector('#lefa')
                header.innerHTML = "All your Books"
                break;
        }
        let userId = getUser().userId
        axios.get(`http://localhost:4000/userbook/${value}/${userId}`)
            .then(res => {
                const userBooks = res.data.map((val) => {
                    return val.bookId
                })
                this.setState({
                    usersBooks: userBooks,
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    homeBookTable() {
        if (this.state.usersBooks.length == 0) {
            return (
                    < DataTableErrorBook />
            )
      }
        else {
            return this.state.usersBooks.map((data, i) => {                
                return (
                    <div className="col-md-3 col-sm-6 item" key={data._id}>
                        <HomeBookTable id={data._id} obj={data} />
                    </div>
                );
            })
        }

    }

    render() {
        return (
            <div className="parent">
                <h1 className="grad" id="lefa">{this.state.pageHeader}</h1>
                <div className="mySidenav sidenav">
                    <div className="sidenav" >
                        <ul className="navul">
                            <li className="navulli" onClick={this.all}><span className="navullispan">All</span></li>
                            <li className="navulli" onClick={(e) => { this.readAction(e, "current") }}><span className="navullispan">Currently Reading</span></li>
                            <li className="navulli" onClick={(e) => { this.readAction(e, "wtr") }}><span className="navullispan">Want to Read</span></li>
                            <li className="navulli" onClick={(e) => { this.readAction(e, "read") }}><span className="navullispan">Already Read</span></li>
                        </ul>
                    </div>
                </div>
                <div>
                    <div className="i-am-centered" >
                        <div className="row boy" >

                            {
                                this.homeBookTable()
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}