import { useParams } from "react-router-dom";
import nfts from "../data/nfts";

function NFTDetails() {
  const { id } = useParams();

  const nft = nfts.find(
    (item) => item.id === Number(id)
  );

  if (!nft) {
    return <h1>NFT Not Found</h1>;
  }

  return (
    <div className="details-container">
      <img
        className="details-image"
        src={nft.image}
        alt={nft.name}
      />

      <div className="details-content">
        <h1>{nft.name}</h1>

        <p>{nft.description}</p>

        <h3>Creator: {nft.creator}</h3>

        <h3>Category: {nft.category}</h3>

        <h2>Price: {nft.price}</h2>

        <button className="buy-btn">
          Buy NFT
        </button>
      </div>
    </div>
  );
}

export default NFTDetails;