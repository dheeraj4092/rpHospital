# Deeplink Booking - Quick Start Guide

## 🚀 Test the Feature in 3 Minutes

### 1. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

Backend will start on: `http://localhost:5001`

### 2. Start the Frontend

```bash
# In a new terminal, from project root
npm install
npm run dev
```

Frontend will start on: `http://localhost:5173`

### 3. Test Simple Deeplink Flow

Open this URL in your browser:

```
http://localhost:5173/?doctorId=dr-rajkumar&source=hospital_test&campaign=test_campaign
```

**Expected Result:**
- ✅ Page loads
- ✅ Appointment modal opens automatically
- ✅ Modal shows "Book with Dr. Rajkumar"
- ✅ "Via Partner Hospital" badge appears
- ✅ Department is prefilled
- ✅ You can complete the booking

### 4. Test Signed Deeplink (Secure)

**Step 1: Generate a test signed link**

```bash
curl http://localhost:5001/api/partners/deeplink/test
```

**Step 2: Copy the `testUrl` from response**

Example response:
```json
{
  "success": true,
  "message": "Test deeplink generated",
  "data": {
    "testUrl": "http://localhost:5173/booking/deeplink?signed=eyJkb2N0b3JJZCI6ImRyLX..."
  }
}
```

**Step 3: Open the URL in your browser**

Should see the same result as Step 3.

### 5. Test with Other Doctors

Available doctor IDs (from `src/data/doctors.ts`):
- `dr-rajkumar` - Pulmonologist
- `dr-neelima-dixit` - Ophthalmologist  
- `dr-divakar-chaudhari` - Neurosurgeon
- `dr-dheeraj-agrawal` - General Surgeon
- `dr-manish-agrawal` - Urologist

Try them all:
```
http://localhost:5173/?doctorId=dr-neelima-dixit&campaign=test
http://localhost:5173/?doctorId=dr-divakar-chaudhari&campaign=test
```

### 6. Test Error Handling

**Invalid doctor:**
```
http://localhost:5173/?doctorId=invalid-doctor&campaign=test
```
Should show error message.

**Expired signed link:**
Wait 10+ minutes after generating signed link, then try to use it. Should show "Link expired" error.

---

## 📱 Test on Mobile

Open the same URLs on your phone to test mobile responsiveness.

---

## 🧪 API Testing

### Generate Deeplink via API

```bash
curl -X POST http://localhost:5001/api/partners/deeplink \
  -H "Content-Type: application/json" \
  -d '{
    "hospitalId": "hospital-test-123",
    "doctorId": "dr-rajkumar",
    "expiresInSec": 600,
    "campaign": "test_api"
  }'
```

### Validate Signed Deeplink

```bash
# Replace {SIGNED_PAYLOAD} with actual signed value
curl "http://localhost:5001/api/booking/deeplink/validate?signed={SIGNED_PAYLOAD}"
```

### Batch Generate (Multiple Doctors)

```bash
curl -X POST http://localhost:5001/api/partners/deeplink/batch \
  -H "Content-Type: application/json" \
  -d '{
    "links": [
      {
        "hospitalId": "hospital-test-123",
        "doctorId": "dr-rajkumar",
        "campaign": "batch_test_1"
      },
      {
        "hospitalId": "hospital-test-123",
        "doctorId": "dr-neelima-dixit",
        "campaign": "batch_test_2"
      }
    ]
  }'
```

---

## 🎨 Test Hospital Integration Template

Open the ready-to-use template:

```bash
open public/hospital-integration-template.html
```

Or visit:
```
http://localhost:5173/hospital-integration-template.html
```

**Remember to update configuration in the HTML file:**
- Change `BOOKING_PLATFORM_URL` to your actual URL
- Update `HOSPITAL_ID`
- Customize doctor information

---

## 📊 View Analytics Events

Open browser console (F12) to see analytics events being logged:

```
[Analytics] deeplink_clicked {
  doctorId: "dr-rajkumar",
  source: "hospital_test",
  campaign: "test_campaign"
}
```

---

## ✅ Testing Checklist

- [ ] Simple deeplink opens modal correctly
- [ ] Signed deeplink works
- [ ] Doctor name appears in modal header
- [ ] Department is prefilled
- [ ] "Via Partner Hospital" badge shows
- [ ] Invalid doctor shows error
- [ ] Expired link shows error message
- [ ] Mobile responsive
- [ ] Analytics events fire
- [ ] URL clears after modal closes
- [ ] Can submit appointment form
- [ ] Backend API endpoints respond correctly

---

## 🚨 Common Issues

**Issue: Modal doesn't open**
- Check browser console for errors
- Verify doctor ID exists in `src/data/doctors.ts`
- Clear browser cache and reload

**Issue: "Invalid signature" error**
- Don't modify the signed URL
- Generate a fresh signed link
- Check `DEEPLINK_SECRET` is set correctly

**Issue: Backend not responding**
- Check backend is running on port 5001
- Verify `.env` file exists in backend folder
- Check backend console for errors

---

## 📚 Full Documentation

- **Partner Integration:** See `DEEPLINK_INTEGRATION_GUIDE.md`
- **Feature Summary:** See `DEEPLINK_FEATURE_SUMMARY.md`
- **API Reference:** See integration guide API section

---

## 💡 Next Steps After Testing

1. **Production Setup:**
   - Change `DEEPLINK_SECRET` in backend `.env`
   - Add partner authentication
   - Set up proper analytics tracking

2. **Partner Onboarding:**
   - Share integration guide with partner
   - Help them customize HTML template
   - Generate their hospital-specific links

3. **Monitor & Iterate:**
   - Track conversion rates
   - Gather partner feedback
   - Add enhancements as needed

---

**Happy Testing! 🎉**
