import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Results screen:
 * - calls GET /api/customers/v1?email=...
 * - shows customer details          
 */
export default function ResultsScreen() {
  const navigate = useNavigate();
  const location = useLocation();

  // Email passed from SearchScreen
  const email = location.state?.email;

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState("");

  const apiUrl = useMemo(() => {
    if (!email) return null;
    return `/api/customers/v1?email=${encodeURIComponent(email)}`;
  }, [email]);

  useEffect(() => {
    if (!email) {
      // If user refreshed directly on /results, send them back.
      navigate("/search", { replace: true });
      return;
    }

    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(apiUrl, { timeout: 5000 });
        if (!cancelled) setCustomer(res.data);
      } catch (e) {
        const msg = e?.response?.data?.error || e.message || "Failed to load customer.";
        if (!cancelled) setError(msg);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [apiUrl, email, navigate]);

  return (
    <div style={{ maxWidth: 760, margin: "40px auto", fontFamily: "system-ui" }}>
      <h1>Customer Details</h1>

      <button onClick={() => navigate("/search")} style={{ padding: 10, cursor: "pointer" }}>
        Back to search
      </button>

      <div style={{ marginTop: 18 }}>
        {loading ? <p>Loading...</p> : null}
        {error ? <p style={{ color: "crimson" }}>{error}</p> : null}

        {customer ? (
          <div style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}>
            <p><b>Email:</b> {customer.email}</p>
            <p><b>Name:</b> {customer.firstName} {customer.lastName}</p>
            <p><b>Income (EUR/year):</b> {customer.incomeEURPerYear}</p>

            <h3>Address</h3>
            <p>
              {customer.address.street} {customer.address.houseNumber}<br />
              {customer.address.zipCode}<br />
              {customer.address.state}<br />
              {customer.address.country}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
