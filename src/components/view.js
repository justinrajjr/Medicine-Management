import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "./Auth/checkAuth";

const Medicinedetails=() => {
    const { medid } = useParams();
    const [ med , medchange ] = useState({});
    var user=useSelector(store=>store.auth.user)

    useEffect(()=>{
        axios.get(`http://localhost:8000/medicineshopapi/edit_medicine/${medid}/`,
        {headers:{'Authorization':'Bearer '+user.token}})
        .then(response => medchange(response.data))
        .catch(error => console.error(error));
    }, [medid, user.token])


    return(
        <div className="container mt-5">
            <div className="row">
                <div className="col-5 offset-2">
                {med &&   
                    <div>
                        <h2>Medicinedetails</h2>
                        <h3>Medicine name :{med.Name}</h3>
                        <h3>Uses :{med.Uses}</h3>
                        <h3>Price :{med.Price}</h3>
                        <h3>ExpriyDate :{med.Expiry_date}</h3>
                        <h3>Quantity :{med.Quantity}</h3>
                        <Link to={'/home'} className="btn btn-info">Back</Link>
                    </div>
                }    
                </div>
            </div>
        </div>
    )
    
}

export default checkAuth(Medicinedetails);