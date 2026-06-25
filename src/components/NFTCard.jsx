import React from "react";

export default function NFTCard({ nft }) {
  // Safe check taaki agar koi data galat aaye toh card crash na ho
  if (!nft) return null;

  return (
    <div className="nft-card">
      <div className="nft-img-container">
        <img 
          src={nft.image || "https://via.placeholder.com/400"} 
          alt={nft.name || "NFT Image"} 
        />
      </div>
      
      <div className="nft-details">
        <h3 className="nft-title">{nft.name || "Unnamed NFT"}</h3>
        <p style={{ fontSize: "0.85rem", color: "#64748b", margin: "2px 0" }}>
          Creator: <span style={{ fontFamily: "monospace" }}>
            {nft.creator ? `${nft.creator.substring(0, 6)}...${nft.creator.substring(38)}` : "0x00...000"}
          </span>
        </p>
        <p className="nft-description">
          {nft.description || "No description provided for this unique artifact."}
        </p>
        
        <div className="nft-meta">
          <div className="price-box">
            <span className="price-label">Price</span>
            <span className="price-tag">{nft.price || "0"} SCAI</span>
          </div>
          <button className="btn" style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}>
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}