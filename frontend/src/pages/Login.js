import { NavLink, useNavigate } from 'react-router-dom';
import "./Login.css"
import Button from '../components/Buttons/Button';
import Input from '../components/Input/Input';
import { useState } from 'react';
import {useDispatch, useSelector} from "react-redux";
import  {setUser} from "../store/actions/loginAction";
import axios from 'axios';


const Login = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch=useDispatch()

    

    

    const dbLogin = () => {
        async function loginAxios(){
            try {
                await axios.post("http://127.0.0.1:3000/login",{
                    "username":username,
                    "password":password
                }, {
                    withCredentials: true // Bu seçeneği ekleyin
                  }).then((res)=>{
                    console.log(res.data.user)
                    const userAxios ={
                            userName: res.data.user.username,
                            eMail: res.data.user.email,
                            categories: res.data.user.categories,
                            pinList: res.data.user.pinList
                        }
                    dispatch(setUser(userAxios))
                    navigate("/bloksecim");
                })                
            } catch (error) {
                console.error("Login error:", error.response ? error.response.data : error.message);
            }
        }
        loginAxios()
    }

    return (
    <>
        <div className='loginForm'>
            <div className="loginComponents">
                <Input name={"Kullanıcı Adı"} value={username} onChange={(e) => setUsername(e.target.value)} /> 
            </div>
            <div className="loginComponents">
                <Input name={"Parola"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="loginComponents">
                <div className='logNavLink' onClick={dbLogin}>
                    <Button className='logNavLink' bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"}  name={"Giriş Yap"} />
                </div>
            </div>
            <div>
                <NavLink className={"navlink"} to={"register"}>Kayıt olmadınız mı?</NavLink>
            </div>

        </div>
    </>
    
  );
}

export default Login;

