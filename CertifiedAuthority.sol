// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Questo contratto deve rappresentare un finto oracolo (MockOracle)
contract CertifiedAuthority {
    address public owner;
    mapping(string => string) private validPivas;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
        // Inizializzazione di alcune PIVA valide
        validPivas["IT12345678901"] = "CHEZ DARIO D'AGOSTINO";
        validPivas["IT10762910015"] = "PEPPERONI PIZA PLAZA";
        validPivas["IT04273860611"] = "P. GRECO";
    }
    
    function isPivaValid(string memory piva) public onlyOwner view returns (bool){
        return validPivas[piva];
    }
}
