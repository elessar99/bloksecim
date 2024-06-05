
import "./ProposalCard.css"
import Web3 from 'web3';
import erc20abi from '../ABI/DaoABI.json';
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dellPin } from "../store/actions/dellPinAction";

const ProposalCard = ({ title, description, options, proposalIndex, proposalpin }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const userState = useSelector(state=>state.user)
    const dispatch=useDispatch()



    const handleOptionClick = (index) => {
        setSelectedOptionIndex(index);
    };

    const delpinToDb = (dbPin) => {
        async function delpinAxios(){
            try {
                await axios.delete("http://127.0.0.1:3000/delete-pin",{
                    data: { pin: dbPin },
                    withCredentials: true 
                  }).then((res)=>{
                    console.log(res)
                })                
            } catch (error) {
                console.error("Add category error:", error.response ? error.response.data : error.message);
            }
        }
        delpinAxios()
    }
    
    const pinControl = (pin) => {
        let control = false;
        userState.pinList.forEach((element, i) => {
            const pinParts = element
            if (pinParts == pin) {
                console.log(`Index ${pin} matches with pin of element at index ${i}`);
                dispatch(dellPin(userState,i))                
                control = true;              
            }
        });
        if (control) {
            alert("başarılı")
            voting()
            delpinToDb(pin)
            
        } else {
            alert("pin bulunamadı")
        }
    };

    // const pinControllll = (index) => {
    //     let control = false;
    //     testData.forEach((element, i) => {
    //         const pinParts = element.pin.split('-');
    //         console.log("pin kontrol : " + pinParts[1])
    //         console.log("index kontrol : " + index)
    //         const pinNumber = parseInt(pinParts[1]);
    //         console.log("if control : " + pinNumber == index )
    //         if (pinNumber == index) {
    //             console.log(`Index ${index} matches with pin of element at index ${i}`);
    //             testData.splice(i, 1);
    //             control = true;              
    //             console.log(`Element at index ${i} removed. Updated testData:`, testData);
    //         }
    //     });
    //     if (control) {
    //         alert("başarılı")
    //         voting()
    //         console.log(testData)
    //     } else {
    //         alert("pin bulunamadı")
    //         console.log(testData)
    //     }
    // };
    

    const handleVotingClick = () =>{
        pinControl(proposalpin)
    }


    const voting = async () =>{
        try {
            await contract.methods.voting(selectedOptionIndex, proposalIndex).send({ from: account });
            alert("Önerge getirme başarılı.");
        } catch (error) {
            console.error("Önerge bilgileri alınamadı:", error);
            alert("Önerge getirilemedi.");
        }
    }


    useEffect(() => {
        async function initWeb3() {
            if (window.ethereum) {
                try {
                    await window.ethereum.enable();
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);

                    const contractAddress = '0x6248E0a3411753B5c662EB4b7ebD32bF282AE9a4';
                    const contractAbi = erc20abi;

                    const daoContract = new web3Instance.eth.Contract(contractAbi, contractAddress);
                    setContract(daoContract);
                } catch (error) {
                    console.error("Kullanıcı izin vermedi: ", error);
                }
            }
        };
        initWeb3();
    }, []);

    return (
        <div className="proposalCardBody">
            <h2>Başlık: {title}</h2>
            <p>Açıklama: {description}</p>
            <ul className="options">
                {options.map((option, index) => (

                    <li
                        key={index} 
                        className={index === selectedOptionIndex ? "selected" : ""}
                        onClick={() => handleOptionClick(index)}
                    >
                        Seçenek:
                        {option}
                    </li>
                ))}
            </ul>
            <p>Seçilen seçenek index: {selectedOptionIndex !== null ? selectedOptionIndex : "Henüz seçilmedi"}</p>
            <div>
                <button onClick={handleVotingClick} className="btn-voting" >Oyla</button>
            </div>
        </div>
    );
};

export default ProposalCard;
