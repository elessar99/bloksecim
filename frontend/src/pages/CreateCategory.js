
import { useEffect, useState } from "react";
import Web3 from 'web3';
import erc20abi from '../ABI/DaoABI.json';
import ProposalCard from "../cards/ProposalCard"
import axios from "axios";
import { useSelector } from "react-redux";
import "./CreateProposal.css"
import { Result } from "ethers";
import Results from "./Results";
import ResultCard from "../cards/ResultCard";


const CreateCategory = () => {
    const [pinName, setpinName] = useState("");
    const [owner, setowner] = useState("");
    const [category, setcategory] = useState("");
    const adminState = useSelector(state=>state.admin)

    const createCategory = () => {
        if (pinName.length>1 && adminState.ownerName.length>2 && category.length>2) {
            
        async function addpinAxios(){
            const number = Math.floor(100 + Math.random() * 900);
            const pin = (pinName+number)
            try {
                const response = await axios.post("http://localhost:3004/VCData", {
                    "pin": pin,
                    "owner": adminState.ownerName,
                    "category": category,
                });
            } catch (error) {
                console.error("Login error:", error.response ? error.response.data : error.message);
            }
            alert("Kategori Pin'iniz " + pin)
        }
        addpinAxios()

        } else {
            alert("Eksik Veri")
    }}


    return(
        <>
        <section>
        <div className="createPage container">
           <div className="optionInfo">
            <h1>Categori Oluştur</h1>
           </div>
           <div>
           <div className="proposalInput">
                <h1 className="inputInfo">
                Oylama Sahibi
                </h1>
                <div className="createInput" placeholder="Oylama sahibi" >
                    {adminState.ownerName}
                </div>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                Kategori Adı
                </h1>
                <input className="createInput" placeholder="Önerge Kategorisi" value={category}
                onChange={(e) => setcategory(e.target.value)}>
                </input>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                Pin Adı
                </h1>
                <input className="createInput" placeholder="Önerge başlıgı" value={pinName} 
                onChange={(e)=> setpinName(e.target.value)}></input>
            </div>

            <div className="btnContainer">
                <button className="createBtn" onClick={createCategory}>
                    Ekle
                </button>
            </div>
           </div>
        </div>
        </section>
        </>
    );

}

export default CreateCategory;