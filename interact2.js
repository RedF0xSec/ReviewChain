const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));
const SupportReviewManagerAbi = JSON.parse(fs.readFileSync('SupportReviewManagerAbi.json', 'utf8'));

const ActorRegistryAddress = '0xa7A8eA3D67f2274dC466Df5986CE7e5a3630Da44';
const VoucherManagerAddress = '0x790Da60C7304c19ecb5d44399869eC3316b58679';
const TokenManagerAddress = '0x8AB439a80651e84E0a3B7459451AC479a5e42F46';
const SupportReviewManagerAddress = '0x96d9CF50703C967C8fB4034777c65B370E039b63';
const ReviewManagerAddress = '0xf1e57F1edbBAA6D297b4437F3C9199841F50D16a';

const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);
const actorRegistryContract = new web3.eth.Contract(ActorRegistryAbi, ActorRegistryAddress);
const voucherManagerContract = new web3.eth.Contract(VoucherManagerAbi, VoucherManagerAddress);
const supportReviewManagerContract = new web3.eth.Contract(SupportReviewManagerAbi, SupportReviewManagerAddress);

async function interact2() {
    const accounts = await web3.eth.getAccounts();
    const ristorante = accounts[1];
    const utente = accounts[2];
    const prezzo = web3.utils.toWei('2', 'ether');

    //Listeners to the payment event
    voucherManagerContract.events.VoucherEmitted().on('data', (event) => {
        console.log('Emitted Voucher Event:', event.returnValues);
    });

    tokenManagerContract.events.TokenIncremented().on('data', (event) => {
        console.log('Token incremented Event:', event.returnValues);
    });
    
    supportReviewManagerContract.events.ReviewAdded().on('data', (event) => {
        console.log('Review added Event:', event.returnValues);
    });

    reviewManagerContract.events.RestaurantReviews().on('data', (event) => {
        console.log('Restaurant Reviews Event:', event.returnValues);
    });
    
    try {
        // 1. Errore: ristorante non registrato
        try {
            await tokenManagerContract.methods.pay(accounts[8], prezzo, 0).send({ from: utente, value: prezzo });
        } catch (e) {
            console.log("Errore atteso: ristorante non registrato");
            /*console.error('Errore:', error);
            // Stampa dettagli aggiuntivi dell'errore
            console.error('Dettagli dell\'errore:', JSON.stringify(error, null, 2));*/
        }

        // 2. Registra il ristorante manualmente se necessario
        // Registra il ristorante
        const piva = "IT10762910015";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);

        // 3.a Prova di pagamento con saldo insufficiente
        /*
        try {
            await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: 0 });
        } catch (e) {
            console.log("Errore atteso: saldo insufficiente -");
        }
        */

        gasFee = 1000000; // Imposta una gas fee fissa per il test

        try{
            await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo, gas: gasFee });
            console.log("Pagamento effettuato con successo");
        }
        catch (e) {
            console.log("Errore atteso: saldo insufficiente");
        }

        // 8. Controllo token ricevuto
        const tokenCount = await tokenManagerContract.methods.getTokenCountUserPerRestaurant(utente, ristorante).call();
        console.log("Token ricevuti dall'utente per il ristorante:", tokenCount);

        // 9. Lascio una recensione (solo se ho almeno 1 token)
        if (tokenCount > 0) {
            const content = "Ottimo ristorante!";
            await reviewManagerContract.methods.addReview(ristorante, content).send({ from: utente, gas: 6000000 });
            console.log("Recensione lasciata con successo:", content);
        } else {
            try {
                await reviewManagerContract.methods.addReview(ristorante, "Recensione senza token").send({ from: utente, gas: 6000000 });
            } catch (e) {
                console.log("Errore atteso: impossibile lasciare recensione senza token");
            }
        }

        // 10. Controllo se la recensione è stata aggiunta
        await reviewManagerContract.methods.getRestaurantReviewsByAddress(ristorante).send({ from: utente, gas: 6000000});
    
    } catch (error) {
        console.error('Errore nella funzione interact2:', error);
    }
}

interact2().catch(console.error);
