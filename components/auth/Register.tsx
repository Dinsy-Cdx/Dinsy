import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Alert, TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { RiFileCopyLine } from 'react-icons/ri';
import { motion } from 'framer-motion';


const getLevels = (): Level[] => [
  { level: 0, amountUSD: '1' },
  { level: 1, amountUSD: '100' },
  { level: 2, amountUSD: '500' },
  { level: 3, amountUSD: '2000' },
  { level: 4, amountUSD: '7000' },
  { level: 5, amountUSD: '25000' },
  { level: 6, amountUSD: '50000' },
  { level: 7, amountUSD: '100000' },
];

const USD_TO_BNB = 593; // Static BNB price in USD

interface Level {
  level: number;
  amountUSD: string;
  customAmountUSD?: string;
}

const Register: React.FC<{ setShowForm: React.Dispatch<React.SetStateAction<boolean>> }> = ({ setShowForm }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    level: '0',
    sponsor: '',
    customAmountUSD: ''
  });
  const [alert, setAlert] = useState<{ type: 'success' | 'error' | 'warning' | 'info'; message: string } | null>(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sponsorWallet, setSponsorWallet] = useState<string | null>(null);
  const [levels, setLevels] = useState<Level[]>([]);

  useEffect(() => {
    const fetchLevels = async () => {
      try {
        const levelsData = getLevels();
        console.log('Levels Data:', levelsData); // Log levels data for debugging
        setLevels(levelsData);
      } catch (error) {
        console.error('Failed to fetch levels:', error);
        setAlert({ type: 'error', message: 'Failed to fetch levels. Please check console for details.' });
      }
    };

    fetchLevels();

    const storedWalletAddress = localStorage.getItem('walletAddress');
    if (storedWalletAddress) {
      setWalletAddress(storedWalletAddress);
      setIsWalletConnected(true);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const refParam = urlParams.get('ref');
    if (refParam) {
      setFormData(prevData => ({ ...prevData, sponsor: refParam }));
    }
  }, []);

  useEffect(() => {
    const fetchSponsorWallet = async () => {
      if (formData.sponsor) {
        try {
          const response = await axios.get(`/api/getsponsorWallets?username=${formData.sponsor}`);
          if (response.data.wallet) {
            setSponsorWallet(response.data.wallet || '');
            setAlert({ type: 'info', message: `Sponsor Wallet Existente: ${response.data.wallet}` });
          } else {
            setSponsorWallet(null);
            setAlert({ type: 'error', message: 'Sponsor not found' });
          }
        } catch (error) {
          console.error('Error fetching sponsor wallet:', error);
          setAlert({ type: 'error', message: 'Error fetching sponsor wallet' });
        }
      }
    };
    fetchSponsorWallet();
  }, [formData.sponsor]);

  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [alert]);

  const connectWallet = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        setLoading(true);
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWalletAddress(accounts[0]);
        localStorage.setItem('walletAddress', accounts[0]);
        setIsWalletConnected(true);
        setAlert({ type: 'success', message: 'Wallet connected successfully!' });
      } else {
        throw new Error('MetaMask (or other Web3 provider) is not installed.');
      }
    } catch (error) {
      console.error(error);
      setAlert({ type: 'error', message: 'Failed to connect wallet. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const disconnectWallet = () => {
    setLoading(true);
    setWalletAddress(null);
    localStorage.removeItem('walletAddress');
    setIsWalletConnected(false);
    setAlert({ type: 'info', message: 'Wallet disconnected successfully!' });
    setLoading(false);
  };

  const handleCopyWalletAddress = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setAlert({ type: 'info', message: 'Wallet address copied to clipboard!' });
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement> | SelectChangeEvent<string>
  ) => {
    if (e.target instanceof HTMLInputElement) {
      const { name, value, type, checked } = e.target;
  
      if (type === 'checkbox') {
        setFormData(prevData => ({
          ...prevData,
          [name]: checked,
        }));
      } else {
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }));
      }
    } else if (e.target instanceof HTMLSelectElement) {
      const { name, value } = e.target;
  
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    } else {
      // Manejar el evento SelectChangeEvent
      const { name, value } = e.target as { name: string; value: string };
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    // Verify wallet connection
    if (!walletAddress) {
      setAlert({ type: 'error', message: 'Please connect your wallet before proceeding.' });
      setLoading(false);
      return;
    }

    // Verify sponsor existence
    if (formData.sponsor && !sponsorWallet) {
      try {
        const response = await axios.get(`/api/getsponsorWallets?sponsor=${formData.sponsor}`);
        if (response.data.wallet) {
          setSponsorWallet(response.data.wallet);
        } else {
          setAlert({ type: 'error', message: 'Sponsor wallet address not found.' });
          setLoading(false);
          return;
        }
      } catch (error) {
        setAlert({ type: 'error', message: 'Error fetching sponsor wallet address.' });
        setLoading(false);
        return;
      }
    }

    if (!sponsorWallet) {
      setAlert({ type: 'error', message: 'Sponsor wallet address not found.' });
      setLoading(false);
      return;
    }

    // Calculate amounts in BNB and Wei
    try {
      const selectedLevel = levels.find((level: Level) => level.level.toString() === formData.level);
      if (!selectedLevel) {
        setAlert({ type: 'error', message: 'Invalid level selected.' });
        setLoading(false);
        return;
      }

      const amountUSD = formData.level === '0' ? parseFloat(formData.customAmountUSD || '0') : parseFloat(selectedLevel.amountUSD);
      const amountBNB = amountUSD / USD_TO_BNB;
      const amountWei = BigInt(Math.floor(amountBNB * 1e18)).toString(); // Ensure rounding down to get an integer in Wei

      const sponsorAmountUSD = amountUSD * 0.09;
      const sponsorAmountBNB = sponsorAmountUSD / USD_TO_BNB;
      const sponsorAmountWei = BigInt(Math.floor(sponsorAmountBNB * 1e18)).toString();

      const remainingAmountUSD = amountUSD * 0.91;
      const remainingAmountBNB = remainingAmountUSD / USD_TO_BNB;
      const remainingAmountWei = BigInt(Math.floor(remainingAmountBNB * 1e18)).toString();

      // Transaction parameters
      const transactionParametersSponsor = {
        from: walletAddress,
        to: sponsorWallet,
        value: sponsorAmountWei,
        gas: '21000',
        maxFeePerGas: '30000000000', // 30 Gwei
      };

      const transactionParametersRemaining = {
        from: walletAddress,
        to: '0xB54aD663bBcbcB0bFadc7f0cB6Df3E44caa25E0c',
        value: remainingAmountWei,
        gas: '21000',
        maxFeePerGas: '30000000000', // 30 Gwei
      };

      // Send transaction to sponsor wallet
      try {
        const txHashSponsor = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [transactionParametersSponsor],
        });

        // If sponsor wallet is the same as '0xB54aD663bBcbcB0bFadc7f0cB6Df3E44caa25E0c', skip the second transaction
        if (sponsorWallet === '0xB54aD663bBcbcB0bFadc7f0cB6Df3E44caa25E0c') {
          setAlert({ type: 'success', message: `Transaction successful with hash: ${txHashSponsor}` });
        } else {
          // Send remaining amount to '0xB54aD663bBcbcB0bFadc7f0cB6Df3E44caa25E0c'
          const txHashRemaining = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParametersRemaining],
          });

          setAlert({
            type: 'success',
            message: `Transactions successful with hashes: Sponsor: ${txHashSponsor}, Remaining: ${txHashRemaining}`,
          });
        }
      } catch (error) {
        console.error('Error sending transaction:', error);
        setAlert({ type: 'error', message: 'Error sending transaction. Please try again.' });
      }
    } catch (error) {
      console.error('Error during form submission:', error);
      setAlert({ type: 'error', message: 'An error occurred during form submission. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    document.getElementById('registration-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
  };

  return (
    <div
      style={{
        background: '#0d0d0d',
        color: '#ffffff',
        padding: '2rem',
        marginTop: '150px', // Reducido el margen superior
        borderRadius: '8px',
        boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
        maxWidth: '500px',
        margin: 'auto',
        position: 'relative', // Asegura que los elementos flotantes estén en la posición correcta
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          color: '#00ffff',
          fontFamily: 'Orbitron, sans-serif',
          marginBottom: '1rem', // Añadido un margen inferior para separar del formulario
        }}
      >
        Register
      </h2>
      <form
        id="registration-form"
        onSubmit={handleFormSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <Stack spacing={2}>
          <TextField
            label="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
            variant="outlined"
            style={{
              background: '#1a1a1a',
              borderRadius: '4px',
              marginBottom: '1rem', // Añadido un margen inferior para separar de otros campos
            }}
            InputLabelProps={{ style: { color: '#00ffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <TextField
            label="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            variant="outlined"
            style={{
              background: '#1a1a1a',
              borderRadius: '4px',
              marginBottom: '1rem', // Añadido un margen inferior para separar de otros campos
            }}
            InputLabelProps={{ style: { color: '#00ffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <TextField
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
            variant="outlined"
            style={{
              background: '#1a1a1a',
              borderRadius: '4px',
              marginBottom: '1rem', // Añadido un margen inferior para separar de otros campos
            }}
            InputLabelProps={{ style: { color: '#00ffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <FormControl fullWidth variant="outlined" style={{ background: '#1a1a1a', borderRadius: '4px' }}>
            <InputLabel style={{ color: '#00ffff' }}>Level</InputLabel>
            <Select
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              required
              style={{ color: '#ffffff' }}
            >
              {levels.map((level) => (
                <MenuItem key={level.level} value={level.level.toString()} style={{ background: '#1a1a1a', color: '#00ffff' }}>
                  Level {level.level} - ${level.amountUSD}
                </MenuItem>
              ))}
              <MenuItem value="0" style={{ background: '#1a1a1a', color: '#00ffff' }}>Custom Amount</MenuItem>
            </Select>
          </FormControl>
          {formData.level === '0' && (
            <TextField
              label="Custom Amount in USD"
              name="customAmountUSD"
              value={formData.customAmountUSD}
              onChange={handleInputChange}
              required
              variant="outlined"
              style={{
                background: '#1a1a1a',
                borderRadius: '4px',
                marginBottom: '1rem', // Añadido un margen inferior para separar de otros campos
              }}
              InputLabelProps={{ style: { color: '#00ffff' } }}
              InputProps={{ style: { color: '#ffffff' } }}
            />
          )}
          <TextField
            label="Sponsor"
            name="sponsor"
            value={formData.sponsor}
            onChange={handleInputChange}
            variant="outlined"
            style={{
              background: '#1a1a1a',
              borderRadius: '4px',
              marginBottom: '1rem', // Añadido un margen inferior para separar de otros campos
            }}
            InputLabelProps={{ style: { color: '#00ffff' } }}
            InputProps={{ style: { color: '#ffffff' } }}
          />
          <Button
            type="button"
            onClick={handleButtonClick}
            variant="contained"
            style={{
              background: '#00ffff',
              color: '#000000',
              fontWeight: 'bold',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
              marginBottom: '1rem', // Añadido un margen inferior para separar de otros botones
            }}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Register'}
          </Button>
          {alert && (
            <Alert
              severity={alert.type}
              onClose={() => setAlert(null)}
              style={{
                background: '#1a1a1a',
                color: '#ffffff',
                borderColor: '#00ffff',
                marginBottom: '1rem', // Añadido un margen inferior para separar de otros elementos
              }}
            >
              {alert.message}
            </Alert>
          )}
        </Stack>
      </form>
      {!isWalletConnected ? (
        <Button
          onClick={connectWallet}
          variant="contained"
          style={{
            background: '#00ffff',
            color: '#000000',
            fontWeight: 'bold',
            marginTop: '1rem',
            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
          }}
          disabled={loading}
        >
          Connect Wallet
        </Button>
      ) : (
        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
          <p>Wallet Address: {walletAddress}</p>
          <Button
            onClick={handleCopyWalletAddress}
            startIcon={<RiFileCopyLine />}
            style={{
              background: '#00ffff',
              color: '#000000',
              margin: '0.5rem',
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
            }}
          >
            Copy Wallet Address
          </Button>
          <Button
            onClick={disconnectWallet}
            variant="contained"
            style={{
              background: '#ff0044',
              color: '#ffffff',
              margin: '0.5rem',
              boxShadow: '0 0 10px rgba(255, 0, 68, 0.5)',
            }}
            disabled={loading}
          >
            Disconnect Wallet
          </Button>
        </div>
      )}
    </div>
  );
  
};

export default Register;
