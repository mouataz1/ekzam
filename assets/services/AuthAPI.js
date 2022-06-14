import axios from "axios";
import jwtDecode from "jwt-decode";



function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers("Authorozation");
}

function authenticate(credentials){
  return  axios
       .post("http://127.0.0.1:8000/api/login_check", credentials)
       .then(response =>response.data.token)
       .then(token => {
           window.localStorage.setItem("authToken", token);
         //  axios.defaults.headers["Authorization"] = "Bearer "+token;
           setAxiosToken(token);
           return true;
       })
}

function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer "+token;
}

function setup(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if(jwtData.exp * 1000 > new Date().getTime()){
            setAxiosToken(token);
        }
    }
}

function isAuthenticated(){
    const token = window.localStorage.getItem("authToken");
    if(token){
        const jwtData = jwtDecode(token);
        if(jwtData.exp * 1000 > new Date().getTime()){
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setup,
    isAuthenticated
}