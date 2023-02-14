import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './author.css'

class HomeAuthorTable extends Component {

    constructor(props) {
        super(props);
        
    }
    render() {
        let bUrl = `http://localhost:3000/author/${this.props.obj._id}`        
        return (
            <div key={this.props.id}>
                <div className="card item-card card-block">
                    <a href={bUrl}>
                            <img className="img" src={this.props.obj.img} />
                            <h1 className="item-card-title mt-3 mb-3"> {this.props.obj.authorName}</h1>
                            {/* <p className="card-text"><span>Birth Date :</span>{this.props.obj.date_of_birth}</p>  */}
                    </a>
                </div>
            </div>
        );
    }
}

export default HomeAuthorTable;