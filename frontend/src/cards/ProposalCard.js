
import "./ProposalCard.css"
import testData from "../backendData/testData";
import Web3 from 'web3';
import erc20abi from '../ABI/DaoABI.json';

import { useEffect, useState } from "react";

const ProposalCard = ({ title, description, options, proposalIndex }) => {
    const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);



    const handleOptionClick = (index) => {
        setSelectedOptionIndex(index);
    };

    const pinControl = (index) => {
        let control = false;
        testData.forEach((element, i) => {
            const pinParts = element.pin.split('-');
            console.log("pin kontrol : " + pinParts[1])
            console.log("index kontrol : " + index)
            const pinNumber = parseInt(pinParts[1]);
            console.log("if control : " + pinNumber == index )
            if (pinNumber == index) {
                console.log(`Index ${index} matches with pin of element at index ${i}`);
                testData.splice(i, 1);
                control = true;              
                console.log(`Element at index ${i} removed. Updated testData:`, testData);
            }
        });
        if (control) {
            alert("başarılı")
            voting()
            console.log(testData)
        } else {
            alert("pin bulunamadı")
            console.log(testData)
        }
    };
    

    const handleVotingClick = () =>{
        pinControl(proposalIndex)
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

                    const contractAddress = '0x2Fad597E5503DC9B9f50f0703aB6955eb5104b32';
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
