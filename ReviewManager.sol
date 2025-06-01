// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./VoucherManager.sol";
import "./TokenManager.sol";
import "./ActorRegistry.sol";

contract ReviewManager {
    struct Review {
        string Uaddress; 
        string Raddress;
        string content;
        bool verified;
    }

    mapping(uint256 => Review) public reviews;
    mapping(address => uint256[]) public restaurant_reviews; // Raddress => List<uint256>
    mapping(address => mapping(address => uint256[])) public customer_for_restaurant_reviews; // Uaddress => Raddress => List<uint256>
    mapping(address => mapping(uint256 => bool)) public hasVoted; // Uaddress => reviewID => bool
    mapping(uint256 => address[]) private voters_for_review; // reviewID => List<Uaddress>

    uint256 public reviewCounter;

    event ReviewAdded(uint256 indexed reviewID, address Uaddress, address Raddress, string content);
    event ReviewModified(uint256 indexed reviewID, string newContent);
    event ReviewDeleted(uint256 indexed reviewID);
    event ReviewLiked(uint256 indexed reviewID, address Uaddress);
    event RestaurantReviews(address Raddress, uint256[] reviewIDs);

    function addReview(address Uaddress, address Raddress, string memory content) public returns (uint256) {
        
    }

    function likeReview(uint256 reviewID, address Uaddress) public {

    }

    function modifyReview(uint256 reviewID, string memory newcontent) public {

    }

    function deleteReview(uint256 reviewID) public {

    }

    function getRestaurantByDID(string memory Raddress) public {

    }

    function getNumberofLikes(uint256 reviewID) private view returns (uint256) {

    }

    function getReviewVoters(uint256 reviewID) private view returns (address[] memory) {
       
    }
}
