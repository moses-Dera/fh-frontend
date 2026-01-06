# Deploying FreelanceHub Frontend to Vercel

This guide explains how to deploy the `fh-frontend` to [Vercel](https://vercel.com).

## Prerequisites

- Your code should be pushed to a GitHub repository.
- You have the URL of your deployed backend (e.g., on Render).

## Steps

1.  **Log in to Vercel**: Go to [vercel.com](https://vercel.com) and log in with GitHub.
2.  **Add New Project**:
    *   Click **Add New...** -> **Project**.
    *   Import your `freelancehub` repository.
3.  **Configure Project**:
    *   **Framework Preset**: Next.js (should be detected automatically).
    *   **Root Directory**: Click `Edit` and select `fh-frontend` (since your repo has both frontend and backend).
4.  **Environment Variables**:
    *   Expand the **Environment Variables** section.
    *   Add the following:
        *   `NEXT_PUBLIC_API_URL`: `http://freelancehub-backend-n868.onrender.com` (Your deployed backend URL)
        *   `NEXT_PUBLIC_FRONTEND_URL`: `https://your-project-name.vercel.app` (You can add this *after* deployment once you know the URL, or use a custom domain).
5.  **Deploy**:
    *   Click **Deploy**.
    *   Wait for the build to complete.

## Post-Deployment (Connecting Backend)

Once your frontend is live:
1.  Copy the URL (e.g., `https://freelancehub-frontend.vercel.app`).
2.  Go to your **Render Dashboard** (Backend).
3.  Update the `FRONTEND_URL` environment variable with this new link.
