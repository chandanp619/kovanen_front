class Helper{
    checkLoggedIn(instance){
        if(sessionStorage.getItem('loggedIn')!== "true"){
            instance.props.history.push("/login");
        }
    }
}

export default new Helper();
