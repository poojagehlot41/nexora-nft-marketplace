// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/v4.9.0/contracts/access/Ownable.sol";

contract NexoraNFTMarketplace is ERC721URIStorage, Ownable {
    uint256 private _tokenIds;

    struct MarketItem {
        uint256 itemId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool listed;
    }

    mapping(uint256 => MarketItem) private marketItems;
    uint256 public constant MINT_FEE = 0.01 ether;

    // Explicitly initializing constructor safely
    constructor() ERC721("Nexora NFT", "NEX") {
        // Owner is auto-set to msg.sender in OpenZeppelin v4.9.0
    }

    function mintNFT(string memory tokenURI)
        public
        payable
        returns (uint256)
    {
        require(msg.value >= MINT_FEE, "Minimum mint fee (0.01 ether) required");
        _tokenIds += 1; 
        uint256 newItemId = _tokenIds;
        
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        marketItems[newItemId] = MarketItem(
            newItemId,
            payable(address(0)),
            payable(msg.sender),
            0,
            false
        );

        return newItemId;
    }

    function getMarketItem(uint256 tokenId) public view returns (MarketItem memory) {
        return marketItems[tokenId];
    }
}