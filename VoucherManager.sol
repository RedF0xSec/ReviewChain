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
contract VoucherManager {
    uint256 public counter; //per l'id progressivo dei voucher
    mapping(uint256 => Voucher) public vouchers;
    address public actorRegistry;

    event VoucherEmitted(uint256 indexed id, address indexed customer, address indexed restaurant, uint256 discount, string metadataURI);
    
    constructor(address _actorRegistry) {
        actorRegistry = _actorRegistry;
    }

    // Funzione interna per emettere un voucher
    function emitVoucher(address customer, address restaurant, uint256 discount, string memory metadataURI) external {
    
    }

    // Funzione getter
    function getVoucher(uint256 id) external view returns (address owner, address restaurant, uint256 discount) {
        Voucher memory v = vouchers[id];
        return (v.owner, v.restaurant, v.discount);
    }
}



