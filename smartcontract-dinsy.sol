// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DINSYTokenization is Ownable {
    IERC20 public cdxSharedToken;
    address public companyWallet = 0x24e52eC35116816a0D4D70F9713259D3Cb87a13d; // Wallet de la compañía

    struct User {
        string nombres;
        string apellidos;
        string username;
        address sponsor;
        uint8 level;
        address wallet;
    }

    struct Property {
        string propertyId;
        address owner;
        uint256 price;
        uint256 totalTokens;
        uint256 soldTokens;
        mapping(address => uint256) tokenBalances;
        bool tokenized;
    }

    struct Referral {
        address referrer;
        uint256 level;
    }

    mapping(address => User) public users;
    mapping(string => Property) public properties;
    mapping(address => Referral) public referrals;
    mapping(address => uint256) public contributions;

    event UserRegistered(address user, string nombres, string apellidos, string username, address sponsor, uint8 level);
    event PropertyTokenized(string propertyId, address owner, uint256 price, uint256 totalTokens);
    event TokensPurchased(address buyer, uint256 amount);
    event PropertyBought(string propertyId, address buyer, uint256 amount);
    event PropertySold(string propertyId, address seller, uint256 amount);
    event PropertyRented(string propertyId, address renter, uint256 rentalDays, uint256 amount);

    constructor(address _cdxSharedToken) {
        cdxSharedToken = IERC20(_cdxSharedToken);
    }

    // Función para registrar usuarios
    function registerUser(string memory nombres, string memory apellidos, string memory username, address sponsor, uint8 level, address wallet) external {
        require(users[msg.sender].wallet == address(0), "User already registered.");
        require(level >= 1 && level <= 7, "Invalid level.");

        users[msg.sender] = User({
            nombres: nombres,
            apellidos: apellidos,
            username: username,
            sponsor: sponsor,
            level: level,
            wallet: wallet
        });

        emit UserRegistered(msg.sender, nombres, apellidos, username, sponsor, level);
    }

    // Función para que los usuarios compren Tokens CDX-SHARED usando BNB
    function buyCDXSharedTokens(uint256 amount) external payable {
        require(msg.value >= 50 ether, "Minimum purchase is $50 worth of BNB.");
        uint256 tokensToBuy = msg.value / 50 ether;
        cdxSharedToken.transfer(msg.sender, tokensToBuy);
        emit TokensPurchased(msg.sender, tokensToBuy);
    }

    // Función para tokenizar una propiedad si aún no está tokenizada
    function tokenizeProperty(string memory propertyId, uint256 price, address propertyOwner) external onlyOwner {
        require(!properties[propertyId].tokenized, "Property already tokenized.");
        uint256 totalTokens = price / 50;
        Property storage newProperty = properties[propertyId];
        newProperty.propertyId = propertyId;
        newProperty.owner = propertyOwner;
        newProperty.price = price;
        newProperty.totalTokens = totalTokens;
        newProperty.soldTokens = 0;
        newProperty.tokenized = true;

        emit PropertyTokenized(propertyId, propertyOwner, price, totalTokens);
    }

    // Función para calcular la cantidad de tokens por propiedad
    function calculatePropertyTokens(string memory propertyId) public view returns (uint256) {
        Property storage property = properties[propertyId];
        return property.price / 50;
    }

    // Función para intercambiar tokens CDX-SHARED por tokens de una propiedad
    function exchangeTokens(string memory propertyId, uint256 amount) external {
        Property storage property = properties[propertyId];
        require(property.tokenized, "Property not tokenized.");
        require(property.soldTokens + amount <= property.totalTokens, "Not enough tokens available.");
        
        cdxSharedToken.transferFrom(msg.sender, address(this), amount);
        property.tokenBalances[msg.sender] += amount;
        property.soldTokens += amount;
    }

    // Función para comprar una propiedad tokenizada
    function buyProperty(string memory propertyId, uint256 tokensToBuy) external payable {
        Property storage property = properties[propertyId];
        require(property.tokenized, "Property not tokenized.");
        require(tokensToBuy > 0 && tokensToBuy <= property.totalTokens - property.soldTokens, "Invalid token amount.");
        
        uint256 totalCost = tokensToBuy * 50 ether;
        require(msg.value >= totalCost, "Insufficient funds.");
        
        property.tokenBalances[msg.sender] += tokensToBuy;
        property.soldTokens += tokensToBuy;
        
        chargeTransactionFee(msg.value);
        emit PropertyBought(propertyId, msg.sender, tokensToBuy);
    }

    // Función para vender una propiedad tokenizada
    function sellProperty(string memory propertyId, uint256 tokensToSell) external {
        Property storage property = properties[propertyId];
        require(property.tokenBalances[msg.sender] >= tokensToSell, "Insufficient token balance.");
        
        uint256 totalValue = tokensToSell * 50 ether;
        uint256 commission = totalValue / 100;
        uint256 sellerShare = totalValue - commission;

        cdxSharedToken.transfer(msg.sender, sellerShare);
        property.tokenBalances[msg.sender] -= tokensToSell;
        property.soldTokens -= tokensToSell;
        
        chargeTransactionFee(commission);
        emit PropertySold(propertyId, msg.sender, tokensToSell);
    }

    // Función para calcular el precio diario de alquiler de propiedades
    function calculateRentalPrice(
        string memory propertyType,
        uint256 rooms,
        uint256 parking,
        uint256 bathrooms,
        bool isPremium,
        bool isCentral,
        bool acceptsPets,
        bool hasTransport
    ) public pure returns (uint256) {
        uint256 basePrice;

        if (keccak256(abi.encodePacked(propertyType)) == keccak256(abi.encodePacked("department"))) {
            basePrice = 5 + (25 * rooms) + 15 + (5 * parking) + (5 * bathrooms) + (isPremium ? 20 : 0) + (isCentral ? 15 : 0) + (acceptsPets ? 10 : 0);
        } else if (keccak256(abi.encodePacked(propertyType)) == keccak256(abi.encodePacked("house"))) {
            basePrice = 10 + (25 * rooms) + 25 + (7 * parking) + (5 * bathrooms) + (isPremium ? 20 : 0) + (isCentral ? 15 : 0) + (acceptsPets ? 15 : 0);
        } else if (keccak256(abi.encodePacked(propertyType)) == keccak256(abi.encodePacked("office"))) {
            basePrice = 10 + (40 * rooms) + 25 + (7 * parking) + (5 * bathrooms) + (isPremium ? 20 : 0) + (isCentral ? 20 : 0);
        } else if (keccak256(abi.encodePacked(propertyType)) == keccak256(abi.encodePacked("countryside house"))) {
            basePrice = 25 + (30 * rooms) + 25 + (7 * parking) + (5 * bathrooms) + (isPremium ? 20 : 0) + (isCentral ? 20 : 0) + (acceptsPets ? 20 : 0) + (hasTransport ? 30 : 0);
        }

        return basePrice;
    }

    // Función para cobrar comisiones por transacción
    function chargeTransactionFee(uint256 amount) internal {
        uint256 commission = (amount * 5) / 100;
        payable(companyWallet).transfer(commission);
    }

    // Función para el sistema de referidos
    function referralSystem(address referrer, uint256 amount) external {
        require(referrals[msg.sender].referrer == address(0), "Referrer already set.");
        referrals[msg.sender] = Referral({ referrer: referrer, level: 1 });

        address currentReferrer = referrer;
        uint256 remainingAmount = amount;
        for (uint256 i = 1; i <= 7; i++) {
            uint256 referralCommission = (remainingAmount * (i == 1 ? 4 : 1)) / 100;
            payable(currentReferrer).transfer(referralCommission);
            currentReferrer = referrals[currentReferrer].referrer;
            if (currentReferrer == address(0)) {
                break;
            }
        }
    }

    // Función para que los usuarios elijan un nivel de contribución
    function chooseContributionLevel(uint8 level) external payable {
    require(level >= 1 && level <= 7, "Invalid level.");
    require(msg.value >= getContributionAmount(level), "Insufficient contribution.");

    contributions[msg.sender] = level;
    
    uint256 contributionAmount = msg.value;
    distributeFundsAndTokens(contributionAmount, level);

    emit TokensPurchased(msg.sender, tokensToReceive); // Actualiza con la cantidad de tokens que el usuario recibe
    }

    // Función para obtener el monto de contribución por nivel
    function getContributionAmount(uint8 level) public pure returns (uint256) {
        uint256[8] memory levels = [0, 100 ether, 500 ether, 2000 ether, 7000 ether, 25000 ether, 50000 ether, 100000 ether];
        return levels[level];
    }

    // Función para distribuir fondos según el nivel de contribución
