# RP Super Speciality Hospital - Complete Setup Guide

## 📋 Overview

This project consists of:
- **Frontend**: React + TypeScript + Vite + Tailwind CSS
- **Backend**: Node.js + Express + TypeScript + In-memory Storage

**Note**: Currently using in-memory data storage. A database can be easily added later when needed.

---

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ installed
- npm or yarn package manager

### Step 1: Install Dependencies

```bash
# Install Backend Dependencies
cd backend
npm install

# Install Frontend Dependencies (in a new terminal)
cd ../
npm install
```

### Step 2: Configure Environment (Optional)

Backend `.env.example` can be copied if you need to customize settings:
```bash
cd backend
cp .env.example .env
# Edit .env if needed (optional - defaults work fine)
```

### Step 3: Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
# Backend runs on http://localhost:5000
# Sample data is automatically loaded
```

**Terminal 2 - Frontend:**
```bash
# From root directory
npm run dev
# Frontend runs on http://localhost:5173
```

The backend automatically initializes with sample data including:
- 2 Doctors (Dr. Rajendra Prasad Boddula, Dr. Vanitha A)
- 3 Departments (Pulmonology, Ophthalmology, Emergency Care)
- Hospital Information
- Sample Testimonial

### Step 4: Test the Application

1. Open http://localhost:5173 in your browser
2. Scroll to the appointment form
3. Fill in name and phone number
4. Submit - you should see a success message!

---

## 📁 Project Structure

```
rkhospital/
├── backend/                    # Backend API
│   ├── src/
│   │   ├── config/            # Environment config
│   │   ├── controllers/       # Request handlers
│   │   ├── data/              # In-memory data store
│   │   ├── services/          # Business logic
│   │   ├── routes/            # API routes
│   │   ├── middleware/        # Express middleware
│   │   ├── schemas/           # Zod validation schemas
│   │   ├── utils/             # Helper functions
│   │   ├── app.ts             # Express app setup
│   │   └── server.ts          # Server entry point
│   ├── .env.example           # Environment variables template
│   └── package.json
├── src/                        # Frontend React app
│   ├── components/            # React components
│   ├── services/
│   │   └── api.ts             # API service layer
│   └── assets/
└── package.json
```

---

## 🔌 API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Rate Limit |
|--------|----------|-------------|------------|
| GET | `/health` | Health check | - |
| **Appointments** |
| POST | `/appointments` | Create appointment | 5/hour/IP |
| GET | `/appointments` | List appointments | 100/15min |
| GET | `/appointments/:id` | Get appointment | - |
| PATCH | `/appointments/:id` | Update appointment | - |
| DELETE | `/appointments/:id` | Delete appointment | - |
| **Doctors** |
| GET | `/doctors` | List all doctors | - |
| GET | `/doctors/:id` | Get doctor details | - |
| **Departments** |
| GET | `/departments` | List departments | - |
| GET | `/departments/:id` | Get department | - |
| **Hospital** |
| GET | `/hospital-info` | Get hospital info | - |

### Example API Calls

**Create Appointment:**
```bash
curl -X POST http://localhost:5000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{
    "patientName": "John Doe",
    "phone": "+919876543210"
  }'
```

**Get All Doctors:**
```bash
curl http://localhost:5000/api/doctors
```

**Get Hospital Info:**
```bash
curl http://localhost:5000/api/hospital-info
```

---

## 🔒 Security Features

- ✅ Helmet.js for security headers
- ✅ CORS configured for frontend origin
- ✅ Rate limiting (5 appointments/hour, 100 general requests/15min)
- ✅ Input validation with Zod
- ✅ Error handling middleware
- ✅ Request logging

---

## 🛠️ Development Commands

### Backend

```bash
cd backend

# Development with hot reload
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Frontend

```bash
# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 💾 Data Storage

Currently using in-memory storage located in `/backend/src/data/store.ts`. 

**Features:**
- ✅ Auto-initializes with sample data on server start
- ✅ Fast read/write operations
- ✅ Perfect for development and small-scale deployment
- ⚠️ Data resets when server restarts

### Adding Database Later

When you need persistent storage, see [backend/README.md](backend/README.md) for migration guide.

---

## 🧪 Testing the Integration

### Manual Testing Checklist:

1. **Doctor Section** - Should display 2 real doctors with their qualifications
2. **Appointment Form** - Submit should create appointment and show success message
3. **Contact Section** - Should display real hospital contact info
4. **Rate Limiting** - Try submitting >5 appointments in an hour (should get rate limited)

### Testing Rate Limiting:
```bash
# Test appointment rate limiting (run 6 times quickly)
for i in {1..6}; do
  curl -X POST http://localhost:5000/api/appointments \
    -H "Content-Type: application/json" \
    -d "{\"patientName\":\"Test$i\",\"phone\":\"123456789$i\"}"
  echo ""
