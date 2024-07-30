import React, { useState } from 'react';
import Web3 from 'web3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt, faCrown, faTrophy, faMedal, faGem, faDiamond, faRocket } from '@fortawesome/free-solid-svg-icons';

interface PricingCardProps {
    planType: {
        id: number;
        title: string;
        price: string; // USD
        subtitle: string;
        features: string[];
        buttonLabel: string;
    };
}

const getIconForLevel = (level: number) => {
    switch (level) {
        case 0: return faStar;
        case 1: return faStarHalfAlt;
        case 2: return faCrown;
        case 3: return faTrophy;
        case 4: return faMedal;
        case 5: return faGem;
        case 6: return faDiamond;
        case 7: return faRocket;
        default: return faStar; // Default icon
    }
};

const PricingCard: React.FC<PricingCardProps> = ({ planType }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const checkNetwork = async () => {
        const chainId = await window.ethereum.request({ method: 'eth_chainId' });
        return chainId === '0x38'; // 0x38 es el ID de la red BNB Smart Chain
    };

    const handlePayment = async () => {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const web3 = new Web3(window.ethereum);

                // Verificar la red actual
                const networkOk = await checkNetwork();
                if (!networkOk) {
                    alert('Por favor, cambia a la red BNB Smart Chain en MetaMask.');
                    return;
                }

                // Solicitar acceso a MetaMask
                const accounts = await web3.eth.getAccounts();
                if (accounts.length === 0) {
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    alert('Por favor, conecta tu wallet MetaMask.');
                    return;
                }

                const account = accounts[0];
                console.log(`Cuenta: ${account}`);

                // Obtener saldo del usuario
                const balance = await web3.eth.getBalance(account);
                const balanceInBnb = parseFloat(web3.utils.fromWei(balance, 'ether'));
                console.log(`Saldo del usuario: ${balanceInBnb} BNB`);

                // Convertir precio de USD a BNB (ajusta según el precio actual de BNB)
                const usdToBnbRate = 593; // Ajusta este valor según el precio real de BNB
                const priceInBnb = parseFloat(planType.price) / usdToBnbRate;
                console.log(`Precio en BNB: ${priceInBnb}`);

                // Convertir BNB a Wei
                const priceInWei = web3.utils.toWei(priceInBnb.toFixed(18), 'ether');
                console.log(`Precio en Wei: ${priceInWei}`);

                // Obtener el precio del gas en Wei
                const gasPriceWei = await web3.eth.getGasPrice();
                const gasPrice = parseFloat(web3.utils.fromWei(gasPriceWei, 'ether'));
                console.log(`Precio del gas: ${gasPrice}`);
                const gasLimit = 50000; // Límite de gas

                // Calcular el costo total de la transacción
                const priceInWeiNumber = parseFloat(priceInWei);
                const totalCostInWei = priceInWeiNumber + (gasPrice * gasLimit);
                const totalCostHex = web3.utils.toHex(Math.round(totalCostInWei));
                console.log(`Costo total de la transacción en Wei: ${totalCostHex}`);

                // Crear la transacción
                const tx = {
                    from: account,
                    to: '0xAFa5f9670b6809F7A200DBB4A3E8bfD056c855E8', // Dirección de destino
                    value: totalCostHex, // Valor total en Wei
                    gas: gasLimit.toString(),
                    gasPrice: web3.utils.toHex(Math.round(parseFloat(web3.utils.fromWei(gasPriceWei, 'gwei')) * 1e9)), // Gas price en Wei
                };

                console.log(`Transacción: ${JSON.stringify(tx)}`);

                // Enviar la transacción
                web3.eth.sendTransaction(tx)
                    .on('transactionHash', (hash) => {
                        console.log(`Hash de la transacción: ${hash}`);
                    })
                    .on('receipt', (receipt) => {
                        console.log(`Recibo: ${JSON.stringify(receipt)}`);
                        alert('Pago exitoso');
                    })
                    .on('error', (error) => {
                        console.error('Error en la transacción:', error);
                        if (error.message.includes('Internal JSON-RPC error') || error.message.includes('insufficient funds')) {
                            alert('Error en la comunicación con la red o fondos insuficientes. Por favor, revisa tu saldo y la transacción en MetaMask.');
                        } else {
                            alert(`Error en el pago: ${error.message}`);
                        }
                    });

            } catch (error) {
                console.error('Error:', error);
                alert('Error en el pago: Un error desconocido ha ocurrido.');
            }
        } else {
            alert('MetaMask no está instalado. Por favor, instala MetaMask y vuelve a intentarlo.');
        }
    };

    return (
        <div className="relative w-96 max-w-xs mx-auto bg-gray-900 border border-gray-800 rounded-lg shadow-2xl transform transition-transform duration-500 hover:scale-105">
            <div 
                className={`relative ${isOpen ? 'bg-gradient-to-r from-blue-700 to-teal-500' : 'bg-gradient-to-r from-gray-800 to-gray-900'} border border-gray-700 rounded-lg transition-all duration-500 ease-in-out`}
            >
                <div 
                    className="flex items-center justify-between p-3 cursor-pointer text-white rounded-lg hover:shadow-lg transition-shadow duration-300 relative"
                    onClick={toggleAccordion}
                >
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={getIconForLevel(planType.id)} className="text-2xl" />
                    </div>
                    <h3 className="flex-1 text-center text-base font-semibold">{planType.title}</h3>
                    <span className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </span>
                    <div className={`absolute top-0 left-0 w-full h-full border-2 border-gray-600 rounded-lg -z-10 transition-transform duration-500 ${isOpen ? 'scale-110' : 'scale-100'}`}></div>
                </div>
                <div className={`p-3 transition-all duration-500 ${isOpen ? 'opacity-100 max-h-screen' : 'opacity-0 max-h-0'} overflow-hidden`}>
                    <p className="text-2xl font-extrabold text-white text-center">${planType.price}</p>
                    <p className="mt-1 text-gray-300 text-xs text-center">{planType.subtitle}</p>
                    <ul role="list" className="mt-2 space-y-1 text-gray-200 text-xs">
                        {planType.features.map((feature, index) => (
                            <li key={index} className="flex items-center">
                                <span className="mr-1 text-teal-400">✔</span>
                                <span>{feature}</span>
                            </li>
                        ))}
                    </ul>
                    <button
                        className="mt-3 bg-gradient-to-r from-teal-500 to-blue-700 text-white py-1 px-3 border border-transparent rounded-lg text-center font-medium transform transition-transform duration-300 hover:scale-105"
                        onClick={handlePayment}
                    >
                        {planType.buttonLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PricingCard;
