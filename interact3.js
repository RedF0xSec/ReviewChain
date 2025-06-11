const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));
const SupportReviewManagerAbi = JSON.parse(fs.readFileSync('SupportReviewManagerAbi.json', 'utf8'));

const ActorRegistryAddress = '0x15F5418AfB5F55A32001Dd20641Ed20718e6b177';
const VoucherManagerAddress = '0x6B3C7Db9130eBE1aF8F80ba5A7549369193c65Bf';
const TokenManagerAddress = '0x236957dD4559E5EF2Bcd72412ebbDFADFF6e442A';
const SupportReviewManagerAddress = '0x63b35d22b3c37d89BECAB065c106c43e19b488Cd';
const ReviewManagerAddress = '0xb486Ddeb979079B55a11cFbeDB9973301D69e117';

const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);
const actorRegistryContract = new web3.eth.Contract(ActorRegistryAbi, ActorRegistryAddress);
const voucherManagerContract = new web3.eth.Contract(VoucherManagerAbi, VoucherManagerAddress);
const supportReviewManagerContract = new web3.eth.Contract(SupportReviewManagerAbi, SupportReviewManagerAddress);

async function interact3() {

    let reviewID = 0;
    let voucherID = 0;

    //Listeners to the payment event
    supportReviewManagerContract.events.ReviewLiked().on('data', (event) => {
        console.log('Review Liked Event:', event.returnValues);
    });

    //Listen to the payment event
    tokenManagerContract.events.Payment().on('data', (event) => {
        console.log('CPayment Event:', event.returnValues);
    });

    supportReviewManagerContract.events.ReviewAdded().on('data', (event) => {
        console.log('Review added Event:', event.returnValues);
        reviewID = event.returnValues.reviewID; // Salva l'ID della recensione
    });

    voucherManagerContract.events.VoucherEmitted().on('data', (event) => {
        console.log('Emitted Voucher Event:', event.returnValues);
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

        // 2. Registra il ristorante manualmente se necessario
        // Registra il ristorante
        const piva = "IT10762910015";
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);

        // Utente1 effettua pagamento e lascia una recensione
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente1, value: prezzo });
        await reviewManagerContract.methods.addReview(ristorante, "Recensione di utente1").send({ from: utente1,  gas: 6000000}); 
        console.log(reviewID);
        
        // Utente2 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente2, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2, gas: 6000000 });
        console.log("Utente2 ha messo like alla recensione di utente1");

        // Utente3 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente3, value: prezzo });
        await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente3, gas: 6000000 });
        console.log("Utente3 ha messo like alla recensione di utente1");

        // Errore: utente2 prova a mettere like di nuovo
        try {
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente2 });
        } catch (e) {
            console.log("Errore atteso: utente2 non può mettere like due volte alla stessa recensione");
        }

        // Utente4 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente4, value: prezzo });
        try{
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente4, gas: 6000000 });
            console.log("Utente4 ha messo like alla recensione di utente1");
        }
        catch (e) {
            console.log("Errore atteso: utente4 non può mettere like alla recensione di utente1");
        }

        // Utente5 effettua pagamento (riceve token)
        await tokenManagerContract.methods.pay(ristorante, prezzo, 0).send({ from: utente5, value: prezzo });
        try{
            await reviewManagerContract.methods.likeReview(reviewID).send({ from: utente5, gas: 6000000 });
            console.log("Utente5 ha messo like alla recensione di utente1");
        }
        catch (e) {
            console.log("Errore atteso: utente5 non può mettere like alla recensione di utente1");
        }

        // Vedi il numero di like alla recensione
        const likes = await reviewManagerContract.methods.getNumberofLikes(reviewID).call();
        console.log(`La recensione di utente1 ha ${likes} like`);

        const prezzomaggiorato = web3.utils.toWei('5', 'ether'); 
        await tokenManagerContract.methods.pay(ristorante, prezzomaggiorato, voucherID).send({ from: utente1, value: prezzomaggiorato, gas: 6000000  });


    } catch (error) {
        console.error('Errore:', error);
    }
}

interact3().catch(console.error);
