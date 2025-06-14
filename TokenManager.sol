// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ActorRegistry.sol";
import "./VoucherManager.sol";

contract TokenManager {
    string public constant name = "BITE";
    string public constant symbol = "BTE";
    uint8 public constant decimals = 18;

    ActorRegistry public immutable actorRegistry;
    VoucherManager public immutable voucherManager;
    address private supportReviewManager;
    address private immutable owner;
    mapping(address => mapping(address => uint256)) private tokens;


    event Payment(address indexed from, address indexed to, uint256 amount, uint256 voucherID);
    event TokenIncremented(address indexed user, address indexed restaurant, uint256 newCount);
    event TokenDecremented(address indexed user, address indexed restaurant, uint256 newCount);
    event VoucherUsed(uint256 indexed voucherID, address indexed user, address indexed restaurant);

    constructor(address _actorRegistry, address _voucherManager) {
        actorRegistry = ActorRegistry(_actorRegistry);
        voucherManager = VoucherManager(_voucherManager);
        owner = msg.sender;
    }

    function setAuthorizedAddress(address _supportReviewManager) external {
        require(msg.sender == owner, "ERR04");

        supportReviewManager = _supportReviewManager;
    }

    function incrementTokenCounter(address Uaddress, address Raddress) private {
        tokens[Uaddress][Raddress]++;
        emit TokenIncremented(Uaddress, Raddress, tokens[Uaddress][Raddress]);
    }

    function decrementTokenCounter(address Uaddress, address Raddress) external {
        require(msg.sender == supportReviewManager, "ERR04");
        require(getTokenCountUserPerRestaurant(Uaddress, Raddress) > 0, "ERR05");

        tokens[Uaddress][Raddress]--;
        emit TokenDecremented(Uaddress, Raddress, tokens[Uaddress][Raddress]);
    }

    function getTokenCountUserPerRestaurant(address Uaddress, address Raddress) public view returns (uint256) {
        return tokens[Uaddress][Raddress];
    }

    function pay(address receiver, uint256 amount, uint256 voucherID) external payable {
        require(actorRegistry.verifySeller(receiver), "ERR03");
        uint256 amountToPay = voucherManager.applyVoucher(voucherID, msg.sender, receiver, amount);
        require(msg.value >= amountToPay, "ERR06");

        // Aggiorno prima lo stato interno
        incrementTokenCounter(msg.sender, receiver);
        voucherManager.invalidateVoucher(voucherID);

        // Emissione eventi dopo lo stato
        emit VoucherUsed(voucherID, msg.sender, receiver);
        emit Payment(msg.sender, receiver, amountToPay, voucherID);

        // Solo alla fine, trasferisco gli Ether
        payable(receiver).transfer(amountToPay);
        payable(msg.sender).transfer(msg.value - amountToPay);
    }
}