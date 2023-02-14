import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './author.css'

class HomeCategoryTable extends Component {

    render() {
        let bUrl = `http://localhost:3000/category/${this.props.obj._id}`        
        return (
            <div key={this.props.id}>
                <div className="card item-card-cat card-block">
                    <Link to={bUrl}>
                        <br />
                        <h1 className="name-item">Category Name </h1>
                        <h1 className="item-card-bookname">{this.props.obj.categoryName} </h1>
                        <br />
                        <h1 className="name-item">Description</h1>
                        <h1 className="item-card-bookdis"> {this.props.obj.categoryDescription}</h1>
                        <br />
                        <img className="img-cattegory" src={require('../category.png')} />

                    </Link>
                </div>
            </div>
        );
    }
}

export default HomeCategoryTable;