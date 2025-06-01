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
        const utente1 = accounts[2];
        const utente2 = accounts[3];

        // 2. Registra il ristorante
        const piva = "IT12345678901";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);

        // 3. Utente1 aggiunge una recensione
        const ristoranteOnChain = web3.utils.sha3(ristorante); //qui vanno hashati?
        const utente1OnChain = web3.utils.sha3(utente1);
        const contenutoRecensione = "Ottimo cibo e servizio!";
        const reviewID  = await reviewManagerContract.methods.addReview(utente1, ristorante, contenutoRecensione).send({ from: utente1 });
        console.log("Recensione aggiunta da utente1, ID:", reviewID);

        // 4. Utente2 mette like alla recensione
        const utente2OnChain = web3.utils.sha3(utente2);
        await reviewManagerContract.methods.likeReview(reviewID, utente2).send({ from: utente2 });
        console.log("Utente2 ha messo like alla recensione", reviewID);



    } catch (error) {
        console.error('Errore:', error);
        // Stampa dettagli aggiuntivi dell'errore
        console.error('Dettagli dell\'errore:', JSON.stringify(error, null, 2));
    }
}

// Esegui lo script
interactWithContracts().catch(console.error);