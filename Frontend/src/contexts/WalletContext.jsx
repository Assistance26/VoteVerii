import React, { createContext, useState, useEffect, useContext } from 'react';
import Web3 from 'web3';
import ElectionManagerABI from '../web3/ElectionManagerABI.json';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const _web3 = new Web3(window.ethereum);
        setWeb3(_web3);

        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);

        const _contract = new _web3.eth.Contract(
          ElectionManagerABI.abi,
          '0xB3c76c8d6F247790772c5B1b3F89D7CF3b34d6b6'
        );
        setContract(_contract);

        window.ethereum.on('accountsChanged', (accs) => setAccount(accs[0]));
        window.ethereum.on('chainChanged', () => window.location.reload());
      } else {
        alert('Please install MetaMask');
      }
    };

    init();
  }, []);

  return (
    <WalletContext.Provider value={{ account, web3, contract }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => useContext(WalletContext);