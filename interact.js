const { Web3 } = require('web3');
const fs = require('fs');

// Connect to Ganache
const web3 = new Web3('ws://localhost:7545');

// Load ABI
const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const CertifiedAuthorityAbi = JSON.parse(fs.readFileSync('CertifiedAuthorityAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));

// Set contract addresses
const CertifiedAuthorityAddress = '0xd3b3894810d327c8E70A6a28DCA97e8E7EE7cD3f';
const ActorRegistryAddress = '0xbAB046f5Aa3944D7b58E7751cDB67A2abFD3d940';
const VoucherManagerAddress = '0x0AE931Bd601b938BD5Aa8F085aDcb16fFddC8840';
const TokenManagerAddress = '0x1dD84Da91b54CA6bcF7b38CD97885f7c7bB25624';
const ReviewManagerAddress = '0x3b2b6d420e2EEa4511E4589ed8BbA538f39C50f6';


const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const actorRegistryContract = new web3.eth.Contract(ActorRegistryAbi, ActorRegistryAddress);
const certifiedAuthorityContract = new web3.eth.Contract(CertifiedAuthorityAbi, CertifiedAuthorityAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);
const voucherManagerContract = new web3.eth.Contract(VoucherManagerAbi, VoucherManagerAddress);

async function interactWithContracts() {
    try {
        const accounts = await web3.eth.getAccounts();
        const ristorante = accounts[1];

        // 2. Registra il ristorante
        const piva = "IT12345678901";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);

    } catch (error) {
        console.error('Errore:', error);
        // Stampa dettagli aggiuntivi dell'errore
        console.error('Dettagli dell\'errore:', JSON.stringify(error, null, 2));
    }
}

// Esegui lo script
interactWithContracts().catch(console.error);