const { Web3 } = require('web3');
const fs = require('fs');

// Connect to Ganache
const web3 = new Web3('http://localhost:7545');

// Load ABI and Bytecode
const TokenManager_abi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const TokenManager_bytecode = fs.readFileSync('TokenManagerBytecode.bin', 'utf8');

const ActorRegistry_abi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const ActorRegistry_bytecode = fs.readFileSync('ActorRegistryBytecode.bin', 'utf8');

const CertifiedAuthority_abi = JSON.parse(fs.readFileSync('CertifiedAuthorityAbi.json', 'utf8'));
const CertifiedAuthority_bytecode = fs.readFileSync('CertifiedAuthorityBytecode.bin', 'utf8');

const ReviewManager_abi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const ReviewManager_bytecode = fs.readFileSync('ReviewManagerBytecode.bin', 'utf8');

const VoucherManager_abi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));
const VoucherManager_bytecode = fs.readFileSync('VoucherManagerBytecode.bin', 'utf8');

async function deployContract() {
    const accounts = await web3.eth.getAccounts();

    console.log('Deploying from account:', accounts[0]);

    // Deploy CertifiedAuthority contract PRIMA
    const CertifiedAuthority_contract = new web3.eth.Contract(CertifiedAuthority_abi);
    const deployedCertifiedAuthorityContract = await CertifiedAuthority_contract
        .deploy({ data: '0x' + CertifiedAuthority_bytecode })
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
    console.log('CertifiedAuthority deployed at address:', deployedCertifiedAuthorityContract.options.address);

    // Deploy ActorRegistry contract, passando l'indirizzo di CertifiedAuthority
    const ActorRegistry_contract = new web3.eth.Contract(ActorRegistry_abi);
    const deployedActorRegistryContract = await ActorRegistry_contract
        .deploy({ data: '0x' + ActorRegistry_bytecode, arguments: [deployedCertifiedAuthorityContract.options.address] })
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
    console.log('ActorRegistry deployed at address:', deployedActorRegistryContract.options.address);

    // Deploy VoucherManager contract con l'indirizzo di ActorRegistry
    const VoucherManager_contract = new web3.eth.Contract(VoucherManager_abi);
    const deployedVoucherManagerContract = await VoucherManager_contract
        .deploy({ data: '0x' + VoucherManager_bytecode, arguments: [deployedActorRegistryContract.options.address] })
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
    console.log('VoucherManager deployed at address:', deployedVoucherManagerContract.options.address);

    // Deploy TokenManager contract, passando l'indirizzo di ActorRegistry e di VoucherManager
    const TokenManager_contract = new web3.eth.Contract(TokenManager_abi);
    const deployedTokenManagerContract = await TokenManager_contract
        .deploy({ data: '0x' + TokenManager_bytecode, arguments: [deployedActorRegistryContract.options.address, deployedVoucherManagerContract.options.address] })
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
    console.log('TokenManager deployed at address:', deployedTokenManagerContract.options.address);

    // Deploy ReviewManager contract, passando l'indirizzo di ActorRegistry, VoucherManager e TokenManager
    const ReviewManager_contract = new web3.eth.Contract(ReviewManager_abi);
    const deployedReviewManagerContract = await ReviewManager_contract
        .deploy({ data: '0x' + ReviewManager_bytecode, arguments: [deployedTokenManagerContract.options.address, deployedActorRegistryContract.options.address, deployedVoucherManagerContract.options.address] })
        .send({ from: accounts[0], gas: 1500000, gasPrice: '30000000000' });
    console.log('ReviewManager deployed at address:', deployedReviewManagerContract.options.address);

}

deployContract().catch(console.error);
