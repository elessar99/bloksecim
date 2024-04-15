import Cookies from "universal-cookie";
import { useDispatch, useSelector } from "react-redux";
import "./ConnectionCard.css"
import { useEffect, useState } from "react";
import { addPinToCategory } from "../store/actions/addCategoryAction";
import axios from "axios";


const ConnectionCard = ({ ownerName, votingCategory, pin }) => {

    const dispatch = useDispatch();
    const selector = useSelector(state => state.user);
    const [user, setUser] = useState(selector);
    const [pinControl, setPinControl] = useState(false);
    const [resPage, setResPage] = useState(true);

    const control = () => {
        if (user.categories.length > 0) {
            user.categories.forEach(e => {
                if (e==pin) {
                    setPinControl(true)
                }
            });
        } else {
            setPinControl(false)
        }
    }
    const addCategory = ()=>{
        dispatch(addPinToCategory(user, pin))
        setResPage(!resPage)
        control()
        window.location.reload();
    }
    const addCategoryToDb = () => {
        async function addCategoryAxios(){
            try {
                await axios.post("http://127.0.0.1:3000/add-category",{
                    "category":pin,
                }).then((res)=>{
                    addCategory()
                })                
            } catch (error) {
                console.error("Add category error:", error.response ? error.response.data : error.message);
            }
        }
        addCategoryAxios()
    }

    useEffect(() => {
        control();
    }, [user.categories, pin]);


    useEffect(() => {
        control();
    }, []);

    return(
        <>
        <div className="ConnectionCard">
            <div className="ConnectionInfo">
                <div className="connectionH">Owner Name :</div>
                <div>{ownerName}</div>
            </div>
            <div className="ConnectionInfo">
                <div className="connectionH">Voting Category :</div>
                <div>{votingCategory}</div>
            </div>
            <div className="ConnectionBtn">
                {pinControl?(
                    <div className="joined" >Joined</div>
                ):(<button className="buttonJ" onClick={addCategoryToDb}>Join</button>)}
                
            </div>
        </div>
        </>
    );
}

export default ConnectionCard;