// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Questo contratto deve rappresentare un finto oracolo (MockOracle)
contract CertifiedAuthority {
    mapping(string => string) public validPivas;

    // Constructor
    constructor() {
        // Inizializzazione di alcune PIVA valide
        validPivas["IT12345678901"] = "CHEZ DARIO D'AGOSTINO";
        validPivas["IT10762910015"] = "PEPPERONI PIZA PLAZA";
        validPivas["IT04273860611"] = "P. GRECO";
    }
    //c'è il calldata perché è più efficiente con l'external
    function isPivaValid(string calldata piva) external view returns (bool){
        string memory value = validPivas[piva];
        return bytes(value).length > 0;
    }
}
