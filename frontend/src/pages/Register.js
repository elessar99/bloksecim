import { NavLink } from 'react-router-dom';
import Button from '../components/Buttons/Button';
import Input from '../components/Input/Input';
import "./Register.css"
const Register = () =>{


    return (
    <>
        <div className='registerForm'>
            <div className="registerComponents">
                <Input name={"User Name"}/> 
            </div>
            <div className="registerComponents">
                <Input name={"Email"} type={"email"}/>
            </div>
            <div className="registerComponents">
                <Input name={"Password"} type={"password"}/>
            </div>
            <div className="registerComponents">
                <NavLink className={"logNavLink"} to={"/login"}>
                    <Button bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"}  name={"Register"}/>
                </NavLink>
            </div>
            <div>
                <NavLink className={"navlink"} to={"login"}>Haven't you registered yet?</NavLink>
            </div>

        </div>
    </>
    
  );
}

export default Register;