import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './data-table-book';
import './author.css'
import DataTableError from './data-table-error-book'
import moment from 'moment'

export default class UsersId extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: [], books: [] };
    }

    componentDidMount() {
        let id = this.props.match.params.id
        axios.get(`http://localhost:4000/author/${id}`)
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get(`http://localhost:4000/author/book/${id}`)
            .then(res => {
                this.setState({ books: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        if (this.state.books.length == 0) {
            return <DataTableError />
        }
        else {
            return this.state.books.map((data, i) => {
                return <DataTable obj={data} key={i} />;
            });
        }
    }


    render() {
        return (

            <center className="center-1">
                <h1 className="grad" id="boys"> ❤️ <span className="grad">Author Information </span> <span id="boys"> ❤️ </span>  </h1>

                <div className="containerr">
                    <div className="avatar-flip">
                        <img className="img" src={this.state.usersCollection.img} />
                        <img className="img" src={this.state.usersCollection.img} />

                    </div>
                    <h1 className="name-item"> Name: {this.state.usersCollection.authorName}</h1>
                    <h3 className="item-card-title mt-3 mb-3"> Birth Date: {moment(this.state.usersCollection.date_of_birth).format("DD-MM-YYYY")}</h3>
                    <h6 className="info"> {this.state.usersCollection.authorInfo}</h6>

                </div>
                <h1 className="grad" id="boys"> ❤️ <span className="grad"> Author's Books </span> <span id="boys"> ❤️ </span>  </h1>

                <div className="i-am-centered" >

                    <div className="row boy" >

                        {this.dataTable()}

                    </div>
                </div>

            </center >
        )
    }
}