# FreelanceHub Frontend

FreelanceHub is a modern freelance marketplace platform connecting talented freelancers and ambitious interns with clients worldwide. This repository contains the frontend application built with **Next.js 15 (App Router)**.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Icons:** [Lucide React](https://lucide.dev/)
- **HTTP Client:** Fetch API (with custom wrapper)
- **Deployment:** Vercel (Recommended)

## 📂 Project Structure

```bash
fh-frontend/
├── app/                  # App Router pages and layouts
│   ├── (auth)/           # Authentication routes (login, register)
│   ├── dashboard/        # PC/Client/Freelancer dashboards
│   └── api/              # Internal API routes (Next.js server)
├── components/           # Reusable UI components
├── lib/                  # Utilities, API wrappers, hooks
├── public/               # Static assets
└── ...config files
```

## 🛠️ Features

- **Role-Based Dashboards**: tailored interfaces for Clients (Employers) and Freelancers (Talent).
- **Job Management**: Post jobs, browse listings, and manage proposals.
- **Authentication**: Secure login/signup flow with Role guards.
- **Modern UI**: Clean, responsive design using Tailwind CSS.
- **Microservices**: Serverless email integration and local API proxies.

## 🏁 Getting Started

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd fh-frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:4000
   NEXT_PUBLIC_FRONTEND_URL=http://localhost:3000
   EMAIL_FROM="FreelanceHub <noreply@freelancehub.com>"
   
   # Internal API Key (Secure communication with Backend)
   INTERNAL_API_KEY=your_shared_secret_key
   
   # Optional: External Services
   GEMINI_API_KEY=your_gemini_key
   SERPAPI_KEY=your_serpapi_key
   
   # SMTP Configuration (For serverless email)
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=465
   SMTP_SECURE=true
   SMTP_USER=your_email@gmail.com
   SMTP_PASS=your_app_password
   ```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🏗️ Build & Deploy

To build the application for production:

```bash
npm run build
```

To start the production server:

```bash
npm start
```



## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.
