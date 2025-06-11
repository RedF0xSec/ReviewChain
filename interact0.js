const { Web3 } = require('web3');
const fs = require('fs');

const web3 = new Web3('http://localhost:7545');

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