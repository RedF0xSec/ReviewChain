const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const TokenManagerAddress = '';
const ReviewManagerAddress = '';

const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);

async function interact3() {
    try {
        const accounts = await web3.eth.getAccounts();
        const ristorante = accounts[1];
        const utente1 = accounts[2];
        const utente2 = accounts[3];
        const prezzo = web3.utils.toWei('1', 'ether');

        // Utente1 effettua pagamento e lascia una recensione
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente1, value: prezzo });
        const reviewID = await reviewManagerContract.methods.addReview(ristorante, "Recensione di utente1").send({ from: utente1 }); 
        console.log("Recensione di utente1 aggiunta, ID:", reviewID);

        // Utente2 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente2, value: prezzo });

        // Utente2 mette like alla recensione di utente1
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2 });
        console.log("Utente2 ha messo like alla recensione di utente1");

        // Errore: utente2 prova a mettere like di nuovo
        try {
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2 });
        } catch (e) {
            console.log("Errore atteso: utente2 non può mettere like due volte alla stessa recensione");
        }
    } catch (error) {
        console.error('Errore:', error);
    }
}

interact3().catch(console.error);
