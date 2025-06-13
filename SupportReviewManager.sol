// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VoucherManager.sol";
import "./TokenManager.sol";
import "./ActorRegistry.sol";

contract SupportReviewManager {
    address private owner;
    address private reviewManager;
    ActorRegistry public actorRegistry;
    VoucherManager public voucherManager;
    TokenManager public tokenManager;

    event ReviewAdded(uint256 indexed reviewID, address Uaddress, address Raddress, string content);
    event ReviewModified(uint256 indexed reviewID, string newContent);
    event ReviewDeleted(uint256 indexed reviewID);
    event ReviewLiked(uint256 indexed reviewID, address Uaddress);

    constructor(address _actorRegistry, address _voucherManager, address _tokenManager) {
        actorRegistry = ActorRegistry(_actorRegistry);
        voucherManager = VoucherManager(_voucherManager);
        tokenManager = TokenManager(_tokenManager);
        owner = msg.sender;
    }

    function setAuthorizedAddress(address _reviewManager) external {
        require(msg.sender == owner, "ERR04");
        
        reviewManager = _reviewManager;
    }

    modifier onlyReviewManager {
        require(msg.sender == reviewManager, "ERR14");
        _;
    }

    function add(address Uaddress, address Raddress) external onlyReviewManager{
        require(actorRegistry.verifySeller(Raddress), "ERR03");
        
        tokenManager.decrementTokenCounter(Uaddress, Raddress);
    }

    function addEvent(uint256 reviewID, address Uaddress, address Raddress, string memory content) external onlyReviewManager {
        emit ReviewAdded(reviewID, Uaddress, Raddress, content);
    }

    function like(address Uaddress, address Raddress, uint256 reviewID, uint256 numLikes, address owner) external onlyReviewManager{
        require(tokenManager.getTokenCountUserPerRestaurant(Uaddress, Raddress) > 0, "ERR05");
        
        emit ReviewLiked(reviewID, Uaddress);
        emitV(owner, Raddress, numLikes);
    }

    function emitV(address Uaddress, address Raddress, uint256 numLikes) private{
        numLikes++;
        if(numLikes == 3)
            voucherManager.emitVoucher(Uaddress, Raddress, 2000000000000000000, "discount");
    }

    function modifyEvent(uint256 reviewID, string memory content) external onlyReviewManager{
        emit ReviewModified(reviewID, content);
    }

    function deleteEvent(uint256 reviewID) external onlyReviewManager {
        emit ReviewDeleted(reviewID);
    }

}