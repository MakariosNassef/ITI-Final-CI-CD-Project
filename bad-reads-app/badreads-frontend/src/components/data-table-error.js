import React, { Component } from 'react';
import './author.css'

class DataTable extends Component {



    render() {
        return (
            <div>
                <center>
                    <img src="/images/caterror.png" width="550px" height="550px" />
                    <p style={{ fontSize: "45px", fontWeight: 700, color: "red" }}><img src="/images/cat.png" width="100px" height="100px" />No Users Found ya ray2<img src="/images/cat.png" width="100px" height="100px" /></p>
                </center>
            </div>
        );
    }
}

export default DataTable;