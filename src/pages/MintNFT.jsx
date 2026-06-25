import React, { useState } from "react";

export default function MintNFT(props) {
  const [form, setForm] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.name || !form.image || !form.price || !form.description) {
      alert("Please fill all fields before minting!");
      return;
    }

    try {
      const mintFunction = props.mintNFT || props.createNFT || props.mintToken;

      if (typeof mintFunction === "function") {
        await mintFunction(form.name, form.image, form.price, form.description);
      } else {
        console.log("Form Data:", form);
        alert("Data logged to console!");
      }
      
      setForm({ name: "", image: "", price: "", description: "" });
    } catch (error) {
      console.error("Error while minting:", error);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "650px", margin: "4rem auto", padding: "0 1rem" }}>
      
      <h1 style={{ textBreak: "word", textAlign: "center", fontSize: "2.5rem", fontWeight: "800", color: "#0f172a", marginBottom: "2.5rem" }}>
        Mint New NFT
      </h1>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        
        <input
          type="text"
          placeholder="NFT Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="search-input"
          style={{ width: "100%", padding: "1rem" }}
        />

        <input
          type="text"
          placeholder="NFT Image URL"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="search-input"
          style={{ width: "100%", padding: "1rem" }}
        />

        <input
          type="text"
          placeholder="Price in SCAI"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          className="search-input"
          style={{ width: "100%", padding: "1rem" }}
        />

        <textarea
          placeholder="NFT Description"
          rows="5"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="search-input"
          style={{ width: "100%", padding: "1rem", fontFamily: "inherit", resize: "vertical" }}
        />

        <button
          type="submit"
          className="btn"
          style={{ width: "100%", padding: "1rem", fontSize: "1.1rem" }}
        >
          Mint NFT 🚀
        </button>
      </form>
    </div>
  );
}