import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Stack, Alert, TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';
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
        to: '0xAFa5f9670b6809F7A200DBB4A3E8bfD056c855E8',
        value: remainingAmountWei,
        gas: '21000',
        maxFeePerGas: '30000000000', // 30 Gwei
      };

      // Send transactions
      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParametersSponsor],
      });

      await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [transactionParametersRemaining],
      });

      // Show success alert
      setAlert({ type: 'success', message: 'Registration successful and payments sent!' });
    } catch (error) {
      console.error('Error calculating amounts:', error);
      setAlert({ type: 'error', message: 'Error calculating amounts. Please try again.' });
    }

    setLoading(false);
  };

  return (
    <div>
      <div className="w-full max-w-md mx-auto p-8 rounded-lg shadow-2xl bg-gray-900 bg-opacity-80 backdrop-blur-md">
        <Stack spacing={3}>
          {alert && (
            <Alert severity={alert.type} onClose={() => setAlert(null)} sx={{ mb: 2 }}>
              {alert.message}
            </Alert>
          )}
          <FormControl fullWidth margin="normal">
            <InputLabel htmlFor="level" sx={{ color: '#81d4fa' }}>Level</InputLabel>
            <Select
              id="level"
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              fullWidth
              required
              sx={{
                bgcolor: '#1e1e1e',
                borderColor: '#03a9f4',
                '.MuiOutlinedInput-notchedOutline': {
                  borderColor: '#03a9f4',
                },
                '&:hover': {
                  bgcolor: '#2d2d2d',
                },
                color: '#e0f7fa',
              }}
            >
              {levels.map(level => (
                <MenuItem key={level.level} value={level.level}>
                  <span className="text-teal-300">Level {level.level}</span>
                </MenuItem>
              ))}
              <MenuItem value="0">
                <span className="text-teal-300">Custom Amount</span>
              </MenuItem>
            </Select>
          </FormControl>
          {formData.level === '0' && (
            <TextField
              name="customAmountUSD"
              label="Custom Amount (USD)"
              type="number"
              value={formData.customAmountUSD}
              onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
              fullWidth
              required
              sx={{
                input: { color: '#e0f7fa' },
                label: { color: '#81d4fa' },
                bgcolor: '#1e1e1e',
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#03a9f4',
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor: '#03a9f4',
                },
              }}
            />
          )}
          <TextField
            name="firstName"
            label="First Name"
            value={formData.firstName}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            fullWidth
            required
            sx={{
              input: { color: '#e0f7fa' },
              label: { color: '#81d4fa' },
              bgcolor: '#1e1e1e',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
            }}
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={formData.lastName}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            fullWidth
            required
            sx={{
              input: { color: '#e0f7fa' },
              label: { color: '#81d4fa' },
              bgcolor: '#1e1e1e',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
            }}
          />
          <TextField
            name="username"
            label="Username"
            value={formData.username}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            fullWidth
            required
            sx={{
              input: { color: '#e0f7fa' },
              label: { color: '#81d4fa' },
              bgcolor: '#1e1e1e',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
            }}
          />
          <TextField
            name="sponsor"
            label="Sponsor (Optional)"
            value={formData.sponsor}
            onChange={handleInputChange as React.ChangeEventHandler<HTMLInputElement>} // Cast a HTMLInputElement
            fullWidth
            sx={{
              input: { color: '#e0f7fa' },
              label: { color: '#81d4fa' },
              bgcolor: '#1e1e1e',
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#03a9f4',
              },
            }}
          />
          <div className="flex flex-col md:flex-row justify-between items-center mt-4 space-y-2 md:space-y-0">
            {isWalletConnected ? (
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
                <Button
                  variant="outlined"
                  color="success"
                  onClick={handleCopyWalletAddress}
                  disabled={loading}
                  sx={{
                    borderColor: '#00c853',
                    color: '#00c853',
                    borderRadius: '20px',
                    borderWidth: '2px',
                    padding: '8px 16px',
                    '&:hover': {
                      borderColor: '#00bfae',
                      color: '#00bfae',
                    },
                  }}
                >
                  Copy Address
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={disconnectWallet}
                  disabled={loading}
                  sx={{
                    borderColor: '#f44336',
                    color: '#f44336',
                    borderRadius: '20px',
                    borderWidth: '2px',
                    padding: '8px 16px',
                    '&:hover': {
                      borderColor: '#d32f2f',
                      color: '#d32f2f',
                    },
                  }}
                >
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={connectWallet}
                disabled={loading}
                sx={{
                  bgcolor: '#03a9f4',
                  '&:hover': {
                    bgcolor: '#0288d1',
                  },
                  width: '100%',
                  padding: '12px',
                }}
              >
                Connect Wallet
              </Button>
            )}
          </div>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleFormSubmit}
            disabled={loading}
            sx={{
              bgcolor: '#ab47bc',
              '&:hover': {
                bgcolor: '#8e24aa',
              },
              width: '100%',
              padding: '12px',
            }}
          >
            Submit
          </Button>
        </Stack>
      </div>
    </div>
  );
  
};

export default Register;
