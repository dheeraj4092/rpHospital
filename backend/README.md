# RP Super Speciality Hospital - Backend API

Backend API server for RP Super Speciality Hospital website.

## Tech Stack

- Node.js + Express
- TypeScript
- In-memory data storage (easily replaceable with database)
- Zod validation

## Setup Instructions

1. Install dependencies:
```bash
npm install
```

2. Setup environment variables:
```bash
cp .env.example .env
# Edit .env if needed (optional for now)
```

3. Start development server:
```bash
npm run dev
```

The server will start with pre-populated sample data.

## API Endpoints

- `POST /api/appointments` - Create new appointment
- `GET /api/appointments` - Get all appointments (with pagination)
- `GET /api/appointments/:id` - Get appointment by ID
- `PUT /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment
- `GET /api/doctors` - Get all doctors
- `GET /api/doctors/:id` - Get doctor by ID
- `GET /api/departments` - Get all departments
- `GET /api/departments/:id` - Get department by ID
- `GET /api/hospital-info` - Get hospital information
- `PUT /api/hospital-info` - Update hospital information

## Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server

## Environment Variables

See `.env.example` for optional environment variables.

### Appointment Email Notifications

To receive appointment notifications by email, configure SMTP in `.env`:

- `APPOINTMENT_NOTIFICATION_EMAIL`: recipient email for booking alerts
- `SMTP_HOST`: SMTP server host (for example `smtp.gmail.com`)
- `SMTP_PORT`: SMTP port (usually `587` for TLS or `465` for SSL)
- `SMTP_SECURE`: `true` for SSL (`465`), `false` for STARTTLS (`587`)
- `SMTP_USER`: SMTP username/login
- `SMTP_PASS`: SMTP password or app password
- `SMTP_FROM`: sender email address shown in outgoing messages

If SMTP is not configured, appointments are still created and the API continues to work, but email notifications are skipped.

## Data Storage

Currently using in-memory storage. All data is stored in `/src/data/store.ts`.

### Adding Database Later

When you need persistent storage:

1. Install your preferred database client (e.g., Prisma with PostgreSQL, MongoDB, MySQL)
2. Use the types in `/src/data/store.ts` as your schema reference
3. Update `/src/config/database.ts` to export your database client
4. Update the services in `/src/services/` to use database queries instead of in-memory operations
5. The current structure is designed to make this transition smooth
