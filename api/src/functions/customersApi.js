import { app } from "@azure/functions";
import axios from "axios";

/**
 * This function is the "backend gateway" endpoint the frontend calls.
 * It uses axios (as requested) to call the downstream mock customer API.
 *
 * Versioning is part of the URL: /customers/v1
 *
 * GET /api/customers/v1?email=customer-dll@testai.com
 */
app.http("customersApi", {
  methods: ["GET"],
  route: "customers/v1",
  authLevel: "anonymous",
  handler: async (request, context) => {
    try {
      const email = request.query.get("email");
      if (!email) {
        return {
          status: 400,
          jsonBody: { error: "Missing query parameter: email" }
        };
      }

      // Build a base URL that works both locally and when hosted.
      // In Azure Static Web Apps, your API is served under the same host.
      const host = request.headers.get("host");
      const forwardedProto = request.headers.get("x-forwarded-proto") || "https";
      const baseUrl = host ? `${forwardedProto}://${host}` : "http://localhost:4280";

      // Downstream mock API call using axios
      const url = `${baseUrl}/api/customers/v1/mock?email=${encodeURIComponent(email)}`;
      const response = await axios.get(url, { timeout: 5000 });

      // Return exactly what downstream returns
      return {
        status: 200,
        jsonBody: response.data
      };
    } catch (err) {
      // Normalize common axios errors
      const status = err?.response?.status || 500;
      const message =
        err?.response?.data?.error ||
        err?.message ||
        "Unexpected error";

      return {
        status,
        jsonBody: { error: message }
      };
    }
  }
});
