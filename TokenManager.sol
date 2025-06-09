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
    address private reviewManager;

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

    function setAuthorizedAddress(address _reviewManager) public {
        reviewManager = _reviewManager;
    }

    function incrementTokenCounter(address Uaddress, address Raddress) private {
        tokens[Uaddress][Raddress]++;
        emit TokenIncremented(Uaddress, Raddress, tokens[Uaddress][Raddress]);
    }

    function decrementTokenCounter(address Uaddress, address Raddress) external {   //require anche qui, solo ReviewManager
        require(msg.sender == reviewManager, "not authorized");
        require(getTokenCountUserPerRestaurant(Uaddress, Raddress) > 0, "Insufficient tokens");
        tokens[Uaddress][Raddress]--;
        emit TokenDecremented(Uaddress, Raddress, tokens[Uaddress][Raddress]);
    }

    function getTokenCountUserPerRestaurant(address Uaddress, address Raddress) public view returns (uint256) {
        return tokens[Uaddress][Raddress];
    }

    function pay(address receiver, uint256 amount, uint256 voucherID) external payable onlySender(msg.sender) {
        require(actorRegistry.verifySeller(receiver), "The restaurant is not part of the affiliated system");
        uint256 amountToPay = voucherManager.applyVoucher(voucherID, msg.sender, receiver, amount);
        require(msg.value >= amountToPay, "Insufficient balance for payment");   
        payable(receiver).transfer(amountToPay);   
        incrementTokenCounter(msg.sender, receiver);
        voucherManager.invalidateVoucher(voucherID);
        emit VoucherUsed(voucherID, msg.sender, receiver);
        emit Payment(msg.sender, receiver, amountToPay, voucherID);
    }
}