import { Link } from "react-router-dom";

function Navbar({
  walletAddress,
  connectWallet,
  disconnectWallet,
}) {
  return (
    <nav className="navbar">
      <h2>
        Nexora NFT
        <br />
        <span
          style={{
            fontSize: "14px",
            color: "#a5b4fc",
          }}
        >
          Powered by EtherAuthority
        </span>
      </h2>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/mint">
          Mint NFT
        </Link>
        <Link to="/my-nfts">
          My NFTs
        </Link>
      </div>

      {walletAddress ? (
        <div className="wallet-box">
          <button className="connect-btn">
            {walletAddress.slice(0, 6)}
            ...
            {walletAddress.slice(-4)}
          </button>

          <button
            className="disconnect-btn"
            onClick={disconnectWallet}
          >
            Disconnect
          </button>
        </div>
      ) : (
        <button
          className="connect-btn"
          onClick={connectWallet}
        >
          Connect Wallet
        </button>
      )}
    </nav>
  );
}

export default Navbar;