// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./CertifiedAuthority.sol";

// Questo contratto serve per registrare i ristoranti.
contract ActorRegistry {
    CertifiedAuthority public certifiedAuthority;
    mapping(address => bool) public verifiedSellers;

    event RestaurantAdded(address restaurant);

    // Constructor
    constructor(address _certifiedAuthority) {
        certifiedAuthority = CertifiedAuthority(_certifiedAuthority);
    }

    // Aggiunge un seller se la PIVA è valida
    function addSeller(address restaurant, string calldata piva) public {
        require(certifiedAuthority.isPivaValid(piva), "ERR01");

        verifiedSellers[restaurant] = true;
        emit RestaurantAdded(restaurant);
        
    }

    // Controlla se un ristorante è verificato
    function verifySeller(address restaurant) public view returns (bool) {
        return verifiedSellers[restaurant];
    }
}
