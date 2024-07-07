import React, { useState, useEffect } from 'react';
import { useETHProvider, useBTCProvider, useConnectModal } from '@particle-network/btc-connectkit';
import { ethers } from 'ethers';
import './App.css';

const NetworkInfo = ({ btcNetwork, bsquaredNetwork }) => {
  return (
    <>
      <div className="fixed top-4 right-4 bg-purple-800 text-white p-2 rounded-lg shadow-lg">
        <span className="text-lg font-bold">BTC network: {btcNetwork}</span>
      </div>
      <div className="fixed top-4 left-4 bg-purple-800 text-white p-2 rounded-lg shadow-lg">
        <span className="text-lg font-bold">Bsquared network: {bsquaredNetwork}</span>
      </div>
    </>
  );
};

const App = () => {
  const { provider, account, chainId } = useETHProvider();
  const { openConnectModal, disconnect } = useConnectModal();
  const { accounts, sendBitcoin, getNetwork } = useBTCProvider();

  const [balanceEVM, setBalanceEVM] = useState(null);
  const [balanceBTC, setBalanceBTC] = useState(null);
  const [btcNetwork, setBtcNetwork] = useState('');
  const [copiedAddress, setCopiedAddress] = useState(null);
  const [evmAddress, setEvmAddress] = useState('');
  const [btcAddress, setBtcAddress] = useState('');

  const customProvider = new ethers.providers.Web3Provider(provider, "any");

  function truncateAddress(address) {
    return `${address.slice(0, 6)}...${address.slice(address.length - 4)}`;
  }

  useEffect(() => {
    if (accounts.length > 0) {
      (async () => {
        const balanceResponse = await customProvider.getBalance(account);
        setBalanceEVM(parseFloat(ethers.utils.formatEther(balanceResponse)).toFixed(3));

        const network = await getNetwork();
        setBtcNetwork(network);

        const networkSuffix = network === 'livenet' ? 'main' : 'test3';
        fetch(`https://api.blockcypher.com/v1/btc/${networkSuffix}/addrs/${accounts[0]}/balance`)
          .then(response => response.json())
          .then(data => setBalanceBTC(data.balance / 1e8));
      })();
    }
  }, [accounts, account]);

  const handleLogin = () => {
    openConnectModal();
  };

  const executeTxEvm = async () => {
    const signer = customProvider.getSigner();

    const tx = {
      to: evmAddress,
      value: ethers.utils.parseEther('0.01'),
      data: "0x"
    };

    const txResponse = await signer.sendTransaction(tx);
    const txReceipt = await txResponse.wait();

    alert(`Transaction Successful. Transaction Hash: ${txReceipt.transactionHash}`);
  };

  const executeTxBtc = async () => {
    const hash = await sendBitcoin(btcAddress, 1);

    alert(`Transaction Successful. Transaction Hash: ${hash}`);
  };

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const bsquaredNetwork = chainId === 1123 ? 'testnet' : chainId === 223 ? 'mainnet' : 'unknown';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <NetworkInfo btcNetwork={btcNetwork} bsquaredNetwork={bsquaredNetwork} />
      <div className="flex space-x-4 mb-8">
        <img src="https://i.imgur.com/EerK7MS.png" alt="Logo 1" className="w-64 h-64 object-contain" />
        <img src="https://i.imgur.com/I3rmeOX.png" alt="Logo 2" className="w-64 h-64 object-contain" />
      </div>
      {!account ? (
        <button
          className="flex items-center justify-center bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-6 rounded-full"
          onClick={handleLogin}
        >
          <img src="https://i.imgur.com/aTxNcXk.png" alt="Bitcoin Logo" className="w-6 h-6 mr-2" />
          Connect
        </button>
      ) : (
        <div className="flex justify-center space-x-4 w-full max-w-5xl mb-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 max-w-xs w-full flex flex-col">
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <span className="text-lg font-bold text-white">EVM equivalent generated address</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-semibold text-white">{balanceEVM} BTC</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{truncateAddress(account)}</span>
                  <button onClick={() => handleCopy(account)} className="text-gray-400 hover:text-white">
                    {copiedAddress === account ? (
                      <span className="text-green-500">Copied!</span>
                    ) : (
                      <span className="text-gray-400 hover:text-white">Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <span className="text-lg text-white mb-2">Send 0.01 BTC to</span>
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <label htmlFor="evmAddress" className="text-lg font-bold text-white">Enter EVM Address</label>
              <input
                type="text"
                id="evmAddress"
                className="w-full p-2 mt-2 border border-gray-600 rounded bg-gray-900 text-white"
                value={evmAddress}
                onChange={(e) => setEvmAddress(e.target.value)}
                placeholder="0x..."
              />
            </div>
            <button
              className="w-full bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 rounded-full mt-2"
              onClick={executeTxEvm}
            >
              Execute EVM Transaction
            </button>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg flex-1 max-w-xs w-full flex flex-col">
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <span className="text-lg font-bold text-white">BTC Address address</span>
              <div className="flex items-center justify-between mt-2">
                <span className="text-lg font-semibold text-white">{balanceBTC} BTC</span>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-400">{truncateAddress(accounts[0])}</span>
                  <button onClick={() => handleCopy(accounts[0])} className="text-gray-400 hover:text-white">
                    {copiedAddress === accounts[0] ? (
                      <span className="text-green-500">Copied!</span>
                    ) : (
                      <span className="text-gray-400 hover:text-white">Copy</span>
                    )}
                  </button>
                </div>
              </div>
            </div>
            <span className="text-lg text-white mb-2">Send 1 Sats to</span>
            <div className="w-full p-4 bg-gray-800 rounded-lg mb-4">
              <label htmlFor="btcAddress" className="text-lg font-bold text-white">Enter BTC Address</label>
              <input
                type="text"
                id="btcAddress"
                className="w-full p-2 mt-2 border border-gray-600 rounded bg-gray-900 text-white"
                value={btcAddress}
                onChange={(e) => setBtcAddress(e.target.value)}
                placeholder="bc1..."
              />
            </div>
            <button
              className="w-full bg-orange-500 hover:bg-orange-800 text-white font-bold py-2 rounded-full mt-2"
              onClick={executeTxBtc}
            >
              Execute BTC Transaction
            </button>
          </div>
        </div>
      )}
      {account && (
        <button
          className="w-32 bg-red-700 hover:bg-red-800 text-white font-bold py-2 rounded-full"
          onClick={disconnect}
        >
          Logout
        </button>
      )}
    </div>
  );
};

export default App;
