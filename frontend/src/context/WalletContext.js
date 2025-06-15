import { ethers } from 'ethers';
import { createContext, useState } from "react";
const WalletContext = createContext();
export function WalletContextProvider({ children }) {
    const [errorMessage, setErrorMessage] = useState(null);
    const [defaultAccount, setDefaultAccount] = useState(null);
    const [accountBalance, setAccountBalance] = useState(null);
    const [isWalletConnected, setIsWalletConnected] = useState(null);
    const [conBtnText, setConBtnText] = useState('');

    async function connectWalletHandler() {
        try {
            if (window.ethereum && window.ethereum.isMetaMask) {
                console.log('Metamask uzantısı saptandı.');
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                setDefaultAccount(accounts[0])
                fetchAccountBalance(accounts[0]);
                const abbWallet = accounts[0].substring(0, 3) + '...' + accounts[0].slice(-3);
                setConBtnText(abbWallet);
                setIsWalletConnected(true);
            } else {
                console.log('Metamask uzantısı saptanamadı.');
                setErrorMessage('Metamask uzantısı saptanamadı.');
            };
        } catch (error) {
            console.error(error);
            setErrorMessage(error.message);
        };
    };

    async function fetchAccountBalance(newAccount) {
        if (window.ethereum && window.ethereum.isMetaMask) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                if (accounts.length > 0) {
                    const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
                    const formattedBalance = ethers.formatEther(balance);
                    setAccountBalance(formattedBalance);
                } else {
                    setErrorMessage('MetaMask hesap bulunamadı.');
                }
            } catch (error) {
                console.error(error);
                setErrorMessage(error.message);
            };
        } else {
            setErrorMessage('MetaMask uzantısı bulunamadı veya etkin değil.');
        };
    }

    function disconnectWalletHandler() {
        if (window.ethereum && window.ethereum.isMetaMask) {
            setIsWalletConnected(false);
            setDefaultAccount(null);
            setAccountBalance(null);
            setConBtnText('');
        } else {
            console.log('Metamask uzantısı saptanamadı.');
            setErrorMessage('Metamask uzantısı saptanamadı.');
        };
    };
    // Triggers when the user having changes between the accounts.
    function handleAccountChange(newAccount) {
        setDefaultAccount(newAccount[0]);
        fetchAccountBalance(newAccount[0]);
        const abbWallet = newAccount[0].substring(0, 3) + '...' + newAccount[0].slice(-3);
        setConBtnText(abbWallet);
    };
    // Triggers when the user change chain.
    function handleChainChange() {
        window.location.reload();
    };

    // Listening events.
    window.ethereum.on('accountsChanged', handleAccountChange);
    window.ethereum.on('chainChanged', handleChainChange);
    console.log(defaultAccount);
    return (
        <WalletContext.Provider
            value={{
                errorMessage,
                setErrorMessage,
                defaultAccount,
                setDefaultAccount,
                accountBalance,
                setAccountBalance,
                connectWalletHandler,
                isWalletConnected,
                setIsWalletConnected,
                conBtnText,
                setConBtnText,
                disconnectWalletHandler
            }}>
            {children}
        </WalletContext.Provider>
    )
};

export default WalletContext;




// import { ethers } from 'ethers';
// import { createContext, useState, useEffect } from "react";

// const WalletContext = createContext();

// export function WalletContextProvider({ children }) {
//     const [errorMessage, setErrorMessage] = useState(null);
//     const [defaultAccount, setDefaultAccount] = useState(null);
//     const [accountBalance, setAccountBalance] = useState(null);
//     const [isWalletConnected, setIsWalletConnected] = useState(null);
//     const [conBtnText, setConBtnText] = useState('');

//     async function connectWalletHandler() {
//         try {
//             if (window.ethereum && window.ethereum.isMetaMask) {
//                 console.log('Metamask uzantısı saptandı.');
//                 const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
//                 setDefaultAccount(accounts[0]);
//                 fetchAccountBalance(accounts[0]);
//                 const abbWallet = accounts[0].substring(0, 3) + '...' + accounts[0].slice(-3);
//                 setConBtnText(abbWallet);
//                 setIsWalletConnected(true);
//             } else {
//                 console.log('Metamask uzantısı saptanamadı.');
//                 setErrorMessage('Metamask uzantısı saptanamadı.');
//             }
//         } catch (error) {
//             console.error(error);
//             setErrorMessage(error.message);
//         }
//     }

//     async function fetchAccountBalance(newAccount) {
//         if (window.ethereum && window.ethereum.isMetaMask) {
//             try {
//                 const accounts = await window.ethereum.request({ method: 'eth_accounts' });
//                 if (accounts.length > 0) {
//                     const balance = await window.ethereum.request({ method: 'eth_getBalance', params: [accounts[0], 'latest'] });
//                     const formattedBalance = ethers.formatEther(balance);
//                     setAccountBalance(formattedBalance);
//                 } else {
//                     setErrorMessage('MetaMask hesap bulunamadı.');
//                 }
//             } catch (error) {
//                 console.error(error);
//                 setErrorMessage(error.message);
//             }
//         } else {
//             setErrorMessage('MetaMask uzantısı bulunamadı veya etkin değil.');
//         }
//     }

//     function disconnectWalletHandler() {
//         if (window.ethereum && window.ethereum.isMetaMask) {
//             setIsWalletConnected(false);
//             setDefaultAccount(null);
//             setAccountBalance(null);
//             setConBtnText('');
//         } else {
//             console.log('Metamask uzantısı saptanamadı.');
//             setErrorMessage('Metamask uzantısı saptanamadı.');
//         }
//     }

//     function handleAccountChange(newAccount) {
//         if (newAccount && newAccount.length > 0) {
//             setDefaultAccount(newAccount[0]);
//             fetchAccountBalance(newAccount[0]);
//             const abbWallet = newAccount[0].substring(0, 3) + '...' + newAccount[0].slice(-3);
//             setConBtnText(abbWallet);
//         }
//     }

//     function handleChainChange() {
//         window.location.reload();
//     }

//     useEffect(() => {
//         if (window.ethereum && window.ethereum.isMetaMask) {
//             window.ethereum.on('accountsChanged', handleAccountChange);
//             window.ethereum.on('chainChanged', handleChainChange);
//         } else {
//             console.log('MetaMask mevcut değil.');
//         }

//         // Cleanup event listeners on component unmount
//         return () => {
//             if (window.ethereum && window.ethereum.isMetaMask) {
//                 window.ethereum.removeListener('accountsChanged', handleAccountChange);
//                 window.ethereum.removeListener('chainChanged', handleChainChange);
//             }
//         };
//     }, []);

//     return (
//         <WalletContext.Provider
//             value={{
//                 errorMessage,
//                 setErrorMessage,
//                 defaultAccount,
//                 setDefaultAccount,
//                 accountBalance,
//                 setAccountBalance,
//                 connectWalletHandler,
//                 isWalletConnected,
//                 setIsWalletConnected,
//                 conBtnText,
//                 setConBtnText,
//                 disconnectWalletHandler
//             }}>
//             {children}
//         </WalletContext.Provider>
//     );
// };

// export default WalletContext;
