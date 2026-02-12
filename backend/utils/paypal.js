import dotenv from "dotenv";
dotenv.config();

const {
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_APP_SECRET,
  PAYPAL_API_URL,
} = process.env;
const PAYPAL_SECRET = PAYPAL_CLIENT_SECRET || PAYPAL_APP_SECRET;

/**
 * Fetches an access token from PayPal API
 * @see {@Link https://developer.paypal.com/docs/api/rest/authentication/#authentication-and-authorization}
 * @returns {Promise<string>} The access token if the request is successful
 * @throws {Error} If the request is not successful
 */
async function getPayPalAccessToken() {
  if (!PAYPAL_CLIENT_ID || !PAYPAL_SECRET || !PAYPAL_API_URL) {
    throw new Error(
      "PayPal configuration missing: check PAYPAL_CLIENT_ID, PAYPAL_APP_SECRET/PAYPAL_CLIENT_SECRET, PAYPAL_API_URL",
    );
  }

  //Authorization header requires base64 encoding of client_id:client_secret
  const auth = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
  ).toString("base64");
  const url = `${PAYPAL_API_URL}/v1/oauth2/token`;
  const headers = {
    Accept: "application/json",
    "Accept-Language": "en_US",
    Authorization: `Basic ${auth}`,
  };
  const body = "grant_type=client_credentials";
  const response = await fetch(url, {
    method: "POST",
    headers,
    body,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Failed to get PayPal access token (${response.status}): ${errorText}`,
    );
  }
  const paypalData = await response.json();
  return paypalData.access_token;
}

/**
 * Checks if a PayPal transaction is new by comparing the transaction ID with existing orders in the database
 * @param {Mongoose.Model} orderModel - The Mongoose model for orders in the database
 * @param {string} paypalTransactionId - The PayPal transaction ID to check
 * @returns {Promise<boolean>} True if the transaction is new, false otherwise
 * @throws {Error} If there us an error in the database or the PayPal API
 */
export async function checkIfNewTransaction(orderModel, paypalTransactionId) {
  try {
    // Find all documents where Order.paymentResult.id is the same as the id passed paypalTransactionId
    const orders = await orderModel.find({
      "paymentResult.id": paypalTransactionId,
    });

    // If there are no such orders, then it's a new transaction.
    return orders.length === 0;
  } catch (err) {
    console.error(err);
  }
}

/**
 * Verifies a PayPal payment by making a request to the PayPal API.
 * @see {@link https://developer.paypal.com/docs/api/orders/v2/#orders_get}
 *
 * @param {string} paypalTransactionId - The PayPal transaction ID to be verified.
 * @returns {Promise<Object>} An object with properties 'verified' indicating if the payment is completed and 'value' indicating the payment amount.
 * @throws {Error} If the request is not successful.
 *
 */
export async function verifyPayPalPayment(paypalTransactionId) {
  const accessToken = await getPayPalAccessToken();
  const paypalResponse = await fetch(
    `${PAYPAL_API_URL}/v2/checkout/orders/${paypalTransactionId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  if (!paypalResponse.ok) throw new Error("Failed to verify payment");

  const paypalData = await paypalResponse.json();
  return {
    verified: paypalData.status === "COMPLETED",
    value: paypalData.purchase_units[0].amount.value,
  };
}
