# Backend - Shopathon

This directory contains the Express API for Shopathon.

## Responsibilities

- Serve REST endpoints for products, users, orders, uploads, and PayPal config
- Authenticate and authorize requests
- Persist and query data in MongoDB
- Verify PayPal transactions server-side
- Calculate order pricing server-side

## Runtime

- Node.js (ES modules)
- Express
- Mongoose

Entry point: `backend/server.js`

## API Modules

- `routes/productRoutes.js`
- `routes/userRoutes.js`
- `routes/orderRoutes.js`
- `routes/uploadRoutes.js`

Controllers are in `controllers/`, shared utilities in `utils/`, middleware in `middleware/`.

## Environment Variables

Configured in root `.env`:

- `NODE_ENV`
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `PAYPAL_CLIENT_ID`
- `PAYPAL_APP_SECRET` (preferred)
- `PAYPAL_CLIENT_SECRET` (supported for compatibility)
- `PAYPAL_API_URL`

## Running Backend Only

From repo root:

```bash
npm run server
```

Or production-style start:

```bash
npm run start
```

Default API URL: `http://localhost:5005`

## Auth and Access Model

- Public: product browsing endpoints
- Protected: profile and order endpoints
- Admin: user/product/order management endpoints

Auth uses JWT and cookie middleware in `middleware/authMiddleware.js`.

## Payment and Order Integrity

Security-focused flow in place:

- Order prices are recalculated on server (`utils/calcPrices.js`)
- PayPal transaction is verified against PayPal API (`utils/paypal.js`)
- Duplicate transaction IDs are rejected
- Paid amount is compared with stored order total

## Error Handling

- `middleware/errorMiddleware.js` provides not-found and centralized error responses
- Invalid resource IDs can be guarded via `middleware/checkObjectId.js`

## Data Operations

From repo root:

- `npm run seed` - import seed data
- `npm run destroy` - remove seed data

Seeder entry: `backend/seeder.js`

## Operational Troubleshooting

- **Server crash on startup**: check import/export mismatches in controllers/routes
- **MongoDB connection failures**: verify `MONGO_URI` and network access
- **PayPal access token errors**: verify env vars and sandbox credentials
- **Frontend proxy failures**: ensure backend process is running on configured port
