import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/authslice";


function Login(){
    var [username,setUsername] = useState('');
    var [password,setPassword] = useState('');
    var navigate = useNavigate();
    const dispatch = useDispatch();

    function attemptLogin() {
        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);
    
        axios.post('http://localhost:8000/medicineshopapi/loginapi/', formData)
          .then(response => {
            const user = {
              username: username,
              token: response.data.token
            };
            dispatch(setUser(user));
            navigate('/home');
          })
          .catch(error => {
            console.error("Login error:", error);
            console.log("Error data:", error.response.data);
            window.alert("Wrong username,password", error.response.data)
          });
      }


 return (
    <div className="container">
        <div className="row mt-5">
            <div className="col-8 offset-2">
                <h1>Login</h1>
                <label>Username:</label>
                <input className="form-control" type="text" value={username} onInput={(event)=>setUsername(event.target.value)} />
                <label>Password:</label>
                <input className="form-control" type="text" value={password} onInput={(event)=>setPassword(event.target.value)} /><br/>
                <button onClick={attemptLogin}>Submit</button><br/>
                <a href="/">Click here for register</a>
            </div>
        </div>
    </div>

 )

    
}

export default Login;