import { useEffect, useState } from "react";
import "./Voting.css"
import Web3 from 'web3';
import erc20abi from '../ABI/DaoABI.json';
import ProposalCard from "../cards/ProposalCard"
import { useSelector } from "react-redux";


const Voting = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [ownerControl, setOwnerControl] = useState(null);
    const [proposals, setproposals] = useState([]);
    const userState = useSelector(state=>state.user)


    // const ownerList = () => {
    //     const owners = testData.map(item => item.owner);
    //     return [...new Set(owners)]; 
    // };

    
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
                    getProposal(daoContract)


                } catch (error) {
                    console.error("Kullanıcı izin vermedi: ", error);
                }
            }
        };
        initWeb3();

    }, []);


    const getProposal = async (contract) =>{
        try {
            const proposal = await contract.methods.getActiveProposals().call();
            console.log(proposal);
        
            const cleanProposals = (proposals, owners) => {
                return proposals.filter(proposal => owners.includes(proposal.pin));
            };
            const matchedProposals = cleanProposals(proposal, userState.pinList);
            console.log(userState.pinList); 
            setproposals(matchedProposals);
        } catch (error) {
            console.error("Önerge bilgileri alınamadı:", error);
        }
    }

    return(
        <>
        <section>
        <div className="container">
            {proposals && proposals.length > 0 ? (
                proposals.map((item) => {
                    return(
                    <div>
                        <ProposalCard
                        title={item.title}
                        description={item.description}
                        options={item.optionsDescriptions}
                        proposalIndex={item.proposalIndex}
                        proposalpin={item.pin}
                        />
                    </div>
                    )
                })
            ) : (
                <div>
                    <p className="voting-header">Şu anda mevcut oylama yok.</p>
                </div>
            )}
        </div>
        </section>
        </>
    );
}

export default Voting;