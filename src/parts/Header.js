import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';

class Header extends Component{
    render(){
        var logout = sessionStorage.loggedIn;
        let loguoutLink = '';
        if(logout){
            loguoutLink = <li className="pull-right"><Link to={"/logout"} className="nav-link">Logout</Link></li>;
        }
        return (<header>
                <div className="row">
                    <div className="col-md-2">
                <div className="logo-sec">
                    < a href="/"><img src={logo} alt="logo" /></a>
                </div>
                    </div>
                    <div className="col-md-8">
                <div className="social-links">
                    <ul>
                        <li><a href="https://facebook.com/myapp"><i className="fab fa-facebook"></i></a></li>
                        <li><a href="https://twitter.com/myapp"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="https://linkedin.com/myapp"><i className="fab fa-linkedin"></i></a></li>
                        <li><a href="https://youtube.com/myapp"><i className="fab fa-youtube"></i></a></li>
                    </ul>
                </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <ul className="navbar-nav mr-auto">
                                <li><Link to={'/dashboard'} className="nav-link">Dashboard</Link></li>
                                <li><Link to={'/cars'} className="nav-link">Cars</Link></li>
                                <li><Link to={'/bookings'} className="nav-link">Bookings</Link></li>
                                {loguoutLink}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        );
    }
}
export default Header;