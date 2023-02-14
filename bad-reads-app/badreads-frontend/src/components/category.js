import React, { Component } from 'react';
import axios from 'axios';
import DataTable from './data-table-category';
import './author.css'
import DataTableError from './data-table-error-category'


export default class Category extends Component {

    constructor(props) {
        super(props);
        this.state = { usersCollection: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/category')
            .then(res => {
                this.setState({ usersCollection: res.data });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    dataTable() {
        if (this.state.usersCollection.length == 0) {
            return <DataTableError />
        }
        else {
            return this.state.usersCollection.map((data, i) => {
                return <DataTable obj={data} key={i} />;
            });
        }
    }

    render() {
        return (

            <center>
                <h1 className="grad" id="boys"> ❤️ <span className="grad"> Categories </span> <span id="boys"> ❤️ </span>  </h1>
                <div className="i-am-centered" >

                    <div className="row boy" >

                        {this.dataTable()}

                    </div>
                </div>
            </center>
        )
    }
}