import "./LogRegPage.css"
import { useLocation } from "react-router-dom";
import '../App.css';
import Login from "./Login";
import Register from "./Register";
import CreateProposal from "./CreateProposal";
import AdminLogin from "./AdminLogin";
import AdminRegister from "./AdminRegister";
import CreateCategory from "./CreateCategory";
const AdminPage = () =>{
  const location = useLocation();
  let component;
  if(location.pathname === "/admin") {
    component = <AdminLogin/>;
  }else if (location.pathname === "/admin/login") {
    component = <AdminLogin/>;
  }else if (location.pathname === "/admin/register") {
    component = <AdminRegister/>;
  }else if (location.pathname === "/admin/create") {
    component = <CreateProposal/>;
  }else if (location.pathname === "/admin/category") {
    component = <CreateCategory/>;
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

