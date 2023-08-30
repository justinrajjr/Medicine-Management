import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux";
import checkAuth from "./Auth/checkAuth";

function Edit(){
    const {medid} = useParams();
    const [ Name,changeName] = useState("");
    const [ Uses,changeUses] = useState("");
    const [ Price,changePrice] = useState("");
    const [ Expiry_date,changeExpiry_date] = useState("");
    const [ Quantity,changeQuantity] = useState("");
    var user=useSelector(store=>store.auth.user)
    var navigate = useNavigate()

    useEffect(() => {
       if(user && user.token){
        axios.get(`http://localhost:8000/medicineshopapi/edit_medicine/${medid}/`, {
            headers: { 'Authorization': 'Bearer ' + user.token }
        }).then(response => {
            changeName(response.data.Name);
            changeUses(response.data.Uses);
            changePrice(response.data.Price);
            changeExpiry_date(response.data.Expiry_date);
            changeQuantity(response.data.Quantity);
        }).catch(error => {
            if (error.response) {
                console.error("Response Status:", error.response.status);
                console.error("Response Data:", error.response.data);
            } else {
                console.error("Error fetching data:", error.message);
            }
        });
    }
    }, [medid,user]);

    function handlesubmit(e) {
        e.preventDefault();
        axios.put(`http://localhost:8000/medicineshopapi/edit_medicine/${medid}/`, {
            Name: Name,
            Uses: Uses,
            Price: Price,
            Expiry_date: Expiry_date,
            Quantity: Quantity,
        }, {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        }).then(response => {
            navigate('/home');
        }).catch(error => {
            console.error("Error updating medicine:", error);
           
        });
    }
    
    

    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-8 offset-2">
                    <h2>Update medicine</h2>
                    <label>Name:</label>
                    <input className="form-control" value={Name}  onChange={(e) => changeName(e.target.value)}/>
                    <label>Uses:</label>
                    <input className="form-control" value={Uses}  onChange={(e) => changeUses(e.target.value)}/>
                    <label>Price:</label>
                    <input className="form-control" value={Price}  onChange={(e) => changePrice(e.target.value)}/>
                    <label>ExpriyDate:</label>
                    <input className="form-control" value={Expiry_date}  onChange={(e) => changeExpiry_date(e.target.value)}/>
                    <label>Quantity:</label>
                    <input className="form-control" value={Quantity}  onChange={(e) => changeQuantity(e.target.value)}/>
                    <button className="btn btn-success" onClick={handlesubmit}>sumbit</button>
                    <Link to={'/home'} className="btn btn-info" style={{float:'right'}}>Back</Link>
                </div>
            </div>
        </div>
    )
}

export default checkAuth(Edit)