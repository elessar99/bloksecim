import { useEffect, useState } from "react";
import "./Results.css"
import testData from "../backendData/testData";
import Web3 from 'web3';
import erc20abi from '../ABI/DaoABI.json';
import ProposalCard from "../cards/ProposalCard"
import ResultCard from "../cards/ResultCard";


const Results = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [ownerControl, setOwnerControl] = useState(null);
    const [proposals, setproposals] = useState([]);

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
                    getProposal(daoContract)


                } catch (error) {
                    console.error("Kullanıcı izin vermedi: ", error);
                }
            }
        };
        initWeb3();

    }, []);

    const getProposal = async (contract) => {
        try {
            const proposal = await contract.methods.getAllProposalsResults().call();
            console.log(proposal);
            setproposals(proposal);
        } catch (error) {
            console.error("Önerge bilgileri alınamadı:", error);
        }
    }

    return(
        <>
        <section>
        <div className='results container'>
            {proposals && proposals.length > 0 ? (
                proposals.map((item) => {
                    return(
                    <div>
                        <ResultCard
                        title={item.title}
                        description={item.description}
                        options={item.optionsDescriptions}
                        voteCounts={item.voteCounts}
                        />
                    </div>
                    )
                })
            ) : (
                <div>
                    <p>Mevcut oylama yok.</p>
                </div>
            )}
        </div>
        </section>
        </>
    );
}

export default Results;