done
# 6th request should return 429 Too Many Requests
```

---

## 📝 Data Management

### Modifying Initial Data

Edit `/backend/src/data/store.ts` to change:
- Hospital information
- Doctors and their details
- Departments
- Sample appointments

Changes take effect after restarting the server.
npm run db:seed
```

### Add New Migration:
```bash
# After modifying schema.prisma
npx prisma migrate dev --name your_migration_name
```

---

## 🚨 Troubleshooting

### Issue: Database Connection Failed

**Solution:**
1. Ensure PostgreSQL is running: `pg_isready`
2. Check credentials in `backend/.env`
3. Verify database exists: `psql -U postgres -c "\l" | grep rkhospital`

### Issue: Port Already in Use

**Solution:**
```bash
# Backend port 5000
lsof -ti:5000 | xargs kill -9

# Frontend port 5173
lsof -ti:5173 | xargs kill -9
```

### Issue: Prisma Client Not Generated

**Solution:**
```bash
cd backend
npm run prisma:generate
```

### Issue: CORS Errors

**Solution:**
Check `backend/src/app.ts` - CORS origin should match frontend URL:
```typescript
cors({
  origin: 'http://localhost:5173',
  credentials: true,
})
```

---

## 🌐 Production Deployment

### Environment Variables for Production:

**Backend:**
```env
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://yourdomain.com
LOG_LEVEL=warn
# Only add these if you implement database/auth later:
# DATABASE_URL=your_production_database_url
# JWT_SECRET=strong-random-secret-change-this
```

**Frontend:**
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### Build for Production:

```bash
# Backend
cd backend
npm run build
npm start

# Frontend
npm run build
# Serve dist/ folder with nginx/vercel/netlify
```

**Note:** For production use with significant traffic, consider migrating to a persistent database. See the backend README for migration guidance.

---

## 📝 Notes

- Default doctor data matches your hospital specification
- Appointment form has client-side and server-side validation
- Rate limiting protects against spam
- All API responses follow consistent format
- Error messages are user-friendly
- Data is stored in-memory and resets on server restart
- Doctor photos use traditional placeholder method (see section below)

---

## 📸 Adding Doctor Images

The system uses a traditional placeholder method for doctor images:

### How to Add a Doctor Photo:

1. **Prepare the Image:**
   - Use professional headshot photos
   - Recommended size: 800x600px or similar aspect ratio
   - Supported formats: JPG, PNG, WebP
   - Keep file size under 500KB for optimal loading

2. **Add Image to Public Folder:**
   ```bash
   # Place image in the public folder
   cp /path/to/doctor-photo.jpg public/dr-vanitha.jpg
   ```

3. **Update Doctor Data:**
   Edit `backend/src/data/store.ts` and add the `photoUrl`:
   ```typescript
   const doctor2: Doctor = {
     // ... other fields
     photoUrl: '/dr-vanitha.jpg', // ← Add this line
     // ... rest of fields
   };
   ```

4. **Restart Backend Server:**
   ```bash
   cd backend
   npm run dev
   ```

### Current Doctor Images:

- ✅ Dr. Rajendra Prasad Boddula: `/dr-rajendra-prasad.jpg` (configured)
- ⏳ Dr. Vanitha A: No image yet (shows initials placeholder)

### Image Naming Convention:

Use lowercase, hyphenated format:
- `dr-firstname-lastname.jpg`
- Example: `dr-rajendra-prasad.jpg`

**Note:** Images are served directly from the `/public` folder by Vite. No backend upload endpoint is needed for this traditional method.

---

## 🎯 Next Steps (Optional Enhancements)

1. **Database Migration** - Add PostgreSQL/MongoDB for persistent storage
2. **Admin Panel** - Add authentication & admin dashboard to manage appointments
3. **Email Notifications** - Send confirmation emails after appointment creation
4. **SMS Integration** - Send SMS to patients
5. **Online Consultation** - Video call integration
6. **Payment Gateway** - Accept online payments
7. **Appointment Scheduling** - Calendar-based slot booking
8. **Patient Portal** - Login system for patients to track appointments

---

## 💡 Support

For issues or questions:
1. Check logs in `backend/logs/`
2. Review data in `backend/src/data/store.ts`
3. Check browser console for frontend errors
4. Check terminal output for backend errors

---

**✅ Setup Complete! Your hospital management system is ready.**
