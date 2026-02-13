# Shopathon

Shopathon is a full-stack MERN e-commerce learning project inspired by production-grade architecture and workflows. It is built for educational use to practice API design, authentication, state management, payment integration, and admin operations.

## Project Status

- **Maturity**: Educational project in active local development
- **Deployment target**: Local and learning environments
- **Commercial readiness**: Not intended for production/commercial use without hardening

## Table of Contents

- Overview
- Architecture
- Technology Stack
- Repository Structure
- Core Features
- API Surface
- Security Notes
- Getting Started
- Environment Configuration
- Scripts
- Testing and Quality
- Troubleshooting
- Contributing
- License

## Overview

Shopathon includes:

- Customer product browsing, search, cart, checkout, and order tracking
- Authentication with profile management
- Admin features for product, user, and order management
- PayPal checkout flow with backend payment verification

The implementation intentionally favors readability and learning value.

## Architecture

- **Frontend**: React SPA with React Router and Redux Toolkit Query
- **Backend**: Node.js + Express REST API (ES modules)
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT with HTTP-only cookie flow
- **Payments**: PayPal client + server-side verification

High-level flow:

1. React UI calls backend REST endpoints via RTK Query
2. Backend validates/authenticates requests and interacts with MongoDB
3. Order payment is verified on backend using PayPal REST APIs

## Technology Stack

- **Frontend**: React, Redux Toolkit, RTK Query, React Router, Bootstrap, React-Bootstrap, Toastify
- **Backend**: Express, Mongoose, JSON Web Token, bcryptjs, cookie-parser, multer
- **Dev tooling**: nodemon, concurrently, dotenv

## Repository Structure

```text
shopathon/
  backend/
    config/
    controllers/
    middleware/
    model/
    routes/
    utils/
    server.js
  frontend/
    public/
    src/
      assets/
        styles/
      components/
      redux/
        slices/
      screens/
        admin/
      utils/
      App.js
      index.js
  uploads/
  .env
  LICENSE
  README.md
  package.json
```

## Core Features

- Product catalog with top products carousel and search
- Cart and checkout workflow (shipping, payment, place order)
- User auth and profile
- Product reviews for signed-in users
- Admin: product create/edit/delete, user management, order management
- PayPal payment capture with server-side validation checks

## API Surface

Base URL (local): `http://localhost:5005`

- `GET /api/products`
- `GET /api/products/top`
- `GET /api/products/:id`
- `POST /api/products/:id/reviews`
- `POST /api/users/login`
- `POST /api/users/logout`
- `POST /api/users`
- `GET/PUT /api/users/profile`
- `POST /api/orders`
- `GET /api/orders/myorders`
- `GET /api/orders/:id`
- `PUT /api/orders/:id/pay`
- `PUT /api/orders/:id/deliver`
- `GET /api/config/paypal`

For route-level details, see `backend/README.md`.

## Security Notes

This project includes educational implementations of core security controls:

- Password hashing with bcrypt
- JWT-based authentication with cookies
- Route protection and admin authorization middleware
- Server-side order price calculation
- Server-side PayPal verification and duplicate transaction checks

Not yet production hardened:

- Secrets management beyond `.env`
- Comprehensive audit logging
- Rate limiting / abuse protection
- End-to-end automated test coverage
- Security scanning in CI

## Getting Started

### Prerequisites

- Node.js 18+ (20+ recommended)
- npm 9+
- MongoDB Atlas cluster (or local MongoDB)
- PayPal Developer sandbox app (for payments)

### Installation

From repository root:

```bash
npm install
npm install --prefix frontend
```

### Run in Development

```bash
npm run dev
```

Services:

- Frontend: `http://localhost:3000`
- Backend: `http://localhost:5005`

### Seed Sample Data

```bash
npm run seed
```

Remove seeded data:

```bash
npm run destroy
```

## Environment Configuration

Create `.env` in repo root:

```bash
NODE_ENV=development
PORT=5005
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_app_secret
PAYPAL_API_URL=https://api-m.sandbox.paypal.com
```

Notes:

- `backend/utils/paypal.js` accepts `PAYPAL_APP_SECRET` (recommended) and also `PAYPAL_CLIENT_SECRET` for compatibility.
- Use sandbox credentials for local development.

## Scripts

From repo root:

- `npm run dev` - Run backend and frontend concurrently
- `npm run server` - Run backend with nodemon
- `npm run client` - Run frontend dev server
- `npm run start` - Run backend without nodemon
- `npm run build` - Install dependencies and build frontend
- `npm run seed` - Import sample data
- `npm run destroy` - Delete sample data

## Testing and Quality

Current state:

- Frontend test tooling is present via `react-scripts test`
- Manual end-to-end verification is currently the primary validation method

Recommended next steps:

- Add API integration tests for auth/orders/payments
- Add component tests for critical UI flows
- Add lint/format/type checks in CI

## Troubleshooting

- **Proxy ECONNREFUSED from frontend**: Backend is not running or crashed. Check backend logs in `npm run dev`.
- **PayPal access token errors**: Verify `PAYPAL_CLIENT_ID`, `PAYPAL_APP_SECRET`/`PAYPAL_CLIENT_SECRET`, and `PAYPAL_API_URL`.
- **Mongo connection issues**: Confirm `MONGO_URI` and Atlas IP access/network settings.

## Contributing

This is an educational repository. Contributions are welcome via issues and pull requests.

Suggested contribution flow:

1. Fork and create a feature branch
2. Keep changes scoped and documented
3. Run the app and validate impacted flows
4. Submit a PR with context and test notes

## License

This project is licensed under the MIT License. See `LICENSE`.

Educational intent:

- Suitable for learning, experimentation, and portfolio usage
- No warranty or production support is provided

