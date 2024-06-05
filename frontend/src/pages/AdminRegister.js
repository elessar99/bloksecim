import { NavLink, useNavigate } from 'react-router-dom';
import Button from '../components/Buttons/Button';
import Input from '../components/Input/Input';
import "./AdminRegister.css"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import  {setUser} from "../store/actions/loginAction";
import axios from 'axios';

const AdminRegister = () =>{
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [eMail, setEMail] = useState('');
    const [ownerName, setownerName] = useState("");
    const [ownerCategories, setownerCategories] = useState([]);
    const [categori, setcategori] = useState("");
    const navigate = useNavigate();
    const dispatch=useDispatch()
    const handleRegister = () => {
        // Kullanıcı adı ve şifreyi kontrol et
        if (username.length>2 && eMail.length>8 && password.length>2 && ownerName.length>1) {
            // Kullanıcı bulundu, yönlendirme yap
            let admin ={
                userName: username,
                eMail: eMail,
                passWord:password,
                isAdmin: true,
                ownerName: ownerName,
                ownerCategories: ownerCategories
            };
            navigate("/admin");
        }else {
            // Kullanıcı bulunamadı, hata mesajı veya gerekirse başka bir işlem yapılabilir.
            alert("Girilen Veriler Eksik.");
        }
    };
    const addCategori = () =>{
        if(categori.length>0){
            setownerCategories([...ownerCategories, categori]);
            alert(categori+ " categorilere eklendi")
            console.log(ownerCategories)
        }
    }
    const dbRegister = () => {
        async function registerAxios() {
            try {
                const response = await axios.post("http://localhost:3004/adminData", {
                    "userName": username,
                    "passWord": password,
                    "eMail": eMail,
                    "ownerName": ownerName,
                    "ownerCategories": ownerCategories,
                    "isAdmin": true,
                });
                
                console.log(response.data);
                const userAxios = {
                    userName: response.data.username,
                    eMail: response.data.email,
                    categories: response.data.categories,
                    pinList: response.data.pinList
                };
    
                navigate("/admin");
            } catch (error) {
                console.error("Login error:", error.response ? error.response.data : error.message);
            }
        }
    
        registerAxios();
    }

    return (
    <>
        <div className='registerFormA'>
            <div className="registerComponents">
                <Input name={"Kullanıcı Adı"} value={username} onChange={(e) => setUsername(e.target.value)} /> 
            </div>
            <div className="registerComponents">
                <Input name={"Email"} type={"email"} value={eMail} onChange={(e) => setEMail(e.target.value)}/>
            </div>
            <div className="registerComponents">
                <Input name={"Firma Adı"}  value={ownerName} onChange={(e) => setownerName(e.target.value)}/>
            </div>
            <div className="registerComponentsA">
                <Input name={"Kategori ekle"}  value={categori} onChange={(e) => setcategori(e.target.value)}/>
                <div className='addCategoriBtn' onClick={addCategori}>
                   <Button bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"} name={"Ekle"}/> 
                </div>
            </div>
            <div className="registerComponents">
                <Input name={"Parola"} type={"password"} value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="registerComponents">
                <div className={"logNavLink"} onClick={dbRegister}>
                    <Button bgColor={"linear-Gradient(to right, #0044ff, #000a99, #3700ff)"}  name={"Kayıt Ol"}/>
                </div>
            </div>
            <div>
                <NavLink className={"navlink"} to={"/admin/login"}>Bir hesabınız var mı?</NavLink>
            </div>

        </div>
    </>
    
  );
}

export default AdminRegister;