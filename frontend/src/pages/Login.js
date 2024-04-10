import { NavLink } from 'react-router-dom';
import "./Login.css"
import Button from '../components/Buttons/Button';
import Input from '../components/Input/Input';
const Login = () =>{


    return (
    <>
        <div className='loginForm'>
            <div className="loginComponents">
                <Input name={"User Name"}/> 
            </div>
            <div className="loginComponents">
                <Input name={"Password"} type={"password"}/>
            </div>
            <div className="loginComponents">
                <NavLink className={"logNavLink"} to={"/bloksecim"}>
                    <Button bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"}  name={"Login"}/>
                </NavLink>
            </div>
            <div>
                <NavLink className={"navlink"} to={"register"}>Haven't you registered yet?</NavLink>
            </div>

        </div>
    </>
    
  );
}

export default Login;

