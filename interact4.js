const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));

const TokenManagerAddress = '';
const ReviewManagerAddress = '';
const VoucherManagerAddress = '';

const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);
const voucherManagerContract = new web3.eth.Contract(VoucherManagerAbi, VoucherManagerAddress);

async function interact4() {
    try {
        const accounts = await web3.eth.getAccounts();
        const ristorante = accounts[1];
        const utente = accounts[2];
        const prezzo = web3.utils.toWei('1', 'ether');
        const sogliaRecensioni = 3; // esempio soglia

        // 1. L'utente effettua pagamenti e lascia recensioni fino a raggiungere la soglia
        for (let i = 0; i < sogliaRecensioni; i++) {
            await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo });
            await reviewManagerContract.methods.addReview(ristorante, `Recensione n.${i+1}`).send({ from: utente });
        }
        console.log(`Utente ha raggiunto la soglia di ${sogliaRecensioni} recensioni.`);

        // 2. Il ristorante emette un voucher per l'utente 
        const discount = web3.utils.toWei('0.2', 'ether');
        const metadataURI = "ipfs://voucher-premio";
        await voucherManagerContract.methods.emitVoucher(utente, ristorante, discount, metadataURI).send({ from: ristorante });
        console.log("Voucher premio emesso per l'utente");

        // 3. Recupera l'ID del voucher appena emesso
        const voucherCounter = await voucherManagerContract.methods.counter().call(); //non sono sicura di questo onesto
        const voucherID = voucherCounter - 1;

        // 4. L'utente effettua un nuovo pagamento usando il voucher
        await tokenManagerContract.methods.pay(ristorante, prezzo, voucherID).send({ from: utente, value: prezzo });
        console.log("Pagamento effettuato con successo usando il voucher premio");

        // 5. Errore: tentativo di riutilizzo del voucher
        try {
            await tokenManagerContract.methods.pay(ristorante, prezzo, voucherID).send({ from: utente, value: prezzo });
        } catch (e) {
            console.log("Errore atteso: voucher già utilizzato/non più valido");
        }
    } catch (error) {
        console.error('Errore:', error);
    }
}

interact4().catch(console.error);
