# Frontend - Shopathon

This directory contains the React client application for Shopathon.

## Scope

- Product browsing, search, pagination, and product details
- Cart and checkout flow
- User authentication and profile pages
- Admin UI for products, users, and orders
- PayPal checkout button integration

## Tech Stack

- React 19
- React Router
- Redux Toolkit + RTK Query
- React-Bootstrap + Bootstrap
- React-Toastify

## Local Development

From the repository root:

```bash
npm run client
```

Or from this `frontend` directory:

```bash
npm start
```

Client runs on `http://localhost:3000` and proxies API requests to backend (`http://localhost:5005`) using `package.json` proxy config.

## Scripts

Run in `frontend`:

- `npm start` - Start development server
- `npm test` - Run tests in watch mode
- `npm run build` - Create production build
- `npm run eject` - Eject CRA config (irreversible)

## Key Directories

```text
frontend/src/
  components/      # Reusable UI components
  screens/         # Route-level pages
  redux/           # Store, slices, RTK Query API slices
  assets/styles/   # Global styles
```

## Conventions

- Keep route-level data fetching in `screens/`
- Keep API definitions in RTK Query slices under `redux/slices/`
- Use toast notifications for user-facing async feedback
- Keep components focused and reusable

## Common Issues

- **Proxy errors** (`ECONNREFUSED`): backend server is down
- **Stale list data after mutation**: verify RTK Query `providesTags` and `invalidatesTags`
- **PayPal button issues**: verify backend `/api/config/paypal` and PayPal sandbox env vars

## Additional Documentation

- Main project docs: `../README.md`
- Backend docs: `../backend/README.md`
