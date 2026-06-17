import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MintNFT from "./pages/MintNFT";
import MyNFTs from "./pages/MyNFTs";
import NFTDetails from "./pages/NFTDetails";

function App() {
  const [walletAddress, setWalletAddress] =
    useState("");

  useEffect(() => {
    if (
      localStorage.getItem(
        "walletConnected"
      ) === "true"
    ) {
      checkWalletConnection();
    }
  }, []);

  const checkWalletConnection = async () => {
    try {
      if (!window.ethereum) return;

      const accounts =
        await window.ethereum.request({
          method: "eth_accounts",
        });

      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("Install MetaMask");
        return;
      }

      const accounts =
        await window.ethereum.request({
          method: "eth_requestAccounts",
        });

      setWalletAddress(accounts[0]);

      localStorage.setItem(
        "walletConnected",
        "true"
      );
    } catch (error) {
      console.log(error);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");

    localStorage.removeItem(
      "walletConnected"
    );
  };

  return (
    <>
      <Navbar
        walletAddress={walletAddress}
        connectWallet={connectWallet}
        disconnectWallet={
          disconnectWallet
        }
      />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/mint"
          element={<MintNFT />}
        />

        <Route
          path="/my-nfts"
          element={<MyNFTs />}
        />

        <Route
          path="/nft-details"
          element={<NFTDetails />}
        />
      </Routes>
    </>
  );
}

export default App;