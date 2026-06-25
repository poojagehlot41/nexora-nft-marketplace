import { useState, useEffect } from "react";
import { ethers } from "ethers";
import NFTCard from "../components/NFTCard";
import nfts from "../data/nfts";
import { CONTRACT_ADDRESS } from "../utils/constants";
import { CONTRACT_ABI } from "../utils/contractABI";

function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [listedNFTs, setListedNFTs] =
    useState([]);

  useEffect(() => {
    fetchListedNFTs();
  }, []);

  const fetchListedNFTs = async () => {
    try {
      if (!window.ethereum) return;

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

      const total =
        await contract.totalNFTsMinted();

      const data = [];

      for (
        let i = 1;
        i <= Number(total);
        i++
      ) {
        try {
          const listing =
            await contract.getListing(i);

          const seller =
            listing[1];

          const price =
            listing[2];

          const sold =
            listing[3];

          if (
            seller !==
              "0x0000000000000000000000000000000000000000" &&
            !sold
          ) {
            const tokenURI =
              await contract.tokenURI(i);

            let metadata;

            try {
            metadata =
            JSON.parse(tokenURI);
          } catch {
            metadata = {
            name: `NFT #${i}`,
            description:
           "Blockchain NFT",
           image:
           "https://via.placeholder.com/300",
           price: "0",
          };
         }

            data.push({
              tokenId: i,
              ...metadata,
              price:
                ethers.formatEther(
                  price
                ),
            });
          }
        } catch (error) {
          console.log(error);
        }
      }

      setListedNFTs(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredNFTs = nfts.filter(
    (nft) => {
      const searchMatch = nft.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

      const categoryMatch =
        category === "All" ||
        nft.category === category;

      return (
        searchMatch &&
        categoryMatch
      );
    }
  );

  const scrollToNFTs = () => {
    document
      .getElementById(
        "trending"
      )
      ?.scrollIntoView({
        behavior: "smooth",
      });
  };

  return (
    <>
      <div className="hero">
        <h1>
          Discover, Collect &
          Sell Extraordinary NFTs
        </h1>

        <p>
          The next generation NFT
          marketplace built with
          Solidity, React and Web3.
        </p>

        <button
          className="explore-btn"
          onClick={scrollToNFTs}
        >
          Explore NFTs
        </button>
      </div>

      {listedNFTs.length > 0 && (
        <>
          <h2 className="section-title">
            Live Marketplace
          </h2>

          <div className="cards-section">
            {listedNFTs.map(
              (nft) => (
                <NFTCard
                  key={
                    nft.tokenId
                  }
                  nft={nft}
                />
              )
            )}
          </div>
        </>
      )}

      <div className="stats-section">
        <div className="stat-box">
          <h2>50K+</h2>
          <p>NFTs Listed</p>
        </div>

        <div className="stat-box">
          <h2>20K+</h2>
          <p>Artists</p>
        </div>

        <div className="stat-box">
          <h2>10K+</h2>
          <p>Sales</p>
        </div>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search NFT..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
        />
      </div>

      <div className="category-section">
        <button
          onClick={() =>
            setCategory("All")
          }
        >
          All
        </button>

        <button
          onClick={() =>
            setCategory("Art")
          }
        >
          Art
        </button>

        <button
          onClick={() =>
            setCategory(
              "Gaming"
            )
          }
        >
          Gaming
        </button>

        <button
          onClick={() =>
            setCategory(
              "Music"
            )
          }
        >
          Music
        </button>
      </div>

      <h2
        id="trending"
        className="section-title"
      >
        Trending NFTs
      </h2>

      <div className="cards-section">
        {filteredNFTs.map(
          (nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
            />
          )
        )}
      </div>
    </>
  );
}

export default Home;