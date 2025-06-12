const ActorRegistry = artifacts.require("ActorRegistry");
const TokenManager = artifacts.require("TokenManager");
const ReviewManager = artifacts.require("ReviewManager");
const CertifiedAuthority = artifacts.require("CertifiedAuthority");
const VoucherManager = artifacts.require("VoucherManager");
const SupportReviewManager = artifacts.require("SupportReviewManager");


module.exports = async function (deployer) {

    await deployer.deploy(CertifiedAuthority);
    const certifiedAuthority = await CertifiedAuthority.deployed();

    await deployer.deploy(ActorRegistry, certifiedAuthority.address);
    const actorRegistry = await ActorRegistry.deployed();

    await deployer.deploy(VoucherManager, actorRegistry.address);
    const voucherManager = await VoucherManager.deployed();

    await deployer.deploy(TokenManager, actorRegistry.address, voucherManager.address);
    const tokenManager = await TokenManager.deployed();

    await deployer.deploy(SupportReviewManager, actorRegistry.address, voucherManager.address, tokenManager.address);
    const supportReviewManager = await SupportReviewManager.deployed();

    await deployer.deploy(ReviewManager, supportReviewManager.address);
    const reviewManager = await ReviewManager.deployed();

};
