# API Endpoints for Frontend Integration

## Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

## Jobs
- GET /api/jobs (list with filters)
- POST /api/jobs (create)
- GET /api/jobs/:id (details)
- PUT /api/jobs/:id (update)
- DELETE /api/jobs/:id (delete)

## Proposals
- POST /api/jobs/:id/proposals (submit)
- GET /api/jobs/:id/proposals (list for job)
- GET /api/proposals/:id (details)

## Contracts
- POST /api/contracts (create from proposal)
- GET /api/contracts (user's contracts)
- PUT /api/contracts/:id/submit (freelancer submits work)
- PUT /api/contracts/:id/approve (client approves)
- PUT /api/contracts/:id/request-revision (request changes)

## Payments
- POST /api/payments/fund-wallet (add money)
- POST /api/payments/withdraw (withdraw money)
- GET /api/payments/history (transaction history)

## Search
- GET /api/search/jobs (advanced search)
- GET /api/search/suggestions (autocomplete)
- GET /api/search/filters (filter options)
- GET /api/search/status (search engine status)

## Users
- GET /api/users/profile (get profile)
- PUT /api/users/profile (update profile)
- DELETE /api/users/:id (delete account)

Total: 24 endpoints