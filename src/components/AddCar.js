import React, {Component} from 'react';

class AddCar extends Component{
    constructor(props){
        super(props);
        this.state = {"car":{"reg_number": "","make":"","model":"","year":"","power_window":"","auto":"","chauffeur":"","status":""}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addCar = this.addCar.bind(this);



    }

    getMake = ()=>{
        return new Promise(function(resolve,reject){
            fetch("http://18.216.56.178:3001/api/make")
                .then(function(response){
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
    };

    getModel = (manufacturer='')=>{
        return new Promise(function(resolve,reject){
            if(manufacturer===''){
            fetch("http://18.216.56.178:3001/api/model")
                .then(function(response){
                    return response.json();
                }).then(function(jsonData) {
                return jsonData;
            }).then(function(data){
                resolve(data);
                //console.log(data);
            }).catch(function(err){
                reject(err);
            });
            }else{
                fetch("http://18.216.56.178:3001/api/model/"+manufacturer)
                    .then(function(response){
                        return response.json();
                    }).then(function(jsonData) {
                    return jsonData;
                }).then(function(data){
                    resolve(data);
                    //console.log(data);
                }).catch(function(err){
                    reject(err);
                });
            }
        });
    };

    addCar = (data) =>{
        return new Promise(function(resolve,reject){
            fetch("http://18.216.56.178:3001/api/car/add",{
                method: 'POST',
                mode: "cors",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(data)
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

    };

    handleChange = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        let car = this.state.car;
        car[name] = value;
        this.setState({"car":car});

        if(event.target.name === 'make'){
            this.getModel(event.target.value).then((response)=>{
                this.setState ({"models": response});
            });
        }

    };

    handleSubmit = (event) => {
        event.preventDefault();
        this.addCar(this.state.car)
            .then((data)=> {
                if(data.status === 'Car Added'){
                    this.props.history.push("/cars");
                }
            });

    };

    componentWillMount() {
        this.getMake().then((response)=>{
            this.setState ({"manufacturer": response});
        });
        this.getModel().then((response)=>{
            this.setState ({"models": response});
        });
    }

    render(){
        let makeoptions = '';
        let modeloptions = '';
        let makeitems = (this.state.manufacturer)?this.state.manufacturer:[];
        let modelitems = (this.state.models)?this.state.models:[];
        if(typeof(makeitems)!== 'undefined' && makeitems.length > 0){
            makeoptions = makeitems.map((item,i)=>{
                if(item!=="")
                    return <option key={i} value={item}>{item}</option>;
                else
                    return "";
            });
        }
        if(typeof(modelitems)!== 'undefined' && modelitems.length > 0){
            modeloptions = modelitems.map((item,i)=>{
                if(item!=="")
                    return <option key={i} value={item.model}>{item.model}</option>;
                else
                    return "";
            });
        }


        return (<div>
            <h2>Add Car</h2>
            <form onSubmit={this.handleSubmit}>
                <p><input type="hidden" name="_id" onChange={this.handleChange}  /></p>
                <p><input type="text" name="reg_number" onChange={this.handleChange} placeholder="Registration Number" /></p>
                <p>
                    <select name="make" onChange={this.handleChange} placeholder="Make"><option>select</option>{makeoptions}</select>
                </p>
                <p><select name="model" onChange={this.handleChange} placeholder="Model"><option>select</option>{modeloptions}</select>
                </p>
                <p><input type="text" name="year" onChange={this.handleChange} placeholder="Year" /></p>
                <p><input type="text" name="power_window" onChange={this.handleChange} placeholder="Power Window" /></p>
                <p><input type="text" name="auto" onChange={this.handleChange} placeholder="Auto" /></p>
                <p><input type="text" name="chauffeur" onChange={this.handleChange} placeholder="Owner" /></p>
                <p><select name="status" onChange={this.handleChange} placeholder="Status">
                    <option value="Free">Free</option>
                    <option value="Booked">Booked</option>
                </select></p>
                <p><button type="submit">Save</button> </p>
            </form>
        </div>);
    }
}
export default AddCar;
