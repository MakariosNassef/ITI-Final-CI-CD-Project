import React, { Component } from 'react';
import './author.css'

class DataTable extends Component {



    render() {
        let bUrl = `http://localhost:3000/book/${this.props.obj._id}`

        return (
            <div className="col-md-3 col-sm-6 item">
                <div className="card item-card card-block">
                    <a href={bUrl}>

                        <img className="img" src={this.props.obj.img} />
                        <br />
                        <h1 className="name-item">Book Name </h1><br />

                        <h1 className="item-card-bookname"> {this.props.obj.bookName}</h1><br />

                        <h1 className="name-item">Description</h1><br />

                        <h1 className="item-card-bookdis"> {this.props.obj.bookDescription}</h1>
                        <br />

                    </a>
                </div>
            </div>
        );
    }
}

export default DataTable;