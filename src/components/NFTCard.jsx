import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { CONTRACT_ABI } from "../utils/contractABI";

function NFTCard({ nft }) {
  const navigate = useNavigate();
  const [liked, setLiked] =
    useState(false);

  const [buying, setBuying] =
    useState(false);

  const buyNFT = async (e) => {
    e.stopPropagation();

    try {
      if (
        !window.ethereum ||
        !nft.tokenId
      ) {
        return;
      }

      setBuying(true);

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

      const price =
        ethers.parseEther(
          nft.price.toString()
        );

      alert(
        "Confirm transaction in MetaMask."
      );

      const tx =
        await contract.buyNFT(
          nft.tokenId,
          {
            value: price,
          }
        );

      await tx.wait();

      alert(
        `NFT Purchased Successfully 🚀
Ownership has been transferred.`
      );

      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Purchase Failed");
    }

    setBuying(false);
  };

  return (
    <div
      className="nft-card"
      onClick={() =>
        navigate(
          `/nft-details/${
            nft.id ||
            nft.tokenId
          }`
        )
      }
    >
      <div
        className="heart"
        onClick={(e) => {
          e.stopPropagation();
          setLiked(!liked);
        }}
      >
        {liked ? "❤️" : "🤍"}
      </div>

      <img
        src={nft.image}
        alt={nft.name}
      />

      <div className="card-content">
        <h3>{nft.name}</h3>

        <p className="creator">
          Creator:
          {" "}
          {nft.creator ||
            "Unknown"}
        </p>

        <p className="creator">
          Category:
          {" "}
          {nft.category ||
            "NFT"}
        </p>

        <p className="price">
          {nft.price} ETH
        </p>

        {nft.tokenId ? (
          <button
            className="buy-btn"
            onClick={buyNFT}
            disabled={buying}
          >
            {buying
              ? "Buying..."
              : "Buy NFT 🚀"}
          </button>
        ) : (
          <button
            className="buy-btn"
          >
            Buy NFT 🚀
          </button>
        )}
      </div>
    </div>
  );
}

export default NFTCard;