# Fullstack Menu Management System

A full-stack application for menu management with a modern tech stack.

## Live Sites

- Frontend: [https://menu-web.vdaily.app](https://menu-web.vdaily.app)
- Backend API: [https://menu-api.vdaily.app](https://menu-api.vdaily.app)

## Tech Stack

### Frontend
- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Zustand for state management
- shadcn/ui components

### Backend
- NestJS
- TypeScript
- Prisma ORM
- PostgreSQL
- GraphQL
- REST API

## Development Setup

### Prerequisites
- Node.js (v18+)
- pnpm (recommended) or npm
- Docker and Docker Compose
- PostgreSQL

### Running Locally

1. Clone the repository
```bash
git clone https://github.com/npv2k1/fullstack-assignment.git
cd fullstack-assignment
```

2. Install dependencies
```bash
# Backend
cd backend
pnpm install

# Frontend
cd frontend
pnpm install
```

3. Set up environment variables
```bash
# Backend
cp backend/.env.example backend/.env
# Frontend
cp frontend/.env.example frontend/.env.local
```

4. Start the development servers
```bash
# Backend
cd backend
pnpm dev

# Frontend
cd frontend
pnpm dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:4000`.

## Docker Development

Run the entire stack using Docker Compose:

```bash
docker compose up -d
```

## Deployment

### Container Registry

Images are stored in GitHub Container Registry (ghcr.io):
- Frontend: `ghcr.io/npv2k1/fullstack-assignment-frontend`
- Backend: `ghcr.io/npv2k1/fullstack-assignment-backend`

### Kubernetes Deployment

The application is deployed using Kubernetes. Deployment files are located in the `deploy/` directory:
- `deploy/web-deployment.yaml`: Frontend deployment
- `deploy/api-deployment.yaml`: Backend deployment

Each deployment includes:
- Deployment configuration
- Service definition
- Ingress rules for external access

### CI/CD Pipeline

GitHub Actions workflow (`build.yaml`) handles:
1. Building Docker images for frontend and backend
2. Publishing images to GitHub Container Registry
3. Updating deployment manifests with new image tags
4. Creating Pull Requests for deployment updates

## License

MIT License - See [LICENSE](backend/LICENSE) for details.