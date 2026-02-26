# RP Super Speciality Hospital - Full Stack Application

A complete hospital management system with appointment booking, doctor profiles, and hospital information.

## 🏥 Project Overview

**Hospital:** RP Super Speciality Hospital (Est. 2025)
- 50 Beds · ICU + Emergency · 24/7 · Super Speciality
- Specialties: Pulmonology, Ophthalmology, Emergency Care

## 🛠️ Tech Stack

### Frontend
- React 19.2 + TypeScript
- Vite 7.3.1
- Tailwind CSS 4.2

### Backend
- Node.js 20+ + Express 4
- TypeScript 5
- PostgreSQL 16 + Prisma 5
- Zod validation

## 🚀 Quick Start

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete instructions.

```bash
# 1. Install dependencies
cd backend && npm install
cd .. && npm install

# 2. Setup database
cd backend
npm run prisma:migrate
npm run db:seed

# 3. Start servers
cd backend && npm run dev          # Terminal 1: Backend at :5000
npm run dev                        # Terminal 2: Frontend at :5173
```

## 📸 Features

- ✅ Doctor profiles with qualifications and specialties
- ✅ Doctor images with traditional placeholder method
- ✅ Appointment booking form with validation
- ✅ Real-time hospital contact information
- ✅ Rate limiting and security features
- ✅ Responsive design
- ✅ Error handling and loading states

## 📚 Documentation

- [**SETUP_GUIDE.md**](./SETUP_GUIDE.md) - Complete setup instructions
- [**DOCTOR_IMAGES_GUIDE.md**](./DOCTOR_IMAGES_GUIDE.md) - How to add/manage doctor photos
- [**Backend README**](./backend/README.md) - Backend API documentation
- [**Database Migration Guide**](./backend/DATABASE_MIGRATION.md) - Database setup details

## 📂 Structure

```
├── backend/           # Express API server
│   ├── src/
│   └── prisma/
├── src/               # React frontend
│   ├── components/
│   └── services/
└── SETUP_GUIDE.md     # Detailed setup instructions
```

## 🔗 API Endpoints

- `POST /api/appointments` - Create appointment
- `GET /api/doctors` - Get all doctors
- `GET /api/hospital-info` - Get hospital details
- `GET /api/departments` - Get departments

---

**For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
