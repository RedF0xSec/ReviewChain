const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const CertifiedAuthorityAbi = JSON.parse(fs.readFileSync('CertifiedAuthorityAbi.json', 'utf8'));
const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));
const SupportReviewManagerAbi = JSON.parse(fs.readFileSync('SupportReviewManagerAbi.json', 'utf8'));

const CertifiedAuthorityAddress = '0x97Cc2cb1617bCE263a8CaCB881d28a666363973e';
const ActorRegistryAddress = '0x09581C8c1534F77772049B97f6D6409a9657Ce51';
const VoucherManagerAddress = '0x004a6Ace26c3ce638136d3a41fb4733CD4B4cd0a';
const TokenManagerAddress = '0xA1e8191B634FA8C12bd571Dc2Eebb356654bcBb5';
const SupportReviewManagerAddress = '0xDA0542507897d21D93ef6c80a3E77a5dA1095c18';
const ReviewManagerAddress = '0xd547C890E570b7918aa53a6a2c4238EE3E3D9dFB';

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
        
        console.log("Setup completato!");
        console.log("--------------------------------------------------------------\n");
    }

// ##################################################################
//          Funzione per impostare i listener degli eventi
// ##################################################################
function setupEventListeners() {
    // ActorRegistry
    actorRegistryContract.events.RestaurantAdded().on('data', (event) => {
        console.log('[EVENT] RestaurantAdded:', event.returnValues);
    });
    
    // TokenManager
    tokenManagerContract.events.Payment().on('data', (event) => {
        console.log('[EVENT] Payment:', event.returnValues);
    });
    tokenManagerContract.events.TokenIncremented().on('data', (event) => {
        console.log('[EVENT] TokenIncremented:', event.returnValues);
    });
    tokenManagerContract.events.TokenDecremented().on('data', (event) => {
        console.log('[EVENT] TokenDecremented:', event.returnValues);
    });
    
    // SupportReviewManager
    supportReviewManagerContract.events.ReviewLiked().on('data', (event) => {
        console.log('[EVENT] ReviewLiked:', event.returnValues);
    });
    supportReviewManagerContract.events.ReviewModified().on('data', (event) => {
        console.log('[EVENT] ReviewModified:', event.returnValues);
    });
    supportReviewManagerContract.events.ReviewDeleted().on('data', (event) => {
        console.log('[EVENT] ReviewDeleted:', event.returnValues);
    });

    // VoucherManager
    voucherManagerContract.events.VoucherEmitted().on('data', (event) => {
        console.log('[EVENT] VoucherEmitted:', event.returnValues);
    });
}

// ##################################################################
//         Funzione per testare il pagamento e la recensione
// ##################################################################
async function pagamentoRecensione() {
    const accounts = await web3.eth.getAccounts();
    const ristorante = accounts[1];
    const utente = accounts[2];
    const prezzo = web3.utils.toWei('1', 'ether');
    let gasFee = 1000000; // Impostiamo una gasFee fissa per questi test

    console.log("------INIZIO TEST DI PAGAMENTO E SCRITTURA RECENSIONE------");

    // 1. Errore: ristorante non registrato
    try {
        console.log("Tentativo di pagamento a un ristorante non registrato (errore atteso)");
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo });
    } catch (e) {
        console.log("ERRORE NEL PAGAMENTO: ristorante non registrato");
        //console.log(e)
        console.log("\n");
    }

    // 2. Registra il ristorante
    console.log("Registrazione del ristorante:");
    const piva = "IT12345678901";
    await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
    console.log("Ristorante registrato con partita IVA:", piva);
    console.log("\n");
    gasFee = 1000000; // Imposta una gas fee fissa per il test

    // 3. Prova di pagamento
    console.log("Tentativo di pagamento al ristorante:");
    await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo, gas: gasFee });
    console.log("\n");

    // 4. Controllo token ricevuto
    console.log("Controllo il numero di token ricevuti dall'utente per il ristorante:");
    const tokenCount = await tokenManagerContract.methods.getTokenCountUserPerRestaurant(utente, ristorante).call();
    console.log("Token ricevuti dall'utente per il ristorante:", tokenCount);

    // 5. Lascio una recensione (solo se ho almeno 1 token)
    console.log("Utente 1 scrive una recensione:");
    // Se l'utente ha almeno 1 token, lascia una recensione
    try{
        const content = "Ottimo ristorante!";
        await reviewManagerContract.methods.addReview(ristorante, content).send({ from: utente, gas: 6000000 });
        console.log("Recensione lasciata con successo:", content);
        console.log("\n");
    } catch (e) {
            console.log("Errore inatteso: impossibile lasciare recensione");
    }

    // 6. Controllo se la recensione è stata aggiunta
    console.log("Recupero gli ID delle recensioni del ristorante:");
    const reviewIDs = await reviewManagerContract.methods.getRestaurantReviewsByAddress(ristorante).call();
    console.log(reviewIDs);

    console.log("Contenuto delle recensioni:");
    for (const id of reviewIDs) {
        const review = await reviewManagerContract.methods.reviews(id).call();
        console.log(`- [${id}] ${review.content}`);
    }

    console.log("Test di pagamento e recensione completato!");
    console.log("--------------------------------------------------------------\n");
}

