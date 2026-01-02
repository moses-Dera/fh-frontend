
# Frontend System Design - Minimal Pattern

## 1. Three Layout System (Maximum Reuse)

### Layout A: AUTH (Login/Register)
- Centered card with form
- Used for: login, register, forgot password

### Layout B: DASHBOARD (Logged-in users)  
- Header + Sidebar + Content
- Used for: all user pages after login

### Layout C: PUBLIC (Guest users)
- Header + Content + Footer  
- Used for: landing, job search, job details

## 2. Page Structure (12 pages total)

### AUTH PAGES (Layout A)
1. /login
2. /register

### PUBLIC PAGES (Layout C)  
3. / (landing)
4. /jobs (search results)
5. /jobs/[id] (job details)

### CLIENT DASHBOARD (Layout B)
6. /dashboard/client (overview)
7. /dashboard/client/jobs (my jobs)
8. /dashboard/client/proposals (received proposals)

### FREELANCER DASHBOARD (Layout B)
9. /dashboard/freelancer (overview) 
10. /dashboard/freelancer/jobs (browse jobs)
11. /dashboard/freelancer/proposals (my proposals)

### SHARED DASHBOARD (Layout B)
12. /dashboard/profile (user profile)

## 3. Reusable Components (8 only)

1. **JobCard** - Display job info
2. **ProposalCard** - Display proposal info  
3. **DataTable** - Lists with pagination
4. **SearchBar** - Job search with filters
5. **StatusBadge** - Status indicators
6. **ActionButton** - Primary actions
7. **FormModal** - All forms in modals
8. **PageHeader** - Page titles + actions

## 4. API Integration Pattern

```javascript
// Single API hook pattern
const useAPI = (endpoint, options) => {
  // Handles all CRUD operations
  // GET, POST, PUT, DELETE
  // Loading, error, success states
}

// Usage examples:
const { data: jobs } = useAPI('/jobs')
const { mutate: createJob } = useAPI('/jobs', { method: 'POST' })
const { data: proposals } = useAPI(`/jobs/${jobId}/proposals`)
```

## 5. State Management (Minimal)

```javascript
// Only 3 stores needed:
- authStore (user, token, role)
- jobsStore (current job data)  
- uiStore (modals, loading states)
```

## 6. Complete API Endpoints

### Authentication
- POST /api/auth/register
- POST /api/auth/login
- POST /api/auth/logout
- POST /api/auth/refresh

### Jobs
- GET /api/jobs
- POST /api/jobs
- GET /api/jobs/:id
- PUT /api/jobs/:id
- DELETE /api/jobs/:id

### Proposals
- POST /api/jobs/:id/proposals
- GET /api/jobs/:id/proposals
- GET /api/proposals/:id

### Contracts
- POST /api/contracts
- GET /api/contracts
- PUT /api/contracts/:id/submit
- PUT /api/contracts/:id/approve
- PUT /api/contracts/:id/request-revision

### Payments
- POST /api/payments/fund-wallet
- POST /api/payments/withdraw
- GET /api/payments/history

### Search
- GET /api/search/jobs
- GET /api/search/suggestions
- GET /api/search/filters
- GET /api/search/status

### Users
- GET /api/users/profile
- PUT /api/users/profile
- DELETE /api/users/:id

**Total: 24 endpoints**

## 7. Routing Structure

```
/
├── (auth)/
│   ├── login/
│   └── register/
├── jobs/
│   ├── page.tsx (search)
│   └── [id]/page.tsx (details)
└── dashboard/
    ├── client/
    ├── freelancer/
    └── profile/
```

This design minimizes development time while covering all functionality!