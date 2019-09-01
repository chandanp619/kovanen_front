import React, {Component} from 'react';
import Helper from '../Helper';
class Dashboard extends Component{

    constructor(props){
        super(props);
        Helper.checkLoggedIn(this);
    }

    render(){
        return (
            <div className="section">
                <div className="row">
                    <div className="col-md-12">
                        <h2>Dashboard</h2>
                        <p>lipsum content goes here.</p>
                    </div>
                </div>
            </div>
        );
    }
}
export default Dashboard;