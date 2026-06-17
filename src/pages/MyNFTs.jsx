import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { CONTRACT_ABI } from "../utils/contractABI";

function MyNFTs() {
  const [myNFTs, setMyNFTs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNFTs();
  }, []);

  const fetchNFTs = async () => {
    try {
      if (!window.ethereum) {
        setLoading(false);
        return;
      }

      const provider =
        new ethers.BrowserProvider(
          window.ethereum
        );

      const signer =
        await provider.getSigner();

      const userAddress =
        await signer.getAddress();

      const contract =
        new ethers.Contract(
          CONTRACT_ADDRESS,
          CONTRACT_ABI,
          signer
        );

      const total =
        await contract.totalNFTsMinted();

      const nftArray = [];

      for (
        let i = 1;
        i <= Number(total);
        i++
      ) {
        try {
          const owner =
            await contract.ownerOf(i);

          if (
            owner.toLowerCase() ===
            userAddress.toLowerCase()
          ) {
            const tokenURI =
              await contract.tokenURI(i);

            const metadata =
              JSON.parse(tokenURI);

            nftArray.push({
              tokenId: i,
              listed: false,
              ...metadata,
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

      setMyNFTs(nftArray);
    } catch (error) {
      console.log(error);
    }

    setLoading(false);
  };

  const listNFTForSale =
    async (tokenId) => {
      try {
        const price = prompt(
          "Enter Price in ETH"
        );

        if (!price) return;

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

        const priceInWei =
          ethers.parseEther(price);

        const tx =
          await contract.listNFT(
            tokenId,
            priceInWei
          );

        alert(
          "Confirm transaction in MetaMask"
        );

        await tx.wait();

        alert(
          `NFT Listed Successfully 🚀
NFT is now available in marketplace.`
        );

        setMyNFTs((prev) =>
          prev.map((nft) =>
            nft.tokenId === tokenId
              ? {
                  ...nft,
                  listed: true,
                  listedPrice: price,
                }
              : nft
          )
        );
      } catch (error) {
        console.log(error);
        alert(
          "Listing Failed"
        );
      }
    };

  return (
    <div className="mynfts-container">
      <h1>My NFT Collection</h1>

      {loading ? (
        <div className="loader"></div>
      ) : myNFTs.length === 0 ? (
        <div className="empty-box">
          <h2>No NFTs Found</h2>
          <p>
            Mint your first NFT 🚀
          </p>
        </div>
      ) : (
        <div className="nfts-grid">
          {myNFTs.map((nft) => (
            <div
              key={nft.tokenId}
              className="owned-card"
            >
              <img
                src={nft.image}
                alt={nft.name}
              />

              <h3>{nft.name}</h3>

              <p>
                Price:
                {" "}
                {nft.price} ETH
              </p>

              <p>
                {nft.description}
              </p>

              <p>
                Token #
                {nft.tokenId}
              </p>

              {nft.listed ? (
                <button>
                  Listed For Sale
                  {" "}
                  (
                  {nft.listedPrice}
                  {" "}
                  ETH)
                </button>
              ) : (
                <button
                  onClick={() =>
                    listNFTForSale(
                      nft.tokenId
                    )
                  }
                >
                  List For Sale
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyNFTs;