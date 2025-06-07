// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ActorRegistry.sol";

struct Voucher {
    uint256 id;
    address owner;
    address restaurant;
    uint256 discount;
    string metadataURI;
}

// Qui va aggiunto qualcosa che possa far capire se è stato già usato o no
// voglio mettere un booleano che mi dica se è stato usato o no, ma non so se è una buona idea


contract VoucherManager {
    address public owner_contract; // Proprietario del contratto
    uint256 public counter; //per l'id progressivo dei voucher
    mapping(uint256 => Voucher) public vouchers;
    address public actorRegistry;

    event VoucherEmitted(uint256 indexed id, address indexed customer, address indexed restaurant, uint256 discount, string metadataURI);
    
    constructor(address _actorRegistry) {
        actorRegistry = _actorRegistry;
        counter = 1; // Inizializza il contatore a zero
        owner_contract = msg.sender; // Imposta il proprietario del contratto
    }

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner_contract, "Not contract owner");
        _;
    }

    // Funzione interna per emettere un voucher
    function emitVoucher(address customer, address restaurant, uint256 discount, string memory metadataURI) external onlyOwner() {

        require(ActorRegistry(actorRegistry).verifySeller(restaurant), "Restaurant not registered");
        require(customer != address(0), "Invalid customer address");
        require(restaurant != address(0), "Invalid restaurant address");
        require(discount > 0, "Discount must be greater than zero");

        // Incrementa il contatore per ottenere un nuovo id
        counter++;

        // Crea il nuovo voucher
        vouchers[counter] = Voucher({
            id: counter,
            owner: customer,
            restaurant: restaurant,
            discount: discount,
            metadataURI: metadataURI
        });

        // Emetti l'evento
        emit VoucherEmitted(counter, customer, restaurant, discount, metadataURI);
    }

    // Funzione getter
    function getVoucher(uint256 id) external view returns (address owner, address restaurant, uint256 discount) {
        Voucher memory v = vouchers[id];
        return (v.owner, v.restaurant, v.discount);
    }
}



