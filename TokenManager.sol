// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ActorRegistry.sol";
import "./VoucherManager.sol";

contract TokenManager {
    string public name = "BITE";
    string public symbol = "BTE";
    uint8 public decimals = 18;

    mapping(address => mapping(address => uint256)) private tokens;

    ActorRegistry public actorRegistry;
    VoucherManager public voucherManager;

    constructor(address _actorRegistry, address _voucherManager) {
        actorRegistry = ActorRegistry(_actorRegistry);
        voucherManager = VoucherManager(_voucherManager);
    }

    modifier onlySender(address sender) {
        require(msg.sender == sender, "Only the sender can perform this operation");
        _;
    }

    event Payment(address indexed from, address indexed to, uint256 amount, uint256 voucherID);
    event TokenIncremented(address indexed user, address indexed restaurant, uint256 newCount);
    event TokenDecremented(address indexed user, address indexed restaurant, uint256 newCount);
    event VoucherUsed(uint256 indexed voucherID, address indexed user, address indexed restaurant);

    function incrementTokenCounter(address Uaddress, address Raddress) private {
        tokens[Uaddress][Raddress]++;
        emit TokenIncremented(Uaddress, Raddress, tokens[Uaddress][Raddress]);
    }

    function decrementTokenCounter(address Uaddress, address Raddress) external {
        require(getTokenCountUserPerRestaurant(Uaddress, Raddress) > 0, "Insufficient tokens");
        tokens[Uaddress][Raddress]--;
        emit TokenDecremented(Uaddress, Raddress, tokens[Uaddress][Raddress]);
    }

    function getTokenCountUserPerRestaurant(address Uaddress, address Raddress) public view returns (uint256) {
        return tokens[Uaddress][Raddress];
    }

    function pay(address receiver, uint256 amount, uint256 voucherID) external payable onlySender(msg.sender) {
        require(actorRegistry.verifySeller(receiver), "The restaurant is not part of the affiliated system");

        uint256 amountToPay = amount;

        if (voucherID != 0) {
            (address owner, address restaurant, uint256 discountAmount) = voucherManager.getVoucher(voucherID);
            require(owner == msg.sender, "You are not the owner of the NFT");
            require(restaurant == receiver, "The restaurant associated with the NFT is not the same as the one you are paying");
            require(actorRegistry.verifySeller(restaurant), "The restaurant referenced by the NFT is not part of the affiliated system");
            require(discountAmount <= amount, "You cannot use the voucher");
            //qui andrebbe un controllo su se è già stato usato

            amountToPay = amount - discountAmount;
            emit VoucherUsed(voucherID, msg.sender, receiver);
        }

        require(msg.value >= amountToPay, "Insufficient balance for payment");
        payable(receiver).transfer(amountToPay);
        incrementTokenCounter(msg.sender, receiver);
        emit Payment(msg.sender, receiver, amountToPay, voucherID);
    }
}
