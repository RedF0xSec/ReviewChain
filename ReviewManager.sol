// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./SupportReviewManager.sol";

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
    //mapping(address => mapping(address => uint256[])) public customer_for_restaurant_reviews;
    mapping(address => mapping(uint256 => bool)) public hasVoted;

    uint256 public reviewCounter;

    SupportReviewManager public supportReviewManager;

    modifier onlyAuthor(uint256 reviewID) {
        require(reviews[reviewID].Uaddress == msg.sender, "E500");
        _;
    }

    //funzione per controllare se una recensione esiste
    function checkIfExist(uint256 reviewID) private view {
        require(reviews[reviewID].Uaddress != address(0), "E501");
    }

    constructor(address _supportReviewManager) {
        supportReviewManager = SupportReviewManager(_supportReviewManager);
        reviewCounter = 0;
    }

    function addReview(address Raddress, string memory content) public returns (uint256) {
        supportReviewManager.add(msg.sender, Raddress);
        reviewCounter++;
        reviews[reviewCounter] = Review(msg.sender, Raddress, content, 0, block.timestamp);
        restaurant_reviews[Raddress].push(reviewCounter);
        //customer_for_restaurant_reviews[msg.sender][Raddress].push(reviewCounter);

        supportReviewManager.addEvent(reviewCounter, msg.sender, Raddress, content);
        return reviewCounter;
    }

    function likeReview(uint256 reviewID) public {
        checkIfExist(reviewID);
        require(!hasVoted[msg.sender][reviewID], "E502");
        supportReviewManager.like(msg.sender, reviews[reviewID].Raddress, reviewID, reviews[reviewID].numLikes, reviews[reviewID].Uaddress);

        reviews[reviewID].numLikes++;
        hasVoted[msg.sender][reviewID] = true;
        
    }

    function modifyReview(uint256 reviewID, string memory newcontent) public onlyAuthor(reviewID) {
        checkIfExist(reviewID);
        require(block.timestamp <= reviews[reviewID].timestamp + 1 days, "E503");

        reviews[reviewID].content = newcontent;
        reviews[reviewID].numLikes = 0;

        supportReviewManager.modifyEvent(reviewID, newcontent);
    }

    function deleteReview(uint256 reviewID) public onlyAuthor(reviewID) {
        delete reviews[reviewID];
        supportReviewManager.deleteEvent(reviewID);
    }

    function getRestaurantReviewsByAddress(address Raddress) external view returns (uint256[] memory) {
        return restaurant_reviews[Raddress];
    }

    function getNumberofLikes(uint256 reviewID) public view returns (uint256) {
        return reviews[reviewID].numLikes;
    }

}