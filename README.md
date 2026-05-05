# viagens-entre-papel

#### Project structure
```
viagens-entre-papel/
├── frontend/                 # React app
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── .env.example
├── backend/                  # Node + Express
│   ├── src/
│   │   ├── controllers/      # Business logic
│   │   ├── routes/           # Express routes
│   │   ├── models/           # Sequelize ORM models
│   │   ├── middleware/       # Auth, error handling
│   │   ├── utils/            # Helpers
│   │   └── app.js            # Express setup
│   ├── tests/                # Jest tests
│   ├── package.json
│   └── .env.example
├── .github/
│   └── workflows/            # CI/CD pipelines
├── docker-compose.yml        # Local dev environment
└── README.md
```

═════════════════════════════════════════════════════════════════════════

🚀 QUICK START

Backend:
  cd backend
  npm i
  node server.js

Frontend (new terminal):
  cd frontend
  npm i
  npm run dev

Open: http://localhost:5173

═════════════════════════════════════════════════════════════════════════
