const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));
const SupportReviewManagerAbi = JSON.parse(fs.readFileSync('SupportReviewManagerAbi.json', 'utf8'));

const ActorRegistryAddress = '0xE8956f40c1D10A5795e6fF1570F4A3FF4D167e78';
const VoucherManagerAddress = '0xc335C5B19496b329550Ec23045F979AF571E0e52';
const TokenManagerAddress = '0xc3162e223F8C8719Ba7804C21c62427d03a73235';
const SupportReviewManagerAddress = '0x32afB62De4Cf75ee2d597DE9D8157D1228A35Bb2';
const ReviewManagerAddress = '0xffA487Ae71eda28eaF4C777CD608000532c7E377';

const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);
const actorRegistryContract = new web3.eth.Contract(ActorRegistryAbi, ActorRegistryAddress);
const voucherManagerContract = new web3.eth.Contract(VoucherManagerAbi, VoucherManagerAddress);
const supportReviewManagerContract = new web3.eth.Contract(SupportReviewManagerAbi, SupportReviewManagerAddress);


// ##################################################################
//   Funzione per impostare gli indirizzi autorizzati nei contratti 
// ##################################################################
async function setup() {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];
        
        //Imposto gli indirizzi autorizzati
        await voucherManagerContract.methods.setAuthorizedAddress(
            TokenManagerAddress,
            SupportReviewManagerAddress
        ).send({ from: owner });

        await tokenManagerContract.methods.setAuthorizedAddress(SupportReviewManagerAddress).send({ from: owner });

        await supportReviewManagerContract.methods.setAuthorizedAddress(ReviewManagerAddress).send({ from: owner });
    }       

// ##################################################################
//         Funzione per testare il pagamento e la recensione
// ##################################################################
async function pagamentoRecensione() {
    const accounts = await web3.eth.getAccounts();
    const ristorante = accounts[1];
    const utente = accounts[2];
    const prezzo = web3.utils.toWei('1', 'ether');
    let gasFee = 1000000; // Imposta una gas fee fissa per il test

    // Listeners
    actorRegistryContract.events.RestaurantAdded().on('data', event => {
        console.log('[EVENT] RestaurantAdded:', event.returnValues);
    });

    // 1. Errore: ristorante non registrato
    try {
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo });
    } catch (e) {
        console.log("Errore atteso: ristorante non registrato");
    }

    // 2. Registra il ristorante
    const piva = "IT12345678901";
    await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
    console.log("Ristorante registrato con partita IVA:", piva);
    gasFee = 1000000; // Imposta una gas fee fissa per il test

    // 3. Prova di pagamento
    try{
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo, gas: gasFee });
        console.log("Pagamento effettuato con successo");
    }
    catch (e) {
        console.log("Errore atteso: saldo insufficiente"); //per provare questo errore, basta mettere 0 come value
    }

    // 4. Controllo token ricevuto
    const tokenCount = await tokenManagerContract.methods.getTokenCountUserPerRestaurant(utente, ristorante).call();
    console.log("Token ricevuti dall'utente per il ristorante:", tokenCount);

    // 5. Lascio una recensione (solo se ho almeno 1 token)
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

    // 6. Controllo se la recensione è stata aggiunta
    await reviewManagerContract.methods.getRestaurantReviewsByAddress(ristorante).send({ from: utente, gas: 6000000});
    
}

