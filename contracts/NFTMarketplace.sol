// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract NFTMarketplace is ERC721URIStorage {

    uint256 public tokenCounter;
    uint256 public totalListings;

    struct Listing {
        uint256 tokenId;
        address seller;
        uint256 price;
        bool sold;
    }

    mapping(uint256 => Listing) public listings;

    event NFTMinted(
        address indexed owner,
        uint256 indexed tokenId,
        string tokenURI
    );

    event NFTListed(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 price
    );

    event NFTSold(
        uint256 indexed tokenId,
        address indexed buyer,
        uint256 price
    );

    event NFTListingCancelled(
        uint256 indexed tokenId,
        address indexed seller
    );

    event NFTPriceUpdated(
        uint256 indexed tokenId,
        uint256 newPrice
    );

    constructor() ERC721("NexoraNFT", "NEX") {
        tokenCounter = 1;
    }

    function totalNFTsMinted()
        public
        view
        returns(uint256)
    {
        return tokenCounter - 1;
    }

    function mintNFT(string memory tokenURI) public {

        require(
            bytes(tokenURI).length > 0,
            "Token URI cannot be empty"
        );

        uint256 currentTokenId = tokenCounter;

        _safeMint(msg.sender, currentTokenId);

        _setTokenURI(currentTokenId, tokenURI);

        emit NFTMinted(
            msg.sender,
            currentTokenId,
            tokenURI
        );

        tokenCounter++;
    }

    function listNFT(
        uint256 tokenId,
        uint256 price
    ) public {

        require(
            ownerOf(tokenId) == msg.sender,
            "You are not the owner"
        );

        require(
            price > 0,
            "Price must be greater than zero"
        );

        require(
            listings[tokenId].seller == address(0),
            "NFT already listed"
        );

        require(
            !listings[tokenId].sold,
            "NFT already sold"
        );

        listings[tokenId] = Listing(
            tokenId,
            msg.sender,
            price,
            false
        );

        totalListings++;

        emit NFTListed(
            tokenId,
            msg.sender,
            price
        );
    }

    function buyNFT(
        uint256 tokenId
    ) public payable {

        Listing storage listing = listings[tokenId];

        require(
            listing.seller != address(0),
            "NFT not listed"
        );

        require(
            !listing.sold,
            "NFT already sold"
        );

        require(
            msg.value == listing.price,
            "Send exact price"
        );

        require(
            ownerOf(tokenId) == listing.seller,
            "Seller no longer owns NFT"
        );

        require(
            msg.sender != listing.seller,
            "Seller cannot buy own NFT"
        );

        payable(listing.seller).transfer(
            listing.price
        );

        _safeTransfer(
            listing.seller,
            msg.sender,
            tokenId,
            ""
        );

        listing.sold = true;

        totalListings--;

        emit NFTSold(
            tokenId,
            msg.sender,
            listing.price
        );
    }

    function cancelListing(
        uint256 tokenId
    ) public {

        require(
            listings[tokenId].seller == msg.sender,
            "Not seller"
        );

        require(
            !listings[tokenId].sold,
            "Already sold"
        );

        totalListings--;

        delete listings[tokenId];

        emit NFTListingCancelled(
            tokenId,
            msg.sender
        );
    }

    function updateListingPrice(
        uint256 tokenId,
        uint256 newPrice
    ) public {

        require(
            listings[tokenId].seller == msg.sender,
            "Not seller"
        );

        require(
            !listings[tokenId].sold,
            "Already sold"
        );

        require(
            newPrice > 0,
            "Invalid price"
        );

        listings[tokenId].price = newPrice;

        emit NFTPriceUpdated(
            tokenId,
            newPrice
        );
    }

    function getListing(
        uint256 tokenId
    )
        public
        view
        returns (
            uint256,
            address,
            uint256,
            bool
        )
    {
        Listing memory listing =
            listings[tokenId];

        return (
            listing.tokenId,
            listing.seller,
            listing.price,
            listing.sold
        );
    }
}
