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
}



