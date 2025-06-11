const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('ws://localhost:7545');

const TokenManagerAbi = JSON.parse(fs.readFileSync('TokenManagerAbi.json', 'utf8'));
const ReviewManagerAbi = JSON.parse(fs.readFileSync('ReviewManagerAbi.json', 'utf8'));
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const VoucherManagerAbi = JSON.parse(fs.readFileSync('VoucherManagerAbi.json', 'utf8'));
const SupportReviewManagerAbi = JSON.parse(fs.readFileSync('SupportReviewManagerAbi.json', 'utf8'));

const TokenManagerAddress = '0xbcccF4b2195CaeDFF0169568551807e747571357';
const ReviewManagerAddress = '0xEb24f142548f25155046181dbE71171d9C7d0B75';
const ActorRegistryAddress = '0x2A86F8487BfB912cD6032110BB537a7423895708';
const VoucherManagerAddress = '0x84aDbcF77b636e4ba6842094b7eE8024516824a5';
const SupportReviewManagerAddress = '0x0B980dabe9CfE75B916F9cC1FC34c9368FFc6bBe';

const tokenManagerContract = new web3.eth.Contract(TokenManagerAbi, TokenManagerAddress);
const reviewManagerContract = new web3.eth.Contract(ReviewManagerAbi, ReviewManagerAddress);
const actorRegistryContract = new web3.eth.Contract(ActorRegistryAbi, ActorRegistryAddress);
const voucherManagerContract = new web3.eth.Contract(VoucherManagerAbi, VoucherManagerAddress);
const supportReviewManagerContract = new web3.eth.Contract(SupportReviewManagerAbi, SupportReviewManagerAddress);


async function interactWithContracts() {

    const accounts = await web3.eth.getAccounts();

    const gasFee = 300000;

    const ristorante = accounts[1];
    const cliente = accounts[2];
    const amount = web3.utils.toWei("5", "ether");
    console.log(amount);

    //Listen to the payment event
    tokenManagerContract.events.Payment().on('data', (event) => {
        console.log('CPayment Event:', event.returnValues);
    });

    try {

        // Registra il ristorante
        const piva = "IT12345678901";
	
	    //ristorante con partita iva valida
        await actorRegistryContract.methods.addSeller(ristorante, piva).send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA:", piva);

	    //ristorante corretto
	    let value = await actorRegistryContract.methods.verifySeller(ristorante).call({ from: accounts[0]});
	    console.log("Ristorante verificato " + value);

	    //ristorante inesistente
	    value = await actorRegistryContract.methods.verifySeller(accounts[3]).call({ from: accounts[0]});
	    console.log("Ristorante verificato " + value);

        await tokenManagerContract.methods.pay(ristorante, amount, 0).send({ from: cliente, value: web3.utils.toWei("5", "ether"), gas: gasFee });



    } catch (error) {
        console.error('Errore:', error);
        // Stampa dettagli aggiuntivi dell'errore
        console.error('Dettagli dell\'errore:', JSON.stringify(error, null, 2));
    }

    //sezione test errori
 /*   try{
        //ristorante valido ma con partita iva non valida
        await actorRegistryContract.methods.addSeller(accounts[5], "5").send({ from: accounts[0] });
        console.log("Ristorante registrato con partita IVA non valida");
    }catch(error){
        console.log("Errore atteso: ristorante con partita IVA non valida");
        console.error('Errore:', error);
        // Stampa dettagli aggiuntivi dell'errore
        console.error('Dettagli dell\'errore:', JSON.stringify(error, null, 2));
    }
*/
}

// Esegui lo script
interactWithContracts().catch(console.error);