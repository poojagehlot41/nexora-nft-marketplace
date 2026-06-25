import React from "react";
import { useParams, Link } from "react-router-dom";

export default function NFTDetails() {
  const { id } = useParams();

  // Temporary Dummy Single Data to prevent any crash
  const nft = {
    id: id || "1",
    name: "Abstract Cyber Artifact",
    price: "1.5",
    creator: "0x71C...897f",
    description: "Premium neon cyber art piece masterpiece built on secure infrastructure.",
    image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500"
  };

  return (
    <div className="container" style={{ minHeight: "80vh", padding: "4rem 2rem" }}>
      <Link to="/" style={{ color: "#4f46e5", textDecoration: "none", fontWeight: "600", display: "inline-block", marginBottom: "2rem" }}>
        ← Back to Gallery
      </Link>
      
      <div style={{ display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ flex: "1", minWidth: "300px" }}>
          <img 
            src={nft.image} 
            alt={nft.name} 
            style={{ width: "100%", borderRadius: "16px", boxShadow: "0 10px 25px rgba(0,0,0,0.05)" }} 
          />
        </div>
        
        <div style={{ flex: "1", minWidth: "300px" }}>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", marginBottom: "1rem" }}>{nft.name}</h1>
          <p style={{ color: "#64748b", fontFamily: "monospace", marginBottom: "1.5rem" }}>Creator: {nft.creator}</p>
          <p style={{ color: "#334155", fontSize: "1.1rem", lineHeight: "1.6", marginBottom: "2rem" }}>{nft.description}</p>
          
          <div style={{ background: "#f8fafc", padding: "1.5rem", borderRadius: "12px", marginBottom: "2rem" }}>
            <span style={{ color: "#64748b", fontSize: "0.9rem", display: "block", marginBottom: "0.25rem" }}>Current Price</span>
            <span style={{ fontSize: "1.8rem", fontWeight: "700", color: "#0f172a" }}>{nft.price} SCAI</span>
          </div>
          
          <button className="btn" style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}>
            Buy NFT Asset
          </button>
        </div>
      </div>
    </div>
  );
}