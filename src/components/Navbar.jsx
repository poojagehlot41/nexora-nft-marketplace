import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar({ walletAddress, connectWallet, disconnectWallet }) {
  const location = useLocation();

  return (
    <nav className="navbar-premium-panel">
      {/* Left Column: Brand */}
      <div className="nav-brand-section">
        <span className="nav-logo-text">Nexora NFT</span>
        <span className="nav-sub-text">Powered by EtherAuthority</span>
      </div>

      {/* Center Column: Navigation Links */}
      <div className="nav-links-center-pane">
        <Link to="/" className={location.pathname === "/" ? "link-active" : ""}>Home</Link>
        <Link to="/mint" className={location.pathname === "/mint" ? "link-active" : ""}>Mint NFT</Link>
        <Link to="/my-nfts" className={location.pathname === "/my-nfts" ? "link-active" : ""}>My NFTs</Link>
      </div>

      {/* Right Column: Wallet Actions */}
      <div className="nav-wallet-right-pane">
        {walletAddress ? (
          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
            <span className="wallet-badge-style">
              {walletAddress.substring(0, 6)}...{walletAddress.substring(38)}
            </span>
            <button className="btn-disconnect" onClick={disconnectWallet}>
              Disconnect
            </button>
          </div>
        ) : (
          <button className="btn-connect" onClick={connectWallet}>
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  );
}