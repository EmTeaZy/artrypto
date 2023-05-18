// SPDX-License-Identifier: Apache-2.0

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "json-serialize/distributable/Json.sol";

contract NFTExchange {
    struct ExchangeRequest {
        address from;
        address to;
        uint256 fromTokenId;
        uint256 toTokenId;
    }

    ExchangeRequest[] public exchangeRequests;

    event ExchangeRequested(
        address indexed from,
        address indexed to,
        uint256 indexed fromTokenId,
        uint256 toTokenId
    );

    event ExchangeCompleted(
        address indexed from,
        address indexed to,
        uint256 indexed fromTokenId,
        uint256 toTokenId
    );

    function requestExchange(address _to, uint256 _fromTokenId, uint256 _toTokenId) external {
        IERC721 nftContract = IERC721(msg.sender);
        require(nftContract.ownerOf(_fromTokenId) == msg.sender, "You must own the token");

        exchangeRequests.push(ExchangeRequest(msg.sender, _to, _fromTokenId, _toTokenId));

        emit ExchangeRequested(msg.sender, _to, _fromTokenId, _toTokenId);
    }

    function completeExchange(uint256 _requestId) external {
        require(_requestId < exchangeRequests.length, "Invalid request ID");

        ExchangeRequest storage request = exchangeRequests[_requestId];
        IERC721 nftContract = IERC721(msg.sender);
        require(nftContract.ownerOf(request.toTokenId) == msg.sender, "You must own the token");

        nftContract.safeTransferFrom(request.from, request.to, request.fromTokenId);
        nftContract.safeTransferFrom(request.to, request.from, request.toTokenId);

        emit ExchangeCompleted(request.from, request.to, request.fromTokenId, request.toTokenId);

        // Remove the completed request from the array
        if (_requestId != exchangeRequests.length - 1) {
            exchangeRequests[_requestId] = exchangeRequests[exchangeRequests.length - 1];
        }
        exchangeRequests.pop();
    }

    function getExchangeRequestsForUser(address _user) external view returns (string memory) {
    string[] memory requesters = new string[](exchangeRequests.length);
    string[] memory fromTokenIds = new string[](exchangeRequests.length);
    string[] memory toTokenIds = new string[](exchangeRequests.length);

    for (uint256 i = 0; i < exchangeRequests.length; i++) {
        ExchangeRequest memory request = exchangeRequests[i];
        if (request.to == _user) {
            requesters[i] = Json.toString(Json.fromString(request.from.toString()));
            fromTokenIds[i] = Json.toString(Json.fromString(request.fromTokenId.toString()));
            toTokenIds[i] = Json.toString(Json.fromString(request.toTokenId.toString()));
        }
    }

    return string(
        Json.serialize(
            Json.fromArray([
                Json.fromString("requesters"),
                Json.fromArray(requesters),
                Json.fromString("fromTokenIds"),
                Json.fromArray(fromTokenIds),
                Json.fromString("toTokenIds"),
                Json.fromArray(toTokenIds)
            ])
        )
    );
}

}
