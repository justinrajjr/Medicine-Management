import axios from "axios"
import { useState , useEffect ,useCallback} from "react"
import { useSelector,useDispatch } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import { removeUser } from "../store/authslice";
import checkAuth from "./Auth/checkAuth";

function Medlist(){
    
    const [med,medchange] = useState([]);
    var user = useSelector(store=>store.auth.user);
    var navigate = useNavigate();
    var dispatch = useDispatch();
    
    const fetchmedicine = useCallback(() => {
      if (user && user.token) {
        axios.get('http://localhost:8000/medicineshopapi/list_medicine/', {
          headers: { 'Authorization': 'Bearer ' + user.token }
        })
        .then(response => {
          console.log("API Response:", response.data);
          medchange(response.data);
        })
        .catch(error => {
          console.log("Error:", error);
          console.log('Authorization Header:', 'Bearer ' + user.token);
        });
      }
    }, [user]);
    
    useEffect(() => {
      fetchmedicine(); 
      
    }, [user, fetchmedicine]);
    

    function Removefunction(id) {
        if (user && user.token) {
          const confirmRemove = window.confirm("Are you sure you want to remove this medicine?");
          if (!confirmRemove) {
            return;
          }
    
          axios.delete(`http://localhost:8000/medicineshopapi/deleteapi/${id}`, {
            headers: { 'Authorization': 'Bearer ' + user.token }
          })
            .then(response => {
              medchange(prevMeddata => prevMeddata.filter(item => item.id !== id));
              alert("Medicine removed successfully!");
            })
            .catch(error => {
              console.log("Error: ", error);
              alert("Failed to remove medicine.");
            });
        }
      }

      function logout(){
        if(user){
            axios.post('http://localhost:8000/medicineshopapi/logout_api/',{},{
               headers:{'Authorization':"Bearer "+ user.token}
            });
            dispatch(removeUser());
            navigate('/login');
        }
    }


    const LoadEdit = (id) => {
        navigate('/edit/' + id);
      };

    const LoadDetail = (id) => {
        navigate("/view/" + id);
      };
    


    return (
        <div className="container mt-5">
            <h2>Medicalstore</h2><br/>
            <Link to={'/add'} className="btn btn-success" style={{float:'left'}} >Add</Link>
            <Link onClick={logout} className="btn btn-danger" style={{float:'right'}} >Logout</Link>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Uses</th>
                        <th>Price</th>
                        <th>ExpriyDate</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {med && med.map(medItem=>(
                        <tr key={medItem.id}>
                          
                            <td>{medItem.Name}</td>
                            <td>{medItem.Uses}</td>
                            <td>{medItem.Price}</td>
                            <td>{medItem.Expiry_date}</td>
                            <td>{medItem.Quantity}</td>
                            <td>
                                <Link onClick={() => { LoadEdit(medItem.id) }} className="btn btn-warning">Edit</Link>
                                <Link onClick={() => { LoadDetail(medItem.id) }} className="btn btn-info">View</Link>
                                <Link onClick={() => { Removefunction(medItem.id) }} className="btn btn-danger">Delete</Link>
                            </td>
                        </tr>
                    ))}
                    
                </tbody>
            </table>
             
        </div>
    );
}

export default  checkAuth(Medlist)