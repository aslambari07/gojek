# API Endpoints

Base URL: `http://localhost:4000/api`

## Auth

- `POST /auth/register`
- `POST /auth/login`
- `POST /auth/otp/send`
- `POST /auth/otp/verify`
- `POST /auth/forgot-password`

## Customer

- `GET /customer/dashboard`
- `GET /customer/fare-estimate?distanceKm=7.2&service=ride`
- `POST /customer/orders`
- `GET /customer/restaurants`
- `GET /customer/restaurants/:slug`
- `GET /customer/wallet`
- `POST /customer/wallet/top-up`
- `POST /customer/orders/:id/review`

## Driver

- `GET /driver/dashboard`
- `PATCH /driver/status`
- `PATCH /driver/orders/:id/status`

## Admin

- `GET /admin/dashboard`
- `GET /admin/users`
- `GET /admin/drivers`
- `PATCH /admin/drivers/:id/verify`
- `PATCH /admin/accounts/:id/suspend`
- `GET /admin/orders`
- `GET /admin/reports`
