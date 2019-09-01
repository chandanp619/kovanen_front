import React, {Component} from 'react';
import Helper from '../Helper';
class Logout extends Component{

    constructor(props){
        super(props);
        sessionStorage.setItem('loggedIn',"false");
        sessionStorage.removeItem('loggedIn');
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
export default Logout;