const SupportReviewManager = artifacts.require("SupportReviewManager");
const TokenManager = artifacts.require("TokenManager");
const ReviewManager = artifacts.require("ReviewManager");
const VoucherManager = artifacts.require("VoucherManager");
const ActorRegistry = artifacts.require("ActorRegistry");

module.exports = async function (callback) {
  try {
    const accounts = await web3.eth.getAccounts();
    const owner = accounts[0];
    const ristorante = accounts[1];
    const utente1 = accounts[3];
    const utente2 = accounts[4];
    const utente3 = accounts[5];

    const prezzo = web3.utils.toWei("2", "ether");

    const supportReviewManagerContract = await SupportReviewManager.deployed();
    const tokenManagerContract = await TokenManager.deployed();
    const reviewManagerContract = await ReviewManager.deployed();
    const voucherManagerContract = await VoucherManager.deployed();
    const actorRegistryContract = await ActorRegistry.deployed();

    // Setup autorizzazioni (se non già fatte)
    await voucherManagerContract.setAuthorizedAddress(TokenManager.address, SupportReviewManager.address, { from: owner });
    await tokenManagerContract.setAuthorizedAddress(SupportReviewManager.address, { from: owner });
    await supportReviewManagerContract.setAuthorizedAddress(ReviewManager.address, { from: owner });

    // Registra il ristorante (se necessario)
    await actorRegistryContract.addSeller(ristorante, "IT10762910015", { from: owner }).catch(() => {
      console.log("Ristorante già registrato.");
    });

    let stats = [];

    // --- Utente1 paga ---
    let start = Date.now();
    const txPay1 = await tokenManagerContract.pay(ristorante, prezzo, 0, { from: utente1, value: prezzo });
    let end = Date.now();
    stats.push({ utente: "utente1", azione: "pay", gas: txPay1.receipt.gasUsed, tempoMs: end - start });

    // --- Utente1 scrive recensione ---
    start = Date.now();
    const txReview = await reviewManagerContract.addReview(ristorante, "Recensione da utente1", { from: utente1 });
    end = Date.now();
    stats.push({ utente: "utente1", azione: "addReview", gas: txReview.receipt.gasUsed, tempoMs: end - start });

    // Prendo reviewID dall'evento ReviewAdded emesso da SupportReviewManager
    const events = await supportReviewManagerContract.getPastEvents("ReviewAdded", {
      fromBlock: txReview.receipt.blockNumber,
      toBlock: txReview.receipt.blockNumber,
    });

    if (events.length === 0) throw new Error("Evento ReviewAdded non trovato");
    const reviewID = events[0].returnValues.reviewID;
    console.log("ReviewID:", reviewID.toString());

    // --- Utente2 paga + mette like ---
    start = Date.now();
    const txPay2 = await tokenManagerContract.pay(ristorante, prezzo, 0, { from: utente2, value: prezzo });
    const txLike2 = await reviewManagerContract.likeReview(reviewID, { from: utente2 });
    end = Date.now();
    stats.push({ utente: "utente2", azione: "pay+like", gas: txPay2.receipt.gasUsed + txLike2.receipt.gasUsed, tempoMs: end - start });

    // --- Utente3 paga + mette like ---
    start = Date.now();
    const txPay3 = await tokenManagerContract.pay(ristorante, prezzo, 0, { from: utente3, value: prezzo });
    const txLike3 = await reviewManagerContract.likeReview(reviewID, { from: utente3 });
    end = Date.now();
    stats.push({ utente: "utente3", azione: "pay+like", gas: txPay3.receipt.gasUsed + txLike3.receipt.gasUsed, tempoMs: end - start });

    // --- Utente1 modifica recensione ---
    start = Date.now();
    const txModify = await reviewManagerContract.modifyReview(reviewID, "Recensione modificata da utente1", { from: utente1 });
    end = Date.now();
    stats.push({ utente: "utente1", azione: "modifyReview", gas: txModify.receipt.gasUsed, tempoMs: end - start });

    // --- Utente1 cancella recensione ---
    start = Date.now();
    const txDelete = await reviewManagerContract.deleteReview(reviewID, { from: utente1 });
    end = Date.now();
    stats.push({ utente: "utente1", azione: "deleteReview", gas: txDelete.receipt.gasUsed, tempoMs: end - start });

    // --- Stampo report ---
    console.log("\nReport finale:");
    stats.forEach(s => {
      console.log(`- ${s.utente.padEnd(10)} | ${s.azione.padEnd(12)} | Gas usato: ${s.gas} | Tempo: ${s.tempoMs} ms`);
    });

    callback();
  } catch (error) {
    console.error("Errore nello script:", error);
    callback(error);
  }
};
