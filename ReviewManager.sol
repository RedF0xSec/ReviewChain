// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VoucherManager.sol";
import "./TokenManager.sol";
import "./ActorRegistry.sol";

contract ReviewManager {
    struct Review {
        address Uaddress;
        address Raddress;
        string content;
        uint256 numLikes;
        uint256 timestamp;
    }

    mapping(uint256 => Review) public reviews;
    mapping(address => uint256[]) public restaurant_reviews;
    mapping(address => mapping(address => uint256[])) public customer_for_restaurant_reviews;
    mapping(address => mapping(uint256 => bool)) public hasVoted;
    mapping(uint256 => address[]) private voters_for_review;

    uint256 public reviewCounter;
    ActorRegistry public actorRegistry;
    VoucherManager public voucherManager;
    TokenManager public tokenManager;

    event ReviewAdded(uint256 indexed reviewID, address Uaddress, address Raddress, string content);
    event ReviewModified(uint256 indexed reviewID, string newContent);
    event ReviewDeleted(uint256 indexed reviewID);
    event ReviewLiked(uint256 indexed reviewID, address Uaddress);
    event RestaurantReviews(address Raddress, uint256[] reviewIDs);

    modifier onlyAuthor(uint256 reviewID) {
        require(reviews[reviewID].Uaddress == msg.sender, "You are not the author of the review");
        _;
    }

    constructor(address _actorRegistry, address _voucherManager, address _tokenManager) {
        actorRegistry = ActorRegistry(_actorRegistry);
        voucherManager = VoucherManager(_voucherManager);
        tokenManager = TokenManager(_tokenManager);
        reviewCounter = 0;
    }

    function addReview(address Raddress, string memory content) public returns (uint256) {
        require(actorRegistry.verifySeller(Raddress), "The restaurant is not part of the affiliated system");
        require(tokenManager.getTokenCountUserPerRestaurant(msg.sender, Raddress) > 0, "You need at least one token to leave a review");

        tokenManager.decrementTokenCounter(msg.sender, Raddress);
        reviewCounter++;
        reviews[reviewCounter] = Review({Uaddress: msg.sender, Raddress: Raddress, content: content, numLikes: 0, timestamp: block.timestamp});
        restaurant_reviews[Raddress].push(reviewCounter);
        customer_for_restaurant_reviews[msg.sender][Raddress].push(reviewCounter);

        emit ReviewAdded(reviewCounter, msg.sender, Raddress, content);
        return reviewCounter;
    }

    function likeReview(uint256 reviewID) public {
        require(reviews[reviewID].Uaddress != address(0), "The review does not exist");
        require(tokenManager.getTokenCountUserPerRestaurant(msg.sender, reviews[reviewID].Raddress) > 0, "You need at least one token to like a review");
        require(!hasVoted[msg.sender][reviewID], "You have already voted on this review");

        reviews[reviewID].numLikes++;
        voters_for_review[reviewID].push(msg.sender);
        hasVoted[msg.sender][reviewID] = true;

        emit ReviewLiked(reviewID, msg.sender);
    }

    function modifyReview(uint256 reviewID, string memory newcontent) public onlyAuthor(reviewID) {
        require(reviews[reviewID].Uaddress != address(0), "The review does not exist");
        require(block.timestamp <= reviews[reviewID].timestamp + 1 days, "Maximum time to modify exceeded");

        reviews[reviewID].content = newcontent;
        address[] storage likers = voters_for_review[reviewID];
        for (uint256 i = 0; i < likers.length; i++) {
            hasVoted[likers[i]][reviewID] = false;
        }
        voters_for_review[reviewID] = new address[](0);
        reviews[reviewID].numLikes = 0;

        emit ReviewModified(reviewID, newcontent);
    }

    function deleteReview(uint256 reviewID) public onlyAuthor(reviewID) {
        require(reviews[reviewID].Uaddress != address(0), "The review does not exist");
        delete reviews[reviewID];
        address[] storage likers = voters_for_review[reviewID];
        for (uint256 i = 0; i < likers.length; i++) {
            hasVoted[likers[i]][reviewID] = false;
        }
        delete voters_for_review[reviewID];
        emit ReviewDeleted(reviewID);
    }

    function getRestaurantReviewsByAddress(address Raddress) public {
        emit RestaurantReviews(Raddress, restaurant_reviews[Raddress]);
    }

    function getNumberofLikes(uint256 reviewID) public view returns (uint256) {
        return reviews[reviewID].numLikes;
    }

    function getReviewVoters(uint256 reviewID) public view returns (address[] memory) {
        return voters_for_review[reviewID];
    }
}
