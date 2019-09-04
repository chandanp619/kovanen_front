import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            "email":"",
            "password":""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
        console.log(this.state);
    }

    handleSubmit(event) {
        event.preventDefault();
        var Ndata = {email : this.state.email, password: this.state.password};
        fetch('http://18.216.56.178:3001/api/login/', {
            method: 'POST',
            mode: "cors",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Ndata)
        })
            .then((res)=> {
                var d = res.json();
                d.then((data)=>{
                    if (typeof (data) != "undefined") {

                        if (data.success){
                            sessionStorage.setItem('loggedIn',"true");
                            this.props.history.push("/dashboard");
                        } else {
                            document.getElementById('login-Form-Status').innerHTML = data.error;
                        }
                    }else{
                        console.log(data);
                    }
                });
            })




        // request.post('http://18.216.56.178:3001/api/login',data)
        //     .on('response', function(response) {
        //         console.log(response);
        //     })
        //     .on('error',function(err){
        //         console.log(err);
        //     })


    }

    render(){
        return (
            <div className="LoginForm">
                <h2>Login</h2>
                <form onSubmit={this.handleSubmit}>
                    <p id="login-Form-Status"></p>
                    <p>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" onChange={this.handleChange} value={this.state.email} />
                    </p>
                    <p>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" onChange={this.handleChange} value={this.state.password} />
                    </p>
                    <p>
                        <button type="submit">Submit</button>
                        <span className="text-right"><Link to="/reset">Forgot Password</Link></span>
                    </p>

                </form>
            </div>
        );
    }
}
export default Login;
