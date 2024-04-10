import "./LogRegPage.css"
import { useLocation } from "react-router-dom";
import '../App.css';
import Login from "./Login";
import Register from "./Register";
const LogRegPage = () =>{
  const location = useLocation();
  let component;
  if(location.pathname === "/") {
    component = <Login/>;
  }else if (location.pathname === "/login") {
    component = <Login />;
  }else if (location.pathname === "/register") {
    component = <Register />;
  }
    return (
    <>
    <div className="logRegPage">
      {component}
    </div>
    </>
    
  );
}

export default LogRegPage;