// ##################################################################
//          Funzione per testare il like alla recensione
// ##################################################################
async function likeRecensione() {
    let reviewID = 0;
    let voucherID = 0;

    //Questo listener serve per prendere l'ID della recensione, lo lascio qui per comodità di riprendere il reviewID
    supportReviewManagerContract.events.ReviewAdded().on('data', (event) => {
        console.log('[EVENT] ReviewAdded:', event.returnValues);
        reviewID = event.returnValues.reviewID; // Salva l'ID della recensione
    });
    //Questo listener serve per prendere l'ID del voucher, lo lascio qui per comodità di riprendere il voucherID
    voucherManagerContract.events.VoucherEmitted().on('data', (event) => {
        console.log('[EVENT] Emitted Voucher:', event.returnValues);
        voucherID = event.returnValues.id; // Salva l'ID del voucher
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

        console.log("-------------INIZIO TEST DI LIKE ALLA RECENSIONE--------------");

        // 1. Registra il ristorante manualmente se necessario
        // Registra il ristorante
        const piva = "IT10762910015";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);
        console.log("\n");

        // 2. Utente1 effettua pagamento e lascia una recensione
        console.log("Utente1 effettua pagamento, ottiene un token e lascia una recensione:");
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente1, value: prezzo });
        await reviewManagerContract.methods.addReview(ristorante, "Recensione di utente1").send({ from: utente1,  gas: 6000000}); 
        console.log("Review ID: ", reviewID);
        console.log("\n");
        
        // 3. Utente2 effettua pagamento (riceve token)
        console.log("Utente2 effettua pagamento, riceve un token e mette like alla recensione di utente1:");
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente2, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2, gas: 6000000 });
        console.log("\n");

        // 4. Utente3 effettua pagamento (riceve token)
        console.log("Utente3 effettua pagamento, ottiene un token e mette like alla recensione di utente1:");
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente3, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente3, gas: 6000000 });
        console.log("\n");

        // 4.b Errore: utente2 prova a mettere like di nuovo
        try {
            console.log("Utente2 prova a mettere like di nuovo alla recensione di utente1(errore atteso), rieffettuando nuovamente un pagamento:");
            await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente2, value: prezzo });
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2 });
        } catch (e) {
            console.log("Errore: utente2 non può mettere like due volte alla stessa recensione");
            //console.log(e)
            console.log("\n");
        }

        // 5. Utente4 effettua pagamento (riceve token e porta un voucher a utente1)
        console.log("Utente4 effettua pagamento, ottiene un token e mette like alla recensione di utente1:");
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente4, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente4, gas: 6000000 });
        console.log("Il suo like ha generato un voucher per utente1^^");
        console.log("\n");

        // 6. Utente5 effettua pagamento (riceve token)
        console.log("Utente5 effettua pagamento, ottiene un token e prova a mettere like alla recensione di utente1:");
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente5, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente5, gas: 6000000 });
        console.log("\n");

        // 7. Vedi il numero di like alla recensione
        console.log("Numero di like alla recensione di utente1:");
        const likes = await reviewManagerContract.methods.getNumberofLikes(reviewID).call();
        console.log(`La recensione di utente1 ha ${likes} like`);
        console.log("\n");

        // 8. Utente1 usa il voucher ricevuto
        console.log("Utente1 usa il voucher ricevuto:");
        const prezzomaggiorato = web3.utils.toWei('5', 'ether'); 
        await tokenManagerContract.methods.pay(ristorante, prezzomaggiorato, voucherID).send({ from: utente1, value: prezzomaggiorato, gas: 6000000  });

        console.log("Fine del test di like alla recensione!");
        console.log("--------------------------------------------------------------\n");
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

    console.log("--------INIZIO TEST DI MODIFICA E CANCELLAZIONE RECENSIONE-------");

    // 1. Registra il ristorante
    console.log("Registrazione del ristorante:");
    const piva = "IT12345678901";
    await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
    console.log("Ristorante registrato con partita IVA:", piva);
    console.log("\n");
    gasFee = 1000000; // Imposta una gas fee fissa per il test

    console.log("Tentativo di pagamento al ristorante:");
    await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo, gas: gasFee });
    console.log("\n");

    // 2. Lascio una recensione (solo se ho almeno 1 token)
    console.log("Tentativo di lasciare una recensione:");
    await reviewManagerContract.methods.addReview(ristorante, "Recensione bellissima e poetica").send({ from: utente, gas: 6000000 });
    console.log("\n");

    // 3. Recupera la prima recensione del ristorante
    console.log("Recupero le recensioni del ristorante:");
    const reviewIDs = await reviewManagerContract.methods.getRestaurantReviewsByAddress(ristorante).call();
    console.log(reviewIDs);
    console.log("\n");
    const reviewID = reviewIDs[0];

    console.log("Utente prova a modificare la propria recensione:");
    await reviewManagerContract.methods.modifyReview(reviewID, "Recensione aggiornata!").send({ from: utente, gas: 6000000 });
    console.log("Modifica recensione da parte dell'autore: SUCCESSO");
    console.log("\n");

    // 4. Modifica della recensione da parte di un altro utente (errore atteso)
    try {
        console.log("Tentativo di modifica da parte di un altro utente (errore atteso):");
        await reviewManagerContract.methods.modifyReview(reviewID, "Tentativo di modifica non autorizzato").send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("Errore: altroUtente sta cercando di modificare una recensione non propria!");
        //console.log(e)
        console.log("\n");
    }

    // 9. Cancellazione della recensione da parte di un altro utente (errore atteso)
    try {
        console.log("Tentativo di cancellazione da parte di un altro utente (errore atteso):");
        await reviewManagerContract.methods.deleteReview(reviewID).send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("Errore: altroUtente sta cercando di cancellare una recensione non propria");
        //console.log(e)
        console.log("\n");
    }

    // 10. Cancellazione della recensione da parte dell’autore (successo)
    try {
        console.log("Cancellazione della recensione da parte dell'autore:");
        await reviewManagerContract.methods.deleteReview(reviewID).send({ from: utente, gas: 6000000 });
        console.log("Cancellazione recensione da parte dell'autore: SUCCESSO");
        console.log("\n");  
    } catch (e) {
        console.log("Errore inatteso nella cancellazione da parte dell'autore");
    }

    console.log("Test di modifica e cancellazione recensione completato!");
    console.log("-----------------------------------------------------------\n");
}


