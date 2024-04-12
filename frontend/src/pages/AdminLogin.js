import { NavLink, useNavigate } from 'react-router-dom';
import "./Login.css"
import Button from '../components/Buttons/Button';
import Input from '../components/Input/Input';
import userData from '../backendData/userData';
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import  {setUser} from "../store/actions/loginAction";


const AdminLogin = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const handleLogin = () => {
        console.log("aşama")
        // Kullanıcı adı ve şifreyi kontrol et
        const user = userData.find(user => user.userName === username && user.passWord === password);
        if (user) {
            dispatch(setUser(user))
            // Kullanıcı bulundu, yönlendirme yap
            navigate("/bloksecim");
            console.log(username + ", " + password);
        } else {
            // Kullanıcı bulunamadı, hata mesajı veya gerekirse başka bir işlem yapılabilir.
            alert("Kullanıcı adı veya şifre yanlış.");
            console.log(username + ", " + password);
        }
    };

    return (
    <>
        <div className='loginForm'>
            <div className="loginComponents">
                <Input name={"User Name"} value={username} onChange={(e) => setUsername(e.target.value)} /> 
            </div>
            <div className="loginComponents">
                <Input name={"Password"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="loginComponents">
                <div className='logNavLink' onClick={handleLogin}>
                    <Button className='logNavLink' bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"}  name={"Login"} />
                </div>
            </div>
            <div>
                <NavLink className={"navlink"} to={"register"}>Haven't you registered yet?</NavLink>
            </div>

        </div>
    </>
    
  );
}

export default AdminLogin;

