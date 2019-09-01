import React, {Component} from 'react';

class EditCar extends Component{
    constructor(props){
        super(props);
        this.state = {"car":{"reg_number": "","make":"","model":"","year":"","power_window":"","auto":"","owner":"","status":""}};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }

    getCar = ()=>{

        var carID = this.props.match.params.id;
        return new Promise(function(resolve,reject){
            fetch("http://localhost:3001/api/car/"+carID,{
                method: 'GET',
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
    getMake = ()=>{
        return new Promise(function(resolve,reject){
            fetch("http://localhost:3001/api/make")
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
            if(manufacturer==''){
                fetch("http://localhost:3001/api/model")
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
                fetch("http://localhost:3001/api/model/"+manufacturer)
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
    updateCar = (data)=>{

        var carID = this.props.match.params.id;
        return new Promise(function(resolve,reject){
            fetch("http://localhost:3001/api/car/update/"+carID,{
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

    }

    handleChange = (event)=>{
        var name = event.target.name;
        var value = event.target.value;
        var car = this.state.car;
        car[name] = value
        this.setState({"car":car});
        if(event.target.name == 'make'){
            this.getModel(event.target.value).then((response)=>{
                this.setState ({"models": response});
            });
        }




    }

    handleSubmit = (event)=>{
        event.preventDefault();
        this.updateCar(this.state.car)
            .then((data)=> {
                console.log()
                if(data.status == 'Car Updated'){
                    this.props.history.push("/cars");
                }
            });

    }

    componentWillMount() {
        this.getMake().then((response)=>{
            this.setState ({"manufacturer": response});
        });
        this.getModel().then((response)=>{
            this.setState ({"models": response});
        });
        this.getCar().then((resp)=>{
            this.setState({"car":resp});

        });
    }


    render(){
        let statusList = ["Free","Booked"];
            let statusOptions = statusList.map((item,i)=>{
                if(this.state.car.status == item){
                    return <option key={i} value={item} selected>{item}</option>;
                }else{
                    return <option key={i} value={item}>{item}</option>;
                }

            });
        let makeoptions = '';
        let modeloptions = '';
        let makeitems = (this.state.manufacturer)?this.state.manufacturer:[];
        let modelitems = (this.state.models)?this.state.models:[];
        if(typeof(makeitems)!== 'undefined' && makeitems.length > 0){
            makeoptions = makeitems.map((item,i)=>{
                if(item===this.state.car.make){
                    return <option key={i} value={item} selected>{item}</option>;
                }else{
                    return <option key={i} value={item}>{item}</option>;
                }


            });
        }
        if(typeof(modelitems)!== 'undefined' && modelitems.length > 0){
            modeloptions = modelitems.map((item,i)=>{
                if(item.model===this.state.car.model){
                    return <option key={i} value={item.model} selected>{item.model}</option>;
                }else{
                    return <option key={i} value={item.model}>{item.model}</option>;
                }

            });
        }
        return (<div>
            <h2>Edit Car</h2>
            <form onSubmit={this.handleSubmit}>
                <p><input type="hidden" name="_id" value={this.state.car._id} onChange={this.handleChange} /></p>
                <p><input type="text" name="reg_number" value={this.state.car.reg_number} onChange={this.handleChange} /></p>
                <p><select name="make" onChange={this.handleChange} placeholder="Make"><option>select</option>{makeoptions}</select></p>
                <p><select name="model" onChange={this.handleChange} placeholder="Model"><option>select</option>{modeloptions}</select></p>
                <p><input type="text" name="year" value={this.state.car.year} onChange={this.handleChange} /></p>
                <p><input type="text" name="power_window" value={this.state.car.power_window} onChange={this.handleChange} /></p>
                <p><input type="text" name="auto" value={this.state.car.auto} onChange={this.handleChange} /></p>
                <p><input type="text" name="owner" value={this.state.car.owner} onChange={this.handleChange} /></p>
                <p><select name="status" onChange={this.handleChange}>
                    {statusOptions}
                </select> </p>
                <p><button type="submit">Save</button> </p>
            </form>
        </div>);
    }
}
export default EditCar;