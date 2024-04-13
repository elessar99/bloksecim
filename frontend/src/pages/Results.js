import { useEffect, useState } from "react";
import "./Results.css"
import Web3 from 'web3';
import erc20abi from '../ABI/DaoABI.json';
import ProposalCard from "../cards/ProposalCard"
import ResultCard from "../cards/ResultCard";
import { useSelector } from "react-redux";


const Results = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [ownerControl, setOwnerControl] = useState(null);
    const [proposals, setproposals] = useState([]);
    const userState = useSelector(state=>state.user)

    useEffect(() => {
        async function initWeb3() {
            if (window.ethereum) {
                try {
                    await window.ethereum.enable();
                    const web3Instance = new Web3(window.ethereum);
                    setWeb3(web3Instance);
                    const accounts = await web3Instance.eth.getAccounts();
                    setAccount(accounts[0]);

                    const contractAddress = '0x64855d75C3a601057582C28F8c304d3eE8369F1d';
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