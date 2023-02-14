import React, { Component } from 'react';
import './author.css'

class DataTable extends Component {


    
    render() {
        let bUrl = `http://localhost:3000/author/${this.props.obj._id}`
        return (
            <div className="col-md-3 col-sm-6 item">
                <div className="card item-card card-block">
                    <a href={bUrl}>                      
                        <img className="img" src={this.props.obj.img} />
                        <h1 className="item-card-title mt-3 mb-3"> {this.props.obj.authorName}</h1>
                    </a>
                </div>
            </div>
        );
    }
}

export default DataTable;