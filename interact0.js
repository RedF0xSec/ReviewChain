const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://localhost:7545');

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

async function interact0() {
    try {
        const accounts = await web3.eth.getAccounts();
        const owner = accounts[0];
        
        //Imposto gli indirizzi autorizzati
        await voucherManagerContract.methods.setAuthorizedAddress(
            TokenManagerAddress,
            SupportReviewManagerAddress
        ).send({ from: owner });

        await tokenManagerContract.methods.setAuthorizedAddress(SupportReviewManagerAddress).send({ from: owner });

        await supportReviewManagerContract.methods.setAuthorizedAddress(ReviewManagerAddress).send({ from: owner });
        
    } catch (error) {
        console.error('Errore nella funzione interact2:', error);
    }
}

interact0().catch(console.error);