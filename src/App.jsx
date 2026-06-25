import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MintNFT from "./pages/MintNFT";
import MyNFTs from "./pages/MyNFTs";
import "./index.css";

export default function App() {
  const [walletAddress, setWalletAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [myNfts, setMyNfts] = useState([]);

  const [nfts, setNfts] = useState([
    { id: 1, name: "Abstract Cyber #01", price: "1.5", creator: "0x71C...897f", description: "Premium neon cyber art piece.", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500" },
    { id: 2, name: "Futuristic Mecha", price: "2.3", creator: "0x32A...112b", description: "Rare mecha collection artifact.", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=500" },
    { id: 3, name: "Ethereal Wave", price: "0.9", creator: "0x99B...445c", description: "Fluid modern digital masterpiece.", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=500" }
  ]);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
        setWalletAddress(accounts[0]);
      } catch (err) {
        console.error(err);
      }
    } else {
      alert("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
  };

  const mintNFT = async (name, image, price, description) => {
    setLoading(true);
    const newNft = {
      id: nfts.length + 1,
      name,
      image,
      price,
      creator: walletAddress || "0x0000...0000",
      description
    };
    setNfts([newNft, ...nfts]);
    setMyNfts([newNft, ...myNfts]);
    setLoading(false);
    alert("NFT Minted Successfully!");
  };

  return (
    <div className="page-wrapper">
      {/* Top Navbar Section */}
      <Navbar 
        walletAddress={walletAddress} 
        connectWallet={connectWallet} 
        disconnectWallet={disconnectWallet} 
      />
      
      {/* Main Content Sections */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home nfts={nfts} loading={loading} />} />
          <Route path="/mint" element={<MintNFT mintNFT={mintNFT} loading={loading} />} />
          <Route path="/my-nfts" element={<MyNFTs myNfts={myNfts} loading={loading} />} />
        </Routes>
      </main>

      {/* Exact Match Image 2: Centered 3-Line Dark Panel Footer */}
      <footer className="footer-dark-panel-style">
        <div className="footer-inner-content">
          <strong>Nexora NFT</strong><br />
          <span>Powered by EtherAuthority</span><br />
          <span>© 2026 Nexora NFT Marketplace | Built by Pooja</span>
        </div>
      </footer>
    </div>
  );
}