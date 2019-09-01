import React from 'react';
import { HashRouter,  Switch, Route } from 'react-router-dom';
import './styles/style.css';
import Header from './parts/Header';
import Cars from './components/Cars';
import AddCar from './components/AddCar';
import EditCar from './components/EditCar';
import DeleteCar from './components/DeleteCar';
import Bookings from './components/Bookings';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';


function App() {
  return (
      <HashRouter>
            <div className="App">
                <Header/>
                <Switch>
                    <Route path="/" exact component={Dashboard}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/dashboard" component={Dashboard}/>
                    <Route path="/cars" component={Cars}/>
                    <Route path="/car/add" component={AddCar}/>
                    <Route path="/car/edit/:id" component={EditCar}/>
                    <Route path="/car/delete/:id" component={DeleteCar}/>
                    <Route path="/bookings" component={Bookings}/>
                </Switch>
            </div>
      </HashRouter>
  );
}

export default App;
