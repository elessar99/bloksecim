
import { useEffect, useState } from "react";
import Web3 from 'web3';
import erc20abi from '../ABI/DaoABI.json';
import ProposalCard from "../cards/ProposalCard"

import "./CreateProposal.css"
import { Result } from "ethers";
import Results from "./Results";
import ResultCard from "../cards/ResultCard";


const CreateProposal = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [votingOwner , setVotingOwner] = useState("")
    const [option1, setOption1] = useState("")
    const [option2, setOption2] = useState("")
    const [option3, setOption3] = useState("")
    const [option4, setOption4] = useState("")
    const [option5, setOption5] = useState("")
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);


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

    const handleCreate = async () => {
        const options = [option1, option2, option3, option4, option5].filter(Boolean);
        try {
            await contract.methods.createProposal(description, votingOwner, title, options).send({ from: account });
            alert("Önerge başarıyla oluşturuldu!");
        } catch (error) {
            console.error("Önerge oluşturma hatası:", error);
            alert("Önerge oluşturulamadı.");
        }
    }

    const handleGet = async () => {
        try {
            const proposal = await contract.methods.getAllProposalsResults().call();
            console.log(proposal);
            alert("Önerge getirme başarılı.");
        } catch (error) {
            console.error("Önerge bilgileri alınamadı:", error);
            alert("Önerge getirilemedi.");
        }
    }





    return(
        <>
        <section>
        <div className="createPage container">
           <div className="optionInfo">
            <h1>Önerge Oluştur</h1>
           </div>
           <div>
           <div className="proposalInput">
                <h1 className="inputInfo">
                Oylama Sahibi
                </h1>
                <input className="createInput" placeholder="Oylama sahibi" value={votingOwner}
                onChange={(e) => setVotingOwner(e.target.value)}
                ></input>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                Önerge Başlığı
                </h1>
                <input className="createInput" placeholder="Önerge başlıgı" value={title}
                onChange={(e) => setTitle(e.target.value)}
                ></input>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                Önerge Acıklaması
                </h1>
                <input className="createInput" placeholder="Önerge acıklaması" value={description}
                onChange={(e) => setDescription(e.target.value)}
                ></input>
            </div>
            <div className="optionInfo">
                Önerge için seçenekler (En az 2 en fazla 5 seçenek girin!)
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                1.Seçenek
                </h1>
                <input className="createInput" placeholder="1.Seçenek" value={option1}
                onChange={(e) => setOption1(e.target.value)}
                ></input>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                2.Seçenek
                </h1>
                <input className="createInput" placeholder="2.Seçenek" value={option2}
                onChange={(e) => setOption2(e.target.value)}
                ></input>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                3.Seçenek
                </h1>
                <input className="createInput" placeholder="3.Seçenek" value={option3}
                onChange={(e) => setOption3(e.target.value)}
                ></input>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                4.Seçenek
                </h1>
                <input className="createInput" placeholder="4.Seçenek" value={option4}
                onChange={(e) => setOption4(e.target.value)}
                ></input>
            </div>
            <div className="proposalInput">
                <h1 className="inputInfo">
                5.Seçenek
                </h1>
                <input className="createInput" placeholder="5.Seçenek" value={option5}
                onChange={(e) => setOption5(e.target.value)}
                ></input>
            </div>
            <div className="btnContainer">
                <button className="createBtn" onClick={handleCreate}>
                    Oluştur
                </button>
            </div>
           </div>
        </div>
        </section>
        </>
    );

}

export default CreateProposal;