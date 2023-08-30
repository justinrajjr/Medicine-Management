import axios from "axios";
import { useState } from "react"
import { Link ,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "./Auth/checkAuth";

function Add(){
    const [Name,changeName]=useState('');
    const [Uses,changeUses]=useState('');
    const [Price,changePrice]=useState('');
    const [Expiry_date,changeExpiry_date]=useState('');
    const [Quantity,changeQuantity]=useState('');
    var navigate = useNavigate()
    var user = useSelector(store=>store.auth.user);
    
    function handlesubmit(){
        axios.post('http://localhost:8000/medicineshopapi/addapi/',{
                Name: Name,
                Uses: Uses,
                Price: Price,
                Expiry_date: Expiry_date,
                Quantity: Quantity
            },{
                headers:{
                    'Authorization': 'Bearer ' + user.token
                }
            }).then(response=>{
                navigate('/home')
            })
        
    }
    
    return(
        <div className="container mt-5">
           <div className="row ">
            <div className="col-8 offset-2">
                <h2>Add medicine</h2>
                <label>Name:</label>
                <input className="form-control" value={Name} onChange={e=> changeName(e.target.value)}/>
                <label>Uses:</label>
                <input className="form-control"  value={Uses} onChange={e=> changeUses(e.target.value)}/>
                <label>Price:</label>
                <input className="form-control"  value={Price} onChange={e=> changePrice(e.target.value)}/>
                <label>ExpriyDate:</label>
                <input className="form-control" type="date" placeholder="year-mon-date"  value={Expiry_date} onChange={e=> changeExpiry_date(e.target.value)}/>
                <label>Quantity</label>
                <input className="form-control"  value={Quantity} onChange={e=> changeQuantity(e.target.value)}/>
                <button className="btn btn-success" onClick={handlesubmit}>sumbit</button>
                <Link to={'/home'} className="btn btn-info" style={{float:"right"}}>Back</Link>
            </div>
           </div>
        </div>
    )
}

export default checkAuth(Add)