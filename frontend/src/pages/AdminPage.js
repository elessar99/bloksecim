import "./LogRegPage.css"
import { useLocation } from "react-router-dom";
import '../App.css';
import Login from "./Login";
import Register from "./Register";
import CreateProposal from "./CreateProposal";
import AdminLogin from "./AdminLogin";
const AdminPage = () =>{
  const location = useLocation();
  let component;
  if(location.pathname === "/admin") {
    component = <AdminLogin/>;
  }else if (location.pathname === "/admin/create") {
    component = <CreateProposal/>;
  }
    return (
    <>
    <div className="logRegPage">
      {component}
    </div>
    </>
    
  );
}

export default AdminPage;

