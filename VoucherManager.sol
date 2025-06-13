// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ActorRegistry.sol";

struct Voucher {
    address Uaddress;
    address Raddress;
    uint256 discount;
    bool available;
    string metadataURI;
}

// Qui va aggiunto qualcosa che possa far capire se è stato già usato o no
// voglio mettere un booleano che mi dica se è stato usato o no, ma non so se è una buona idea


contract VoucherManager {
    uint256 private counter; //per l'id progressivo dei voucher
    mapping(uint256 => Voucher) public vouchers;    //voucher associato all'id
    ActorRegistry private actorRegistry;
    address private tokenManager;
    address private supportReviewManager;
    address private owner;

    event VoucherEmitted(uint256 indexed id, address indexed Uaddress, address indexed Raddress, uint256 discount, bool available, string metadataURI);
    
    constructor(address _actorRegistry) {
        actorRegistry = ActorRegistry(_actorRegistry);
        owner = msg.sender;
        counter = 1;
    }

    modifier onlyTokenManager {
        require(msg.sender == tokenManager, "ERR02");
        _;
    }

    modifier onlyOwner {
        require(msg.sender == owner, "ERR04");
        _;
    }

    function setAuthorizedAddress( address _tokenManager, address _supportReviewManager) external onlyOwner{
        tokenManager = _tokenManager;
        supportReviewManager = _supportReviewManager;
    }

    // Funzione interna per emettere un voucher
    function emitVoucher(address _Uaddress, address _Raddress, uint256 _discount, string memory _metadataURI) external 
    {
        //check per verificare l'identità dell'utente
        require(msg.sender == supportReviewManager, "ERR02");
        require(actorRegistry.verifySeller(_Raddress), "ERR03");
        require(_discount > 0, "ERR09");
        vouchers[counter] = Voucher(_Uaddress, _Raddress, _discount, true, _metadataURI);

        emit VoucherEmitted(counter, _Uaddress, _Raddress, _discount, true, _metadataURI);
        counter++;
    }

    //Funzione che restituisce il vaucher
    function getVoucher(uint256 idVaucher) external view returns (address Uaddress, address Raddress, uint256 discount, bool available){
        require(msg.sender == vouchers[idVaucher].Uaddress, "ERR02");
        
        return (vouchers[idVaucher].Uaddress, vouchers[idVaucher].Raddress, vouchers[idVaucher].discount, vouchers[idVaucher].available);
    }

    //Funzione per rendere il voucher non utilizzabile
    function invalidateVoucher(uint256 idVaucher) external onlyTokenManager {
        vouchers[idVaucher].available = false;
    }

    //Funzione per verificare se il voucher è applicabile
    function applyVoucher(uint256 voucherID, address Uaddress, address Raddress, uint256 amount) external view onlyTokenManager returns (uint256){
        if(voucherID == 0)
            return amount;
        require(Uaddress == vouchers[voucherID].Uaddress, "ERR07");
        require(Raddress == vouchers[voucherID].Raddress, "ERR08");
        require(actorRegistry.verifySeller(Raddress), "ERR03");
        require(vouchers[voucherID].discount <= amount, "ERR09");
        require(vouchers[voucherID].available, "ERR09");

        return amount - vouchers[voucherID].discount;
    }
}



