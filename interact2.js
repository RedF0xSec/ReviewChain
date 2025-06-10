const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));
const SupportReviewManagerAbi = JSON.parse(fs.readFileSync('SupportReviewManagerAbi.json', 'utf8'));

const TokenManagerAddress = '0x0a07975ddC234F0A4D4fc1A5978D255836d0C4C9';
const ReviewManagerAddress = '0xed18B5249b7D5FCc46FD3b0EAf66B42d651A9F24';
const ActorRegistryAddress = '0xD4922f3512a5aB31F784e883D9Bf41E61B3ca8EF';
const VoucherManagerAddress = '0xEB6b546c5305871A5B0D504EdeC0d127DB469160';
const SupportReviewManagerAddress = '0xC1bBf2c3F5d4A6bE8e7D9cF5aB3f4E6d7F8e9A0B';

const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);
const actorRegistryContract = new web3.eth.Contract(ActorRegistryAbi, ActorRegistryAddress);
const voucherManagerContract = new web3.eth.Contract(VoucherManagerAbi, VoucherManagerAddress);
const supportReviewManagerContract = new web3.eth.Contract(SupportReviewManagerAbi, SupportReviewManagerAddress);

async function interact2() {
    try {
        const accounts = await web3.eth.getAccounts();
        const ristorante = accounts[1];
        const utente = accounts[2];
        const prezzo = web3.utils.toWei('1', 'ether');

        // 1. Errore: ristorante non registrato
        try {
            await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo });
        } catch (e) {
            console.log("Errore atteso: ristorante non registrato");
            /*console.error('Errore:', error);
            // Stampa dettagli aggiuntivi dell'errore
            console.error('Dettagli dell\'errore:', JSON.stringify(error, null, 2));*/
        }
        // 2. Registra il ristorante manualmente se necessario
        // Registra il ristorante
        const piva = "IT12345678901";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);

        // 3.a Prova di pagamento con saldo insufficiente
        /*
        try {
            await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: 0 });
        } catch (e) {
            console.log("Errore atteso: saldo insufficiente");
        }
        */
       await voucherManagerContract.methods.setAuthorizedAddress(
            TokenManagerAddress,
            SupportReviewManagerAddress
        ).send({ from: accounts[0] });
        // 3.b Prova di pagamento con saldo sufficiente
        try {
            await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({
                from: utente,
                value: prezzo,
                gas: 6000000
            });
            console.log("Pagamento riuscito con saldo sufficiente");
        } catch (error) {
            console.error('Errore:', error);
        }
        
    } catch (error) {
        console.error('Errore nella funzione interact2:', error);
    }
}

interact2().catch(console.error);
