const solc = require('solc');
const fs = require('fs');
const path = require('path');

// Function to read the Solidity file
function readContract(contractName) {
    const contractPath = path.resolve(__dirname, contractName);
    return fs.readFileSync(contractPath, 'utf8');
}

// Read contracts
const certifiedAuthoritySource = readContract('CertifiedAuthority.sol');
const actorRegistrySource = readContract('ActorRegistry.sol');
const voucherManagerSource = readContract('VoucherManager.sol');
const tokenManagerSource = readContract('TokenManager.sol');
const reviewManagerSource = readContract('ReviewManager.sol');

// Input for the Solidity compiler
const input = {
    language: 'Solidity',
    sources: {
        'CertifiedAuthority.sol': { content: certifiedAuthoritySource },
        'ActorRegistry.sol': { content: actorRegistrySource },
        'VoucherManager.sol': { content: voucherManagerSource },
        'TokenManager.sol': { content: tokenManagerSource },
        'ReviewManager.sol': { content: reviewManagerSource },
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['abi', 'evm.bytecode'],
            },
        },
    },
};

// Compile the contracts
const compiledContracts = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(compiledContracts)
// Function to write ABI and Bytecode
function writeOutput(contractName) {
    console.log(`Compiling ${contractName}...`);
    const contractOutput = compiledContracts.contracts[`${contractName}.sol`][contractName];
    
    if (!contractOutput) {
        console.error(`Error: Contract ${contractName} not found.`);
        process.exit(1);
    }

    const abi = contractOutput.abi;
    const bytecode = contractOutput.evm.bytecode.object;

    fs.writeFileSync(`${contractName}Abi.json`, JSON.stringify(abi, null, 2));
    fs.writeFileSync(`${contractName}Bytecode.bin`, bytecode);

    console.log(`${contractName} compiled successfully!`);
}

// Write ABI and Bytecode files for each contract
writeOutput('CertifiedAuthority');
writeOutput('ActorRegistry');
writeOutput('VoucherManager');
writeOutput('TokenManager');
writeOutput('ReviewManager');


console.log('All contracts compiled successfully!');
