import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register(){
    var [username,setUsername] = useState('');
    var [password,setPassword] = useState('');
    
    var navigate = useNavigate();
    function updateuser() {
        var formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
    
        axios.post('http://localhost:8000/medicineshopapi/signup_api/', formData)
            .then(response => {
                navigate('/login');
            })
            .catch(error => {
                console.log(error.response);
                console.log("Error data:", error.response.data);
                window.alert("Username already exist", error.response.data)
            });
    }
    

    return (
        <div className="container">
            <div className="row mt-5">
                <div className="col-8 offset-2">
                    
                    <h1>Register</h1>
                    <label>Username:</label>
                    <input type="text" value={username}  className="form-control"  onInput={(event) => setUsername(event.target.value)}/>
                    
                    <label>Password:</label>
                    <input type="password" value={password} className="form-control"  onInput={(event) => setPassword(event.target.value)}/>
                    
                    <button onClick={updateuser}>sumbit</button><br/>
                    <a href="/login">Already logged user...!</a>
                
                </div>
            </div>
        </div>
    )
}

export default Register
