import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Search screen:
 * - user enters an email
 * - we navigate to results screen and pass the email
 */
export default function SearchScreen() {
  const [email, setEmail] = useState("customer-dll@testai.com");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    navigate("/results", { state: { email } });
  }

  return (
    <div style={{ maxWidth: 560, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Customer Search</h1>
      <p>Search a customer by email address.</p>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Email
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: 10, marginTop: 6 }}
            placeholder="customer-dll@testai.com"
          />
        </label>

        {error ? <div style={{ color: "crimson" }}>{error}</div> : null}

        <button type="submit" style={{ padding: 10, cursor: "pointer" }}>
          Search
        </button>
      </form>
    </div>
  );
}
