# Database Migration Notes

## Current Status

This project has been updated to use **in-memory data storage** instead of a database. This simplifies setup and is suitable for:
- Development and testing
- Small-scale deployments
- Demonstrations and prototypes

## What Changed

### Removed
- Prisma ORM dependencies (@prisma/client, prisma)
- Database connection requirements
- Migration files and seed scripts
- PostgreSQL dependency

### Added
- In-memory data store (`/backend/src/data/store.ts`)
- Auto-initialization of sample data
- Simplified setup process

## Files You Can Delete

The following Prisma-related files are no longer needed and can be safely deleted:

```
backend/prisma/
├── schema.prisma          # Can be deleted or kept as reference
├── seed.ts               # Can be deleted
└── migrations/           # Can be deleted
    ├── migration_lock.toml
    └── 20260224192230_rphospital/
        └── migration.sql
```

**To remove:**
```bash
cd backend
rm -rf prisma/
```

Or keep the `prisma/` folder as a reference for your data models if you plan to add a database later.

## Adding Database Later

When you're ready to add persistent storage:

### 1. Choose Your Database
- PostgreSQL (recommended for production)
- MySQL
- MongoDB
- SQLite (for local development)

### 2. Install Database Client

**For Prisma (PostgreSQL/MySQL/SQLite):**
```bash
cd backend
npm install @prisma/client prisma
```

**For MongoDB:**
```bash
npm install mongodb
```

### 3. Use Existing Data Models as Reference

The types in `/backend/src/data/store.ts` define your data structure:
- `Department`
- `Doctor`
- `Appointment`
- `HospitalInfo`
- `Testimonial`

### 4. Update Configuration

**Add to `backend/.env`:**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/rkhospital"
```

**Update `backend/src/config/database.ts`:**
```typescript
// Replace in-memory store with your database client
import { PrismaClient } from '@prisma/client';
export default new PrismaClient();
```

### 5. Update Services

Replace the in-memory operations in each service file:

**Before (in-memory):**
```typescript
dataStore.doctors.find(d => d.id === id)
```

**After (with database):**
```typescript
await prisma.doctor.findUnique({ where: { id } })
```

### 6. Migration Path

1. Create Prisma schema based on types in `store.ts`
2. Run migrations: `npx prisma migrate dev`
3. Update all service files to use Prisma client
4. Seed the database with initial data
5. Test thoroughly before deploying

## Why In-Memory Storage?

**Advantages:**
- ✅ Zero configuration - works immediately
- ✅ No database setup required
- ✅ Perfect for demos and prototypes
- ✅ Faster development iteration
- ✅ Easy to modify data structure

**Limitations:**
- ⚠️ Data resets when server restarts
- ⚠️ Not suitable for production with multiple users
- ⚠️ No data persistence
- ⚠️ Single instance only (no clustering)

## When to Migrate to Database?

Consider adding a database when:
- You need data persistence across server restarts
- You have multiple users creating appointments
- You're deploying to production
- You need to scale horizontally
- You want to analyze historical data
- You need backup and recovery capabilities

## Questions?

If you need help migrating to a database, the code structure is already prepared for it. The separation of concerns (controllers → services → data layer) makes the transition straightforward.
