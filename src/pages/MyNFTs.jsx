import React from "react";
import NFTCard from "../components/NFTCard";

export default function MyNFTs({ myNfts = [], loading = false }) {
  return (
    <div className="container" style={{ minHeight: "80vh", paddingBottom: "4rem" }}>
      
      {/* Centered Header */}
      <div style={{ textAlign: "center", marginTop: "3rem", marginBottom: "3rem" }}>
        <h1 style={{ fontSize: "2.8rem", fontWeight: "800", color: "#0f172a", marginBottom: "0.5rem" }}>
          My Collections
        </h1>
        <p style={{ color: "#64748b", fontSize: "1.1rem" }}>
          View and manage all the unique digital masterpieces you own.
        </p>
      </div>

      {/* Grid or Empty State Dynamic Check */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "2rem" }}>Loading Grid...</div>
      ) : myNfts && myNfts.length > 0 ? (
        <div className="nft-grid">
          {myNfts.map((nft, index) => (
            <NFTCard key={nft.id || index} nft={nft} />
          ))}
        </div>
      ) : (
        /* Empty State Box matching Image 2 */
        <div style={{
          maxWidth: "600px",
          margin: "2rem auto",
          padding: "4rem 2rem",
          textAlign: "center",
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: "16px",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.02)"
        }}>
          <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🎨</div>
          <h2 style={{ fontSize: "1.5rem", fontWeight: "700", color: "#0f172a", marginBottom: "0.5rem" }}>
            No NFTs Owned Yet
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.95rem", maxWidth: "400px", margin: "0 auto" }}>
            You haven't minted or purchased any NFTs yet. Head over to the Mint page to create your first digital collectible!
          </p>
        </div>
      )}

    </div>
  );
}