// ##################################################################
//          Funzione per testare il like alla recensione
// ##################################################################
async function likeRecensione() {
    let reviewID = 0;
    let voucherID = 0;

    // Listeners
    supportReviewManagerContract.events.ReviewLiked().on('data', (event) => {
        console.log('[EVENT] Review Liked:', event.returnValues);
    });
    
    tokenManagerContract.events.Payment().on('data', (event) => {
        console.log('[EVENT] Payment:', event.returnValues);
    });

    supportReviewManagerContract.events.ReviewAdded().on('data', (event) => {
        console.log('[EVENT] Review added:', event.returnValues);
        reviewID = event.returnValues.reviewID; // Salva l'ID della recensione
    });

    voucherManagerContract.events.VoucherEmitted().on('data', (event) => {
        console.log('[EVENT] Emitted Voucher:', event.returnValues);
        voucherID = event.returnValues.id; // Salva l'ID del voucher
    });

    actorRegistryContract.events.RestaurantAdded().on('data', event => {
        console.log('[EVENT] RestaurantAdded:', event.returnValues);
    });

    try {
        const accounts = await web3.eth.getAccounts();
        const ristorante = accounts[1];
        const utente1 = accounts[3];
        const utente2 = accounts[4];
        const utente3 = accounts[5];
        const utente4 = accounts[6];
        const utente5 = accounts[7];
        const prezzo = web3.utils.toWei('2', 'ether');

        // 1. Registra il ristorante manualmente se necessario
        // Registra il ristorante
        const piva = "IT10762910015";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);

        // 2. Utente1 effettua pagamento e lascia una recensione
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente1, value: prezzo });
        await reviewManagerContract.methods.addReview(ristorante, "Recensione di utente1").send({ from: utente1,  gas: 6000000}); 
        console.log(reviewID);
        
        // 3. Utente2 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente2, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2, gas: 6000000 });
        console.log("Utente2 ha messo like alla recensione di utente1");

        // 4. Utente3 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente3, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente3, gas: 6000000 });
        console.log("Utente3 ha messo like alla recensione di utente1");

        // 4.b Errore: utente2 prova a mettere like di nuovo
        try {
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2 });
        } catch (e) {
            console.log("Errore atteso: utente2 non può mettere like due volte alla stessa recensione");
        }

        // 5. Utente4 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente4, value: prezzo });
        try{
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente4, gas: 6000000 });
            console.log("Utente4 ha messo like alla recensione di utente1");
        }
        catch (e) {
            console.log("Errore atteso: utente4 non può mettere like alla recensione di utente1");
        }

        // 6. Utente5 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente5, value: prezzo });
        try{
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente5, gas: 6000000 });
            console.log("Utente5 ha messo like alla recensione di utente1");
        }
        catch (e) {
            console.log("Errore atteso: utente5 non può mettere like alla recensione di utente1");
        }

        // 7. Vedi il numero di like alla recensione
        const likes = await reviewManagerContract.methods.getNumberofLikes(reviewID).call();
        console.log(`La recensione di utente1 ha ${likes} like`);

        const prezzomaggiorato = web3.utils.toWei('5', 'ether'); 
        await tokenManagerContract.methods.pay(ristorante, prezzomaggiorato, voucherID).send({ from: utente1, value: prezzomaggiorato, gas: 6000000  });


    } catch (error) {
        console.error('Errore:', error);
    }
}

