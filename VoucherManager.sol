// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ActorRegistry.sol";

struct Voucher {
    uint256 id;
    address owner;
    address restaurant;
    uint256 discount;
    bool available;
    string metadataURI;
}

contract VoucherManager {
    uint256 private counter; //per l'id progressivo dei voucher
    mapping(uint256 => Voucher) public vouchers;    //voucher associato all'id
    ActorRegistry private actorRegistry;
    address private reviewManager;
    address private tokenManager;

    event VoucherEmitted(uint256 indexed id, address indexed customer, address indexed restaurant, uint256 discount, bool available, string metadataURI);
    
    constructor(address _actorRegistry) {
        actorRegistry = ActorRegistry(_actorRegistry);
        counter = 0;
    }

    modifier onlyTokenManager {
        require(msg.sender == tokenManager, "Only TokenManager can perform this operation");
        _;
    }

    function setAuthorizedAddress(address _reviewManager, address _tokenManager) public {
        reviewManager = _reviewManager;
        tokenManager = _tokenManager;
    }

    // Funzione interna per emettere un voucher
    function emitVoucher(address _customer, address _restaurant, uint256 _discount, string memory _metadataURI) external {
        //check per verificare l'identità dell'utente
        //require(msg.sender == reviewManager, "Solo il review manager puo richiedere l'emissione di un voucher");
        require(actorRegistry.verifySeller(_restaurant), "restaurant not present");
        require(_discount > 0, "it can't be applied");
        vouchers[counter] = Voucher(counter, _customer, _restaurant, _discount, true, _metadataURI);
        counter++;
        emit VoucherEmitted(counter--, _customer, _restaurant, _discount, true, _metadataURI);
    }

    //Funzione che restituisce il vaucher
    function getVoucher(uint256 idVaucher) external view returns (address customer, address restaurant, uint256 discount, bool available){
        require(msg.sender == vouchers[idVaucher].owner, "not authorized");
        return (vouchers[idVaucher].owner, vouchers[idVaucher].restaurant, vouchers[idVaucher].discount, vouchers[idVaucher].available);
    }

    //Funzione per rendere il voucher non utilizzabile
    function invalidateVoucher(uint256 idVaucher) external onlyTokenManager {
        vouchers[idVaucher].available = false;
    }

    //Funzione per verificare se il voucher è applicabile
    function applyVoucher(uint256 voucherID, address owner, address restaurant, uint256 amount) external view onlyTokenManager returns (uint256){
        require(owner == vouchers[voucherID].owner, "You are not the owner of the NFT");
        require(restaurant == vouchers[voucherID].restaurant, "The restaurant associated with the NFT is not the same as the one you are paying");
        require(actorRegistry.verifySeller(restaurant), "The restaurant referenced by the NFT is not part of the affiliated system");
        require(vouchers[voucherID].discount <= amount, "You cannot use the voucher");
        require(vouchers[voucherID].available, "this voucher is already used");
        return amount - vouchers[voucherID].discount;
    }
}



