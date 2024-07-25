import React, { useState, useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { RiFileCopyLine } from 'react-icons/ri';
import Web3 from 'web3'; // Asegúrate de tener web3 instalado y configurado correctamente

const web3 = new Web3(Web3.givenProvider);

const levels = [
  { level: 0, amount: 0 },
  { level: 1, amount: 100 },
  { level: 2, amount: 500 },
  { level: 3, amount: 2000 },
  { level: 4, amount: 7000 },
  { level: 5, amount: 25000 },
  { level: 6, amount: 50000 },
  { level: 7, amount: 100000 },
];

const Register = ({ setShowForm }: { setShowForm: (show: boolean) => void }) => {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    level: '1',
    sponsor: '', // Sponsor se manejará internamente en el estado local
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'info' | 'warning' | 'error', message: string } | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [connectingWallet, setConnectingWallet] = useState(false);
  const [requestingAccounts, setRequestingAccounts] = useState(false);
  const [bnbUsdPrice, setBnbUsdPrice] = useState<number | null>(null);

  useEffect(() => {
    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      setIsWalletConnected(true);
    }

    // Lógica para manejar el parámetro ref del referido
    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam) {
      setFormData(prevData => ({ ...prevData, sponsor: refParam }));
    }
  }, []);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
    fetchBnbPriceInUsd();
  }, [alert]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined' && !requestingAccounts) {
        setRequestingAccounts(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
        setIsWalletConnected(true);
        setAlert({ type: 'success', message: 'Wallet connected successfully!' });
      } else {
        throw new Error('MetaMask (or other Web3 provider) is not installed or already processing a request.');
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', message: 'Failed to connect wallet. Please try again.' });
    } finally {
      setRequestingAccounts(false);
    }
  };

  const handleCopyWalletAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setAlert({ type: 'info', message: 'Wallet address copied to clipboard!' });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const fetchBnbPriceInUsd = async () => {
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch BNB price: Network response was not ok.');
      }
      const data = await response.json();
      const bnbPrice = data.binancecoin.usd;
      setBnbUsdPrice(bnbPrice);
    } catch (error) {
      console.error('Failed to fetch BNB price:', error);
      setAlert({ type: 'error', message: 'Failed to fetch BNB price. Please try again later.' });
    }
  };

  const bnbToWei = (bnbAmount: number): string => {
    // Convertir BNB a Wei usando la librería web3.js
    const weiAmount = web3.utils.toWei(String(bnbAmount), 'ether');
    return weiAmount;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!walletAddress) {
      setAlert({ type: 'warning', message: 'Please connect your wallet first.' });
      return;
    }

    if (!bnbUsdPrice) {
      setAlert({ type: 'error', message: 'BNB price not available. Please try again later.' });
      return;
    }

    const selectedLevel = levels.find(level => level.level === Number(formData.level));

    if (!selectedLevel) {
      setAlert({ type: 'error', message: 'Invalid level selected.' });
      return;
    }

    try {
      const amountInUsd = selectedLevel.amount; // El amount en USD del level seleccionado
      const amountInBnb = amountInUsd / bnbUsdPrice; // Convertir USD a BNB
      const amountInWei = bnbToWei(amountInBnb); // Convertir BNB a Wei
      await handlePayment(amountInWei);
      await registerUser();
    } catch (error) {
      console.error('Payment or registration failed', error);
      setAlert({ type: 'error', message: 'Payment or registration failed. Please try again.' });
    }
  };

  const handlePayment = async (amount: string) => {
    try {
      if (typeof window.ethereum === 'undefined' || !walletAddress) {
        throw new Error('MetaMask (or other Web3 provider) is not installed or wallet address not set');
      }

      const transactionParameters = {
        from: walletAddress,
        to: '0xAFa5f9670b6809F7A200DBB4A3E8bfD056c855E8', // Replace with recipient wallet address
        value: amount,
      };

      const transactionHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParameters],
      });

      console.log('Transaction sent:', transactionHash);
      setAlert({ type: 'success', message: 'Payment successful!' });
    } catch (error) {
      console.error('Payment failed', error);
      setAlert({ type: 'error', message: 'Payment failed. Please try again.' });
      throw error;
    }
  };

  const registerUser = async () => {
    try {
      const refLink = `https://dinsy.pro/auth?ref=${formData.username}`;

      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, wallet: walletAddress, refLink }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify({ ...formData, walletAddress }));
        setAlert({ type: 'success', message: 'Registration successful and data saved!' });
        // Redirect to dashboard on successful registration
        window.location.href = '/dashboard';
      } else {
        const errorData = await response.json();
        setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
      }
    } catch (error) {
      console.error('Registration failed', error);
      setAlert({ type: 'error', message: 'Registration failed. Please try again.' });
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r pt-44 pb-14">
      <div className="w-full max-w-lg mx-auto rounded-lg p-8 shadow-xl bg-gray-700 bg-opacity-90 backdrop-blur-lg">
        <h2 className="text-4xl font-bold text-center text-white mb-8">Create an Account</h2>
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label htmlFor="firstName" className="block mb-2 text-sm font-medium text-gray-300">First Name</label>
            <input type="text" id="firstName" name="firstName" className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 focus:outline-none focus:border-indigo-500 text-white"
              required
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-300">Last Name</label>
            <input type="text" id="lastName" name="lastName" className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 focus:outline-none focus:border-indigo-500 text-white"
              required
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">Username</label>
            <input type="text" id="username" name="username" className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 focus:outline-none focus:border-indigo-500 text-white"
              required
              value={formData.username}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="level" className="block mb-2 text-sm font-medium text-gray-300">Select Level</label>
            <select id="level" name="level" className="w-full px-4 py-3 rounded-lg bg-gray-800 border-2 border-gray-600 focus:outline-none focus:border-indigo-500 text-white"
              value={formData.level}
              onChange={handleInputChange}
            >
              {levels.map(level => (
                <option key={level.level} value={level.level}>{`Level ${level.level}`}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-center">
            <button type="submit" className="w-full px-6 py-3 mt-6 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-lg font-semibold shadow-md focus:outline-none">Register</button>
          </div>
        </form>

        {alert && (
          <Stack sx={{ width: '100%' }} spacing={2} className="mt-4">
            <Alert severity={alert.type} onClose={() => setAlert(null)}>
              {alert.message}
            </Alert>
          </Stack>
        )}

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">Already have an account? <span className="cursor-pointer text-indigo-500" onClick={() => setShowForm(false)}>Log in</span></p>
        </div>
      </div>

      {!isWalletConnected ? (
        <div className="fixed bottom-10 right-10 bg-gray-700 bg-opacity-90 backdrop-blur-lg p-4 rounded-lg text-center">
          <p className="text-white">Connect your wallet to proceed:</p>
          <button
            onClick={connectWallet}
            className={`mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white text-lg font-semibold shadow-md focus:outline-none ${connectingWallet ? 'opacity-50 cursor-wait' : 'hover:from-yellow-600 hover:to-yellow-700'}`}
          >
            {connectingWallet ? 'Connecting...' : 'Connect Wallet'}
          </button>
          {walletAddress && (
            <div className="mt-2 flex justify-center items-center space-x-2">
              <p className="text-gray-400">Your connected wallet:</p>
              <div className="flex items-center">
                <p className="text-yellow-500 truncate">{walletAddress}</p>
                <RiFileCopyLine className="text-gray-400 cursor-pointer hover:text-yellow-500" onClick={handleCopyWalletAddress} />
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Register;
