import { NavLink, useNavigate } from 'react-router-dom';
import "./Login.css"
import Button from '../components/Buttons/Button';
import Input from '../components/Input/Input';
import adminData from '../backendData/adminData';
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import  {setAdmin} from "../store/actions/adminLoginAction";


const AdminLogin = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch()

    const handleLogin = () => {
        console.log("aşama")
        // Kullanıcı adı ve şifreyi kontrol et
        const admin = adminData.find(user => user.userName === username && user.passWord === password);
        if (admin) {
            dispatch(setAdmin(admin))
            // Kullanıcı bulundu, yönlendirme yap
            navigate("/admin/create");
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
            <div className='adminInfo'>Admin Girişi</div>
            <div className="loginComponents">
                <Input name={"Admin Adı"} value={username} onChange={(e) => setUsername(e.target.value)} /> 
            </div>
            <div className="loginComponents">
                <Input name={"Admin Parolası"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="loginComponents">
                <div className='logNavLink' onClick={handleLogin}>
                    <Button className='logNavLink' bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"}  name={"Login"} />
                </div>
            </div>

        </div>
    </>
    
  );
}

export default AdminLogin;

