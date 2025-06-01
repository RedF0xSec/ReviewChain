// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Questo contratto deve rappresentare un finto oracolo (MockOracle)
contract CertifiedAuthority {
    address public owner;
    string[] private validPivas;

    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not contract owner");
        _;
    }

    // Constructor
    constructor() {
        owner = msg.sender;
    }
    
    function isPivaValid(string memory piva) public onlyOwner view returns (bool){

    }
}