function distributeFunds(uint256 amount, uint8 level, address[] memory sponsors) internal {
    uint256[5] memory percentages = [65, 1, 4, 4, 5];
    address[5] memory wallets = [
        0x24e52eC35116816a0D4D70F9713259D3Cb87a13d, // Contribución
        0x24e52eC35116816a0D4D70F9713259D3Cb87a13d, // Builder pool
        0x8Cd9ef5F5DE089F217d661eE1321E51d1377D1dE, // Pool de DINSY
        0x8Cd9ef5F5DE089F217d661eE1321E51d1377D1dE, // Administrativo
        0x24e52eC35116816a0D4D70F9713259D3Cb87a13d  // Crowdfunding personal
    ];

    // Distribuir a las wallets estáticas
    for (uint256 i = 0; i < wallets.length; i++) {
        uint256 walletAmount = (amount * percentages[i]) / 100;
        payable(wallets[i]).transfer(walletAmount);
    }

    // Distribuir el 21% dinámicamente a los sponsors
    uint256 remainingAmount = (amount * 21) / 100;

    // El primer sponsor recibe el 9%
    if (sponsors.length > 0) {
        uint256 sponsor1Amount = (remainingAmount * 9) / 21;
        payable(sponsors[0]).transfer(sponsor1Amount);
        remainingAmount -= sponsor1Amount;
    }

    // Los sponsors ascendentes (hasta 6) reciben el 2% cada uno
    uint256 ascendingSponsorPercentage = 2;
    for (uint256 i = 1; i < sponsors.length && i < 7; i++) {
        uint256 sponsorAmount = (amount * ascendingSponsorPercentage) / 100;
        payable(sponsors[i]).transfer(sponsorAmount);
        remainingAmount -= sponsorAmount;
    }

    // Si sobra algo, se lo envía a 0x8Cd9ef5F5DE089F217d661eE1321E51d1377D1dE
    if (remainingAmount > 0) {
        payable(0x8Cd9ef5F5DE089F217d661eE1321E51d1377D1dE).transfer(remainingAmount);
    }
}


    uint256 totalPercentage = 0;
    for (uint256 i = 0; i < percentages.length; i++) {
        totalPercentage += percentages[i];
    }

    require(totalPercentage == 100, "Sum of percentages must be 100%.");

    // Aquí procede con la lógica de transferencia usando percentages y wallets
}

    // Función para distribuir las comisiones de referidos según el nivel de contribución
    function distributeReferralCommission(uint256 amount, uint8 level) internal {
    address referrer = referrals[msg.sender].referrer;
    uint256[7] memory referralPercents = [4, 1, 1, 1, 1, 1, 1];

    for (uint256 i = 0; i < 7; i++) {
        if (referrer == address(0)) {
            break;
        }

        uint256 commission = (amount * referralPercents[i]) / 100;
        payable(referrer).transfer(commission);
        referrer = referrals[referrer].referrer;
    }
}


    // Función para calcular el número de tokens CDX-SHARED por nivel de contribución
    function getTokensByLevel(uint8 level) public pure returns (uint256) {
        uint256[8] memory tokens = [0, 1, 7, 28, 98, 350, 700, 1400];
        return tokens[level];
    }

    // Función para calcular el número de acciones por nivel de contribución
    function getActionsByLevel(uint8 level) public pure returns (uint256) {
        uint256[8] memory actions = [0, 1, 5, 20, 70, 250, 500, 1000];
        return actions[level];
    }

    // Función para transferir tokens de propiedad al vender a un nuevo propietario
    function transferPropertyTokens(string memory propertyId, address newOwner, uint256 tokenAmount) internal {
        Property storage property = properties[propertyId];
        require(property.tokenBalances[msg.sender] >= tokenAmount, "Insufficient token balance.");
        
        property.tokenBalances[msg.sender] -= tokenAmount;
        property.tokenBalances[newOwner] += tokenAmount;
    }

    // Función para manejar la venta de propiedades con multifirma
    function sellPropertyWithMultisig(string memory propertyId, address newOwner) external {
        Property storage property = properties[propertyId];
        require(property.tokenized, "Property not tokenized.");
        
        // Lógica para obtener el consentimiento de todos los propietarios
        // Aquí se podría implementar una lógica de multifirma real

        uint256 totalTokens = property.totalTokens;
        transferPropertyTokens(propertyId, newOwner, totalTokens);

        uint256 totalValue = property.price;
        uint256 commission = (totalValue * 5) / 100;
        uint256 remainingValue = totalValue - commission;

        payable(companyWallet).transfer(commission);

        for (uint256 i = 0; i < totalTokens; i++) {
            address currentOwner = property.owner;
            uint256 ownerShare = (remainingValue * property.tokenBalances[currentOwner]) / totalTokens;
            payable(currentOwner).transfer(ownerShare);
        }

        property.owner = newOwner;
        emit PropertySold(propertyId, newOwner, totalTokens);
    }

    // Función para alquilar una propiedad tokenizada
    function rentProperty(
        string memory propertyId,
        string memory propertyType,
        uint256 rooms,
        uint256 parking,
        uint256 bathrooms,
        bool isPremium,
        bool isCentral,
        bool acceptsPets,
        bool hasTransport,
        uint256 rentalDays
    ) external payable {
        Property storage property = properties[propertyId];
        require(property.tokenized, "Property not tokenized.");
        
        uint256 rentalPrice = calculateRentalPrice(propertyType, rooms, parking, bathrooms, isPremium, isCentral, acceptsPets, hasTransport) * rentalDays;

        require(msg.value >= rentalPrice, "Insufficient rental payment.");

        chargeTransactionFee(rentalPrice);
        emit PropertyRented(propertyId, msg.sender, rentalDays, rentalPrice);
    }
}



este codigo es un card que muestro dentro del dashboard del proyecto, pero me falta crear el link de referido, el link de referido debera de obtener el username del usuario conectado actualmente, el link debera de redireccionar al siguiente link https://dinsy.pro/home/auth# y en el campo