// Funzione per testare i casi di errore
async function testOtherErrorCases() {
    const accounts = await web3.eth.getAccounts();
    const utente = accounts[2];
    const altroUtente = accounts[3];
    const ristorante = accounts[1];

    console.log("----------------INIZIO TEST CASI DI ERRORE-----------------");

    // 1. Prova a mettere like a una recensione che non esiste
    try {
        console.log("Tentativo di like su una recensione inesistente (errore atteso)");
        await reviewManagerContract.methods.likeReview(9999).send({ from: utente, gas: 6000000 });
    } catch (e) {
        console.log("ERRORE: utente sta cercando di mettere like su una recensione inesistente");
        //console.log(e)
        console.log("\n");
    }

    // 2. Prova a modificare una recensione non tua
    const reviewIDs = await reviewManagerContract.methods.getRestaurantReviewsByAddress(ristorante).call();
    const reviewID = reviewIDs[0];
    try {
        console.log("Tentativo di modifica da parte di un altro utente (errore atteso)");
        await reviewManagerContract.methods.modifyReview(reviewID, "Nuovo contenuto non autorizzato").send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("ERRORE: modifica recensione non propria");
        //console.log(e)
        console.log("\n");
    }

    // 3. Prova a cancellare una recensione non tua
    try {
        console.log("Tentativo di cancellazione da parte di un altro utente (errore atteso)");
        await reviewManagerContract.methods.deleteReview(reviewID).send({ from: altroUtente, gas: 6000000 });
    } catch (e) {
        console.log("ERRORE: cancellazione recensione non propria");
        //console.log(e)
        console.log("\n");
    }

    // 4. Prova a modificare una recensione dopo il limite temporale (simulato)
    try {
        console.log("Tentativo di modifica della recensione dopo il limite temporale (errore atteso)");
        await reviewManagerContract.methods.modifyReview(reviewID, "Cambio dopo 24h").send({ from: utente, gas: 6000000 });
    } catch (e) {
        console.log("ERRORE: modifica recensione fuori tempo massimo");
        //console.log(e)
        console.log("\n");
    }

    // 5. Prova a usare un voucher già usato
    try {
        console.log("Tentativo di pagamento con voucher già usato (errore atteso)");
        await tokenManagerContract.methods.pay(ristorante, web3.utils.toWei('1', 'ether'), 1).send({
            from: utente,
            value: web3.utils.toWei('1', 'ether'),
            gas: 6000000
        });
    } catch (e) {
        console.log("ERRORE: voucher già usato");
        //console.log(e)
        console.log("\n"); 
    }

    // 6. Pagamento con saldo insufficiente
    try {
        console.log("Tentativo di pagamento con saldo insufficiente (errore atteso)");
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: 0 });
    } catch (e) {
        console.log("ERRORE: saldo insufficiente");
        //console.log(e)
        console.log("\n");
    }
    // 7. Prova a mettere like alla recensione dopo che è stata cancellata
    try {
        console.log("Tentativo di like su una recensione cancellata (errore atteso)");
        const piva = "IT12345678901";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente, value: prezzo, gas: gasFee });
        await reviewManagerContract.methods.addReview(ristorante, "Recensione da cancellare").send({ from: utente, gas: 6000000 });
        console.log("Cancellazione della recensione da parte dell'autore:");
        await reviewManagerContract.methods.deleteReview(reviewID).send({ from: utente, gas: 6000000 });
        console.log("Cancellazione recensione da parte dell'autore: SUCCESSO");
        console.log("Tentativo di like su una recensione cancellata (errore atteso)");
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente, gas: 6000000 });
    } catch (e) {
        console.log("ERRORE: utente sta cercando di mettere like su una recensione cancellata");
        //console.log(e)
        console.log("\n");
    }

    console.log("Test dei casi di errore completato!");
    console.log("---------------------------------------------------------------\n");
}

async function main() {
    console.log(">>>INIZIO TEST DI INTERAZIONE DEI CONTRATTI<<<\n");
    setupEventListeners();
    await setup();
    await pagamentoRecensione();
    await likeRecensione();
    await testModificaDeleteRecensione(); 
    await testOtherErrorCases();
}


main().catch(console.error);