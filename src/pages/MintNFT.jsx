import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { CONTRACT_ABI } from "../utils/contractABI";

function MintNFT() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const mintNFT = async (e) => {
    e.preventDefault();

    if (!window.ethereum) {
      alert("Please install MetaMask.");
      return;
    }

    if (
      !name ||
      !image ||
      !price ||
      !description
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const network =
        await provider.getNetwork();

     const chainId =
    Number(network.chainId);

    if (
      chainId !== 11155111 &&
      chainId !== 34
     ){
   alert(
      "Please switch MetaMask to Sepolia or SCAI Mainnet."
    );

    setLoading(false);
    return;
    }

      const signer =
        await provider.getSigner();

      const contract =
        new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

     const metadata = {
        name,
        image,
        description,
        price:
      String(price),
     };

      const tokenURI =
        JSON.stringify(metadata);

      alert(
        "Confirm transaction in MetaMask."
      );

      const tx =
        await contract.mintNFT(
          tokenURI
        );

      await tx.wait();

      alert(
        `NFT Minted Successfully 🚀
         Token has been added to blockchain.`
      );

      setName("");
      setImage("");
      setPrice("");
      setDescription("");
    } catch (error) {
      console.log(error);
      alert( "Mint failed. Please check wallet connection and network.");
    }

    setLoading(false);
  };

  return (
    <div className="mint-container">
      <h1>Mint New NFT</h1>

      <form
        className="mint-form"
        onSubmit={mintNFT}
      >
        <input
          type="text"
          placeholder="NFT Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <input
          type="text"
          placeholder="NFT Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

        <input
          type="number"
          placeholder="Price in SCAI"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <textarea
          rows="5"
          placeholder="NFT Description"
          value={description}
          onChange={(e) =>
            setDescription(
              e.target.value
            )
          }
        ></textarea>

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Minting NFT..."
            : "Mint NFT 🚀"}
        </button>
      </form>
    </div>
  );
}

export default MintNFT;