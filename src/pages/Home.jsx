import React, { useState, useRef } from "react";

export default function Home({ nfts }) {
  const [search, setSearch] = useState("");
  const [likedNFTs, setLikedNFTs] = useState({});
  // Track selected category filter (All, Art, Gaming, Music)
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Create a reference for the gallery section to scroll to
  const galleryRef = useRef(null);

  const toggleLike = (id) => {
    setLikedNFTs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Function to handle smooth scrolling
  const handleScrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filter logic by Search AND Category
  const filteredNfts = nfts.filter((nft) => {
    const matchesSearch = nft.name.toLowerCase().includes(search.toLowerCase());
    
    // If "All" is selected, show everything. Otherwise match category description/name keywords
    if (selectedCategory === "All") return matchesSearch;
    
    const matchesCategory = 
      nft.description?.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      nft.name?.toLowerCase().includes(selectedCategory.toLowerCase());
      
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="container">
      {/* Premium Elegant Hero Banner */}
      <section className="hero">
        <h1>Discover, Collect & Sell Extraordinary NFTs</h1>
        <p>The premier decentralized digital asset marketplace on the ultra fast SCAI Network grid layers.</p>
        {/* Working Explore Gallery Button */}
        <button className="btn" onClick={handleScrollToGallery}>
          Explore Gallery
        </button>
      </section>

      {/* Synchronized Dashboard Metrics */}
      <div className="stats-container">
        <div className="stat-box">
          <h3>98K+</h3>
          <p>Artwork Assets</p>
        </div>
        <div className="stat-box">
          <h3>12K+</h3>
          <p>Active Auctioneers</p>
        </div>
        <div className="stat-box">
          <h3>4.5K+</h3>
          <p>Digital Artists</p>
        </div>
      </div>

      {/* Control Input Layout Systems */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search items by name..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Image 2 style Category Box Filters */}
      <div className="filter-tabs">
        {["All", "Art", "Gaming", "Music"].map((category) => (
          <button
            key={category}
            className={`tab-btn ${selectedCategory === category ? "active-tab" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category === "All" ? "All Artworks" : category}
          </button>
        ))}
      </div>

      {/* Section Divider Header text block attached with scroll reference */}
      <h2 className="heading-trending" ref={galleryRef}>
        Trending Gallery
      </h2>

      {/* Main Core NFT Showcase Cards Block */}
      <div className="nft-grid">
        {filteredNfts.length > 0 ? (
          filteredNfts.map((nft) => (
            <div key={nft.id} className="nft-card">
              {/* Image Layer Module Container */}
              <div className="nft-img-container">
                <img src={nft.image} alt={nft.name} />
                <button 
                  className="like-btn" 
                  onClick={() => toggleLike(nft.id)}
                  title="Like NFT"
                >
                  {likedNFTs[nft.id] ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Structured Asset Details Information Panel */}
              <div className="nft-details">
                <h3>{nft.name}</h3>
                <p style={{ color: "#64748b", fontSize: "0.85rem", margin: "4px 0" }}>
                  Creator: {nft.creator}
                </p>
                <p style={{ color: "#475569", fontSize: "0.9rem", margin: "8px 0 12px 0" }}>
                  {nft.description}
                </p>

                {/* Action Rows Grid Integration */}
                <div className="nft-meta">
                  <span className="price-tag">Price {nft.price} SCAI</span>
                  <button className="btn-connect" style={{ padding: "0.5rem 1rem", fontSize: "0.9rem" }}>
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "3rem", color: "#64748b" }}>
            No NFTs found in this category.
          </div>
        )}
      </div>
    </div>
  );
}