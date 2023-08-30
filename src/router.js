import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login"
import Add from "./components/create";
import Edit from "./components/edit";
import Medicinedetails from "./components/view";

const router = createBrowserRouter([
    { path: '/home', element: <App/> },
    { path: '/', element: <Register/>},
    { path: '/login', element:<Login/>},
    { path: '/add', element:<Add/>},
    { path: '/edit/:medid',element:<Edit/>},
    { path: '/view/:medid',element:<Medicinedetails/>}
    
    
]);

export default router;