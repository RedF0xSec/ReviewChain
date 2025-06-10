const { Web3 } = require('web3');
const fs = require('fs');

// Connect to Ganache
const web3 = new Web3('ws://localhost:7545');

// Load ABI
const ActorRegistryAbi = JSON.parse(fs.readFileSync('ActorRegistryAbi.json', 'utf8'));
const CertifiedAuthorityAbi = JSON.parse(fs.readFileSync('CertifiedAuthorityAbi.json', 'utf8'));


// Set contract addresses
const CertifiedAuthorityAddress = '0x4832e860edb233d9185dBCDABA93A180C2fa0Ef8';
const ActorRegistryAddress = '0x9a2020D9dde843B74a57c34c792280145C022d84';



const actorRegistryContract = new web3.eth.Contract(ActorRegistryAbi, ActorRegistryAddress);
const certifiedAuthorityContract = new web3.eth.Contract(CertifiedAuthorityAbi, CertifiedAuthorityAddress);


async function interactWithContracts() {

    const accounts = await web3.eth.getAccounts();

    try {
        
        const ristorante = accounts[1];

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