// ##################################################################
// Funzione per testare la modifica e cancellazione della recensione
// ##################################################################
async function testModificaDeleteRecensione() {
    const accounts = await web3.eth.getAccounts();
    const utente = accounts[2];
    const altroUtente = accounts[3];
    const ristorante = accounts[1];
    const prezzo = web3.utils.toWei('2', 'ether');

    supportReviewManagerContract.events.ReviewModified().on('data', event => {
        console.log('[EVENT] ReviewModified:', event.returnValues);
    });
    supportReviewManagerContract.events.ReviewDeleted().on('data', event => {
        console.log('[EVENT] ReviewDeleted:', event.returnValues);
    });
    supportReviewManagerContract.events.ReviewLiked().on('data', event => {
        console.log('[EVENT] ReviewLiked:', event.returnValues);
    });

    // 1. Registra il ristorante
    const piva = "IT12345678901";
    await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
    console.log("Ristorante registrato con partita IVA:", piva);
    gasFee = 1000000; // Imposta una gas fee fissa per il test

    // 2. Prova di pagamento
    try{
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo, gas: gasFee });
        console.log("Pagamento effettuato con successo");
    }
    catch (e) {
        console.log("Errore atteso: saldo insufficiente"); //per provare questo errore, basta mettere 0 come value
    }

    // 5. Lascio una recensione (solo se ho almeno 1 token)
     try {
        await reviewManagerContract.methods.addReview(ristorante, "Recensione senza token").send({ from: utente, gas: 6000000 });
    } catch (e) {
        console.log("Errore atteso: impossibile lasciare recensione senza token");
    }

    // 6. Recupera la prima recensione del ristorante
    const reviewIDs = await reviewManagerContract.methods.getRestaurantReviewsByAddress(ristorante).call();
    console.log("Recensioni del ristorante:", reviewIDs);
    const reviewID = reviewIDs[0];

    // 7. Modifica della recensione da parte dell’autore (successo)
    try {
        await reviewManagerContract.methods.modifyReview(reviewID, "Recensione aggiornata!").send({ from: utente, gas: 6000000 });
        console.log("Modifica recensione da parte dell'autore: SUCCESSO");
    } catch (e) {
        console.log("Errore inatteso nella modifica da parte dell'autore");
    }

    // 8. Modifica della recensione da parte di un altro utente (errore atteso)
    try {
        await reviewManagerContract.methods.modifyReview(reviewID, "Tentativo di modifica non autorizzato").send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("Errore atteso: modifica recensione non propria");
    }

    // 9. Cancellazione della recensione da parte di un altro utente (errore atteso)
    try {
        await reviewManagerContract.methods.deleteReview(reviewID).send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("Errore atteso: cancellazione recensione non propria");
    }

    // 10. Cancellazione della recensione da parte dell’autore (successo)
    try {
        await reviewManagerContract.methods.deleteReview(reviewID).send({ from: utente, gas: 6000000 });
        console.log("Cancellazione recensione da parte dell'autore: SUCCESSO");
    } catch (e) {
        console.log("Errore inatteso nella cancellazione da parte dell'autore");
    }
}


// Funzione per testare i casi di errore
async function testErrorCases() {
    const accounts = await web3.eth.getAccounts();
    const utente = accounts[2];
    const altroUtente = accounts[3];
    const ristorante = accounts[1];

    // 1. Prova a mettere like a una recensione che non esiste
    try {
        await reviewManagerContract.methods.likeReview(9999).send({ from: utente, gas: 6000000 });
    } catch (e) {
        console.log("Errore atteso: like su recensione inesistente");
    }

    // 2. Prova a modificare una recensione non tua
    const reviewIDs = await reviewManagerContract.methods.restaurant_reviews(ristorante).call();
    const reviewID = reviewIDs[0];
    try {
        await reviewManagerContract.methods.modifyReview(reviewID, "Nuovo contenuto non autorizzato").send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("Errore atteso: modifica recensione non propria");
    }

    // 3. Prova a cancellare una recensione non tua
    try {
        await reviewManagerContract.methods.deleteReview(reviewID).send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("Errore atteso: cancellazione recensione non propria");
    }

    // 4. Prova a modificare una recensione dopo il limite temporale (simulato)
    try {
        await reviewManagerContract.methods.modifyReview(reviewID, "Cambio dopo 24h").send({ from: utente, gas: 6000000 });
    } catch (e) {
        console.log("Errore atteso: modifica recensione fuori tempo massimo");
    }

    // 5. Prova a usare un voucher già usato
    try {
        await tokenManagerContract.methods.pay(ristorante, web3.utils.toWei('1', 'ether'), 1).send({
            from: utente,
            value: web3.utils.toWei('1', 'ether'),
            gas: 6000000
        });
    } catch (e) {
        console.log("Errore atteso: voucher già usato");
    }

    // 6. Pagamento con saldo insufficiente
    try {
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: 0 });
    } catch (e) {
        console.log("Errore atteso: saldo insufficiente");
    }
}

async function main() {
    await setup();
    await pagamentoRecensione();
    await likeRecensione();
    await testModificaDeleteRecensione(); 
    //await testErrorCases();
}


main().catch(console.error);