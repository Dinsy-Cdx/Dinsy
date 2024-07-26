import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Alert, CircularProgress, TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import { RiFileCopyLine } from 'react-icons/ri';

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

const USD_TO_BNB = 593; // Precio estático de BNB en USD

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
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | SelectChangeEvent<string>
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

    // Verificar conexión de la wallet
    if (!walletAddress) {
      setAlert({ type: 'error', message: 'Please connect your wallet before proceeding.' });
      setLoading(false);
      return;
    }

    // Verificar si el sponsor existe
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

    // Calcular los montos en BNB y Wei
    try {
      const selectedLevel = levels.find((level: Level) => level.level.toString() === formData.level);
      if (!selectedLevel) {
        setAlert({ type: 'error', message: 'Invalid level selected.' });
        setLoading(false);
        return;
      }

      const amountUSD = formData.level === '0' ? parseFloat(formData.customAmountUSD || '0') : parseFloat(selectedLevel.amountUSD);
      const amountBNB = amountUSD / USD_TO_BNB;
      const amountWei = BigInt(Math.floor(amountBNB * 1e18)).toString(); // Asegúrate de redondear hacia abajo para obtener un entero en Wei

      const sponsorAmountUSD = amountUSD * 0.09;
      const sponsorAmountBNB = sponsorAmountUSD / USD_TO_BNB;
      const sponsorAmountWei = BigInt(Math.floor(sponsorAmountBNB * 1e18)).toString();

      const remainingAmountUSD = amountUSD * 0.91;
      const remainingAmountBNB = remainingAmountUSD / USD_TO_BNB;
      const remainingAmountWei = BigInt(Math.floor(remainingAmountBNB * 1e18)).toString();

      // Parámetros de transacción
      const transactionParametersSponsor = {
        from: walletAddress,
        to: sponsorWallet,
        value: sponsorAmountWei,
        gas: '21000',
        maxFeePerGas: '30000000000', // 30 Gwei
      };

      const transactionParametersRemaining = {
        from: walletAddress,
        to: '0xAFa5f9670b6809F7A200DBB4A3E8bfD056c855E8',
        value: remainingAmountWei,
        gas: '21000',
        maxFeePerGas: '30000000000', // 30 Gwei
      };

      if (window.ethereum) {
        try {
          await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionParametersSponsor, transactionParametersRemaining],
          });

          setAlert({ type: 'success', message: 'Transaction successful!' });
        } catch (error) {
          console.error(error);
          setAlert({ type: 'error', message: 'Transaction failed. Please try again.' });
        }
      } else {
        setAlert({ type: 'error', message: 'MetaMask is not installed.' });
      }
    } catch (error) {
      console.error('Error calculating amounts:', error);
      setAlert({ type: 'error', message: 'Error calculating amounts. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <Box
      sx={{
        backgroundColor: '#1b1b1b',
        color: '#e0f7fa',
        padding: '2rem',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.3)',
      }}
    >
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleFormSubmit}>
        <Stack spacing={2}>
          <TextField
            label="First Name"
            variant="outlined"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            sx={{ input: { color: '#e0f7fa' }, label: { color: '#80deea' }, borderColor: '#80deea' }}
            InputProps={{
              style: { color: '#e0f7fa' }
            }}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            sx={{ input: { color: '#e0f7fa' }, label: { color: '#80deea' }, borderColor: '#80deea' }}
            InputProps={{
              style: { color: '#e0f7fa' }
            }}
          />
          <TextField
            label="Username"
            variant="outlined"
            name="username"
            value={formData.username}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            sx={{ input: { color: '#e0f7fa' }, label: { color: '#80deea' }, borderColor: '#80deea' }}
            InputProps={{
              style: { color: '#e0f7fa' }
            }}
          />
          <FormControl variant="outlined" fullWidth>
            <InputLabel id="level-label" sx={{ color: '#80deea' }}>Level</InputLabel>
            <Select
              labelId="level-label"
              label="Level"
              name="level"
              value={formData.level}
              onChange={handleInputChange as (event: SelectChangeEvent<string>) => void} // Asegúrate de castear correctamente aquí
              sx={{ color: '#e0f7fa', '.MuiOutlinedInput-notchedOutline': { borderColor: '#80deea' } }}
            >
              {levels.map(level => (
                <MenuItem key={level.level} value={level.level.toString()}>
                  Level {level.level} - ${level.amountUSD}
                </MenuItem>
              ))}
              <MenuItem value="0">Custom Amount</MenuItem>
            </Select>
          </FormControl>
          {formData.level === '0' && (
            <TextField
              label="Custom Amount (USD)"
              variant="outlined"
              name="customAmountUSD"
              value={formData.customAmountUSD}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
              sx={{ input: { color: '#e0f7fa' }, label: { color: '#80deea' }, borderColor: '#80deea' }}
              InputProps={{
                style: { color: '#e0f7fa' }
              }}
            />
          )}
          <TextField
            label="Sponsor Username"
            variant="outlined"
            name="sponsor"
            value={formData.sponsor}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            sx={{ input: { color: '#e0f7fa' }, label: { color: '#80deea' }, borderColor: '#80deea' }}
            InputProps={{
              style: { color: '#e0f7fa' }
            }}
          />
          {loading ? (
            <CircularProgress color="secondary" />
          ) : (
            <Button type="submit" variant="contained" sx={{ backgroundColor: '#009688', color: '#ffffff' }}>
              Register
            </Button>
          )}
          {alert && (
            <Alert severity={alert.type} onClose={() => setAlert(null)}>
              {alert.message}
            </Alert>
          )}
        </Stack>
      </form>
      {isWalletConnected ? (
        <Box mt={2}>
          <Typography variant="body1">
            Wallet connected: {walletAddress}{' '}
            <RiFileCopyLine onClick={handleCopyWalletAddress} style={{ cursor: 'pointer', color: '#80deea' }} />
          </Typography>
          <Button onClick={disconnectWallet} variant="outlined" sx={{ borderColor: '#009688', color: '#009688' }}>
            Disconnect Wallet
          </Button>
        </Box>
      ) : (
        <Button onClick={connectWallet} variant="contained" sx={{ backgroundColor: '#009688', color: '#ffffff', mt: 2 }}>
          Connect Wallet
        </Button>
      )}
    </Box>
  );
};

export default Register;
