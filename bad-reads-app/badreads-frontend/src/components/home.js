import React, {
    Component
} from 'react';
import axios from 'axios';
import HomeCategoryTable from './homeCategoryTable';
import HomeAuthorTable from './HomeAuthorTable';
import HomeBookTable from './HomeBookTable';
import './author.css'
import DataTableErrorCategory from './data-table-error-category'
import DataTableErrorBook from './data-table-error-book'
import DataTableError from './data-table-error';



export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryCollection: [],
            bookCollection: [],
            authorCollection: []

        };
    }

    componentDidMount() {
        axios.get('http://localhost:4000/home/category')
            .then(res => {
                this.setState({
                    categoryCollection: res.data.sort( () => Math.random() - 0.5).slice(0, 5)
                });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/home/author')
            .then(res => {
                this.setState({
                    authorCollection: res.data.sort( () => Math.random() - 0.5).slice(0, 5)
                });
            })
            .catch(function (error) {
                console.log(error);
            })

        axios.get('http://localhost:4000/home/book')
            .then(res => {
                this.setState({
                    bookCollection: res.data.sort( () => Math.random() - 0.5).slice(0, 5)
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    homeCategoryTable() {
        if (this.state.categoryCollection.length == 0) {
            return <DataTableErrorCategory />
        }
        else {
            return this.state.categoryCollection.map((data, i) => {
                data.key = Math.floor(Math.random() * 100000)
                return (
                     <div className="col-md-3 col-sm-6 item" key={data.key}>
                        <HomeCategoryTable id={data.key} obj={data} />
                    </div>
                );
            });
        }
    }

    homeAuthorTable() {
        if (this.state.authorCollection.length == 0) {
            return <DataTableError />
        }
        else {
            return this.state.authorCollection.map((data, i) => {
                data.key = Math.floor(Math.random() * 100000)
                return (
                    <div className="col-md-3 col-sm-6 item" key={data.key}>
                        <HomeAuthorTable id={data.key} obj={data} />;
                    </div>
                )
            });
        }
    }

    homeBookTable() {
        if (this.state.bookCollection.length == 0) {
            return <DataTableErrorBook />
        }
        else {
            return this.state.bookCollection.map((data, i) => {
                return (
                    <div className="col-md-3 col-sm-6 item" key={data.key}>
                        <HomeBookTable id={data.key} obj={data} />
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <center>
                <h1 className="grad">Pobular Books</h1>
                <div className="i-am-centered" >
                    <div className="row boy" >

                        {
                            this.homeBookTable()
                        }

                    </div>
                </div>

                <h1 className="grad">Pobular Categories</h1>
                <div className="i-am-centered" >

                    <div className="row boy" >
                        {
                            this.homeCategoryTable()
                        }


                    </div>
                </div>


                <h1 className="grad">Pobular Authors</h1>
                <div className="i-am-centered" >

                    <div className="row boy" >
                        {
                            this.homeAuthorTable()
                        }


                    </div>
                </div>
            </center>
        )
    }
}