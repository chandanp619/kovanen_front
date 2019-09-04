import React, {Component} from 'react';
import { Link} from "react-router-dom";
// import { TablePagination } from 'react-pagination-table';
import ReactTable from 'react-table'
import "react-table/react-table.css";
import Pagination from 'react-pagination-status';
import Helper from '../Helper';
class Bookings extends Component{

    constructor(props) {
        super(props);

        Helper.checkLoggedIn(this);
        this.state = {"cars": []};
        this.dataN = '';
        this.getCars = this.getCars.bind(this);

        this.getCars().then((d)=>{
            this.setState({"cars":d});
        });
    }


    getCars() {
        return new Promise(function(resolve,reject){
            fetch("http://18.216.56.178:3001/api/cars",{
                method:"GET",
                mode: "cors",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(function(response){
                return response.json();
            }).then(function(jsonData) {
                return jsonData;
            }).then(function(data){
                resolve(data);
                //console.log(data);
            }).catch(function(err){
                reject(err);
            })
        });
    }

    componentWillMount() {
        this.getCars().then((d)=>{
            this.setState({"cars":d});
        });
    }

    getEditLink(link){
        console.log(link);
        let EditLink = "/car/edit/"+link;
        return <Link to={EditLink}>Edit</Link>
    }

    getDeleteLink(link){
        let DelLink = "/car/delete/"+link;
        return <Link to={DelLink}>Delete</Link>
    }

    render(){
        let Header = [
            {Header:'Registration Number',accessor:'reg_number'},
            {Header:'Status',accessor:'status'},
            {Header:'Model',accessor:'model'},
            {Header:'Make',accessor:'make'},
            {Header:'Power Window',accessor:'power_window'},
            {Header:'Auto',accessor:'auto'},
            {Header:'Owner',accessor:'owner'},
            {Header:'Year',accessor:'year'},
            {id:'edit_{_id}',Header:'Edit',accessor:(d)=>{   return this.getEditLink(d._id)  }},
            {'id':'delete_{_id}',Header:'Delete',accessor:(d)=>{   return this.getDeleteLink(d._id)  }}
        ];
        let cars = this.state.cars.map((item,i)=>{

            let EditLink = "/car/edit/"+item._id;
            let DelLink = "/car/delete/"+item._id;
            item.edit = <Link to={EditLink} key={item._id}>Edit</Link>;
            item.delete = <Link to={DelLink} key={item._id}>Delete</Link>;
            return item;
        });
        console.log(cars);
        console.log(Header);
        return (
            <div className="section">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Bookings <span className="add-link"><Link to="/car/add">Add</Link></span></h2>
                        <ReactTable
                            data={cars}
                            columns={Header}
                            defaultPageSize={10}
                            minRows={3}
                        />
                    </div>
                </div>
            </div>
        );
    }



}
export default Bookings;
