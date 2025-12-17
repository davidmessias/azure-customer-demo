import { app } from "@azure/functions";

/**
 * This function simulates the "Customer API" that returns hardcoded data.
 * Versioning is part of the URL: /customers/v1/mock
 *
 * GET /api/customers/v1/mock?email=customer-dll@testai.com
 */
app.http("mockCustomerApi", {
  methods: ["GET"],
  route: "customers/v1/mock",
  authLevel: "anonymous",
  handler: async (request, context) => {
    const email = request.query.get("email");

    // Hardcoded allowed email
    const allowedEmail = "customer-dll@testai.com";

    if (!email) {
      return {
        status: 400,
        jsonBody: { error: "Missing query parameter: email" }
      };
    }

    if (email !== allowedEmail) {
      return {
        status: 404,
        jsonBody: { error: "Customer not found" }
      };
    }

    // Hardcoded customer details (income: 100k euros/year)
    const customer = {
      email: allowedEmail,
      firstName: "Daniella",
      lastName: "Müller",
      incomeEURPerYear: 100000,
      address: {
        street: "Keizersgracht",
        houseNumber: "123",
        zipCode: "1015 CJ",
        state: "Noord-Holland",
        country: "Netherlands"
      }
    };

    return {
      status: 200,
      jsonBody: customer
    };
  }
});
