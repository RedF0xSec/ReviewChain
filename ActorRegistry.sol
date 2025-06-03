// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CertifiedAuthority.sol";

contract ActorRegistry {
    address public owner;
    CertifiedAuthority public certifiedAuthority;
    mapping(address => bool) public verifiedSellers;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    // Constructor
    constructor(address _certifiedAuthority) {
        owner = msg.sender;
        certifiedAuthority = CertifiedAuthority(_certifiedAuthority);
    }

    // Aggiunge un seller se la PIVA è valida
    function addSeller(address restaurant, string calldata piva) public {
        require(certifiedAuthority.isPivaValid(piva), "piva not valid");
        verifiedSellers[restaurant] = true;
    }

    // Controlla se un ristorante è verificato
    function verifySeller(address restaurant) public view returns (bool) {
        return verifiedSellers[restaurant];
    }
}
