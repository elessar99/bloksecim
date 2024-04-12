import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../components/Buttons/Button';
import Input from '../components/Input/Input';
import "./Register.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  {setUser} from "../store/actions/loginAction";


const Register = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [eMail, setEMail] = useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleRegister = () => {
        // Kullanıcı adı ve şifreyi kontrol et
        if (username.length>2 && eMail.length>8 && password.length>2) {
            // Kullanıcı bulundu, yönlendirme yap
            let user ={
                userName: username,
                eMail: eMail,
                passWord:password,
                categories: [],
                pinList: []
            };
            dispatch(setUser(user))
            navigate("/bloksecim");
            console.log(username + ", " + password);
        }else {
            // Kullanıcı bulunamadı, hata mesajı veya gerekirse başka bir işlem yapılabilir.
            alert("Kullanıcı adı veya şifre yanlış.");
            console.log(username + ", " + password);
        }
    };

    return (
    <>
        <div className='registerForm'>
            <div className="registerComponents">
                <Input name={"User Name"} value={username} onChange={(e) => setUsername(e.target.value)} /> 
            </div>
            <div className="registerComponents">
                <Input name={"Email"} type={"email"} value={eMail} onChange={(e) => setEMail(e.target.value)}/>
            </div>
            <div className="registerComponents">
                <Input name={"Password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="registerComponents">
                <div className={"logNavLink"} onClick={handleRegister}>
                    <Button bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"}  name={"Register"}/>
                </div>
            </div>
            <div>
                <NavLink className={"navlink"} to={"login"}>Haven't you registered yet?</NavLink>
            </div>

        </div>
    </>
    
  );
}

export default Register;