# Hospital Deeplink Booking Integration Guide

> **Quick Start**: Add "Book Appointment" buttons on your hospital website that redirect visitors directly to our booking platform with pre-selected doctors.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Integration Options](#integration-options)
3. [Option A: Simple Deeplinks (Quick Setup)](#option-a-simple-deeplinks-quick-setup)
4. [Option B: Signed Deeplinks (Secure)](#option-b-signed-deeplinks-secure)
5. [Testing Your Integration](#testing-your-integration)
6. [Analytics & Tracking](#analytics--tracking)
7. [Best Practices](#best-practices)
8. [Troubleshooting](#troubleshooting)
9. [API Reference](#api-reference)

---

## Overview

The deeplink booking integration allows partner hospital websites to redirect users to our main booking platform with:

✅ Pre-selected doctor/specialist  
✅ Auto-opened booking modal  
✅ Tracking of campaign source and conversions  
✅ Seamless user experience  
✅ Optional security via signed URLs  

---

## Integration Options

### Option A: Simple Deeplinks (Quick Setup)
- **Setup Time**: 5 minutes
- **Security**: Basic (URL parameters visible)
- **Best For**: Public-facing marketing campaigns, informational sites
- **No Backend Required**: Pure HTML/JavaScript

### Option B: Signed Deeplinks (Recommended for Production)
- **Setup Time**: 30 minutes
- **Security**: High (HMAC-signed, time-limited)
- **Best For**: Partner portals, trusted integrations
- **Requires**: Partner API access

---

## Option A: Simple Deeplinks (Quick Setup)

### 1. Get Your Doctor IDs

Contact your partner manager or check your partner portal for doctor IDs. Example format: `dr-rajkumar`, `dr-neelima-dixit`

### 2. Create Deeplink URLs

**Format:**
```
https://yourbookingsite.com/?doctorId={DOCTOR_ID}&source={SOURCE}&campaign={CAMPAIGN}
```

**Parameters:**
- `doctorId` (required): The unique doctor identifier
- `source` (optional): Tracking source (e.g., `hospital_rphospital`)
- `campaign` (optional): Campaign identifier (e.g., `homepage_cta`, `cardiology_promo`)

**Example URLs:**
```html
<!-- Single doctor booking -->
https://yourbookingsite.com/?doctorId=dr-rajkumar&source=hospital_rph&campaign=homepage_cta

<!-- With department context -->
https://yourbookingsite.com/?doctorId=dr-neelima-dixit&source=hospital_rph&campaign=ophthalmology_section
```

### 3. Add HTML Buttons

Copy-paste this snippet on your hospital website:

```html
<!-- Example 1: Simple text link -->
<a href="https://yourbookingsite.com/?doctorId=dr-rajkumar&source=hospital_rph&campaign=homepage" 
   class="book-appointment-btn">
  Book Appointment with Dr. Rajkumar
</a>

<!-- Example 2: Button with styling -->
<a href="https://yourbookingsite.com/?doctorId=dr-neelima-dixit&source=hospital_rph&campaign=eye_care" 
   style="display: inline-block; padding: 12px 24px; background-color: #F7941D; color: white; 
          text-decoration: none; border-radius: 8px; font-weight: bold;">
  🩺 Book Eye Checkup
</a>

<!-- Example 3: JavaScript button with tracking -->
<button onclick="bookAppointment('dr-rajkumar', 'cardiology_banner')">
  Book Cardiology Appointment
</button>

<script>
function bookAppointment(doctorId, campaign) {
  // Optional: Fire your own analytics event
  if (window.gtag) {
    gtag('event', 'deeplink_clicked', {
      doctor_id: doctorId,
      campaign: campaign,
    });
  }
  
  // Redirect to booking platform
  window.location.href = `https://yourbookingsite.com/?doctorId=${doctorId}&source=hospital_rph&campaign=${campaign}`;
}
</script>
```

### 4. Test Your Links

Open your deeplink URL in a browser. You should see:
1. The booking platform loads
2. Appointment modal auto-opens
3. Doctor information is pre-filled
4. User can complete booking

---

## Option B: Signed Deeplinks (Secure)

Signed deeplinks use HMAC-SHA256 to create tamper-proof, time-limited booking URLs.

### 1. Get API Access

Contact your partner manager to receive:
- Partner API endpoint: `https://api.yourbookingsite.com/api/partners`
- API authentication credentials
- Hospital ID

### 2. Generate Signed Deeplinks via API

**Endpoint:** `POST /api/partners/deeplink`

**Request:**
```bash
curl -X POST https://api.yourbookingsite.com/api/partners/deeplink \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "hospitalId": "hospital-rph-123",
    "doctorId": "dr-rajkumar",
    "clinicId": "clinic-main",
    "expiresInSec": 600,
    "campaign": "cardiology_homepage"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "signedUrl": "https://yourbookingsite.com/booking/deeplink?signed=eyJkb2N0b3JJZCI6ImRyLXJham...YWJjMTIz",
    "expiresAt": "2026-03-03T12:10:00Z",
    "expiresInSec": 600
  }
}
```

### 3. Use Signed URLs

Display the `signedUrl` in your HTML:

```html
<a href="{{signedUrl}}" class="book-appointment-btn">
  Book Appointment
</a>
```

### 4. Server-Side Example (Node.js)

If you have a backend, you can generate deeplinks server-side:

```javascript
// server.js (Node.js + Express example)
const express = require('express');
const fetch = require('node-fetch');

app.get('/generate-booking-link/:doctorId', async (req, res) => {
  const { doctorId } = req.params;
  
  try {
    const response = await fetch('https://api.yourbookingsite.com/api/partners/deeplink', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.PARTNER_API_KEY}`,
      },
      body: JSON.stringify({
        hospitalId: 'hospital-rph-123',
        doctorId: doctorId,
        expiresInSec: 600,
        campaign: req.query.campaign || 'website',
      }),
    });
    
    const data = await response.json();
    res.json({ bookingUrl: data.data.signedUrl });
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate booking link' });
  }
});
```

### 5. Batch Generation

Generate multiple deeplinks at once:

**Endpoint:** `POST /api/partners/deeplink/batch`

```bash
curl -X POST https://api.yourbookingsite.com/api/partners/deeplink/batch \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "links": [
      {
        "hospitalId": "hospital-rph-123",
        "doctorId": "dr-rajkumar",
        "campaign": "cardiology"
      },
      {
        "hospitalId": "hospital-rph-123",
        "doctorId": "dr-neelima-dixit",
        "campaign": "ophthalmology"
      }
    ]
  }'
```

---

## Testing Your Integration

### 1. Development Test Endpoint

For testing during development:

```bash
curl https://api.yourbookingsite.com/api/partners/deeplink/test
```

This returns a test deeplink you can open in your browser.

### 2. Manual Testing Checklist

- [ ] Click deeplink → Booking platform loads
- [ ] Appointment modal opens automatically
- [ ] Correct doctor information is displayed
- [ ] User can fill and submit appointment form
- [ ] Success message appears after submission
- [ ] For signed links: Link expires after timeout period
- [ ] For signed links: Tampered link shows error message

### 3. Test Different Scenarios

```html
<!-- Test 1: Valid doctor -->
https://yourbookingsite.com/?doctorId=dr-rajkumar&campaign=test1

<!-- Test 2: With UTM parameters -->
https://yourbookingsite.com/?doctorId=dr-rajkumar&campaign=test2&utm_source=hospital&utm_medium=website

<!-- Test 3: Invalid doctor (should show fallback) -->
https://yourbookingsite.com/?doctorId=invalid-doctor-123&campaign=test3
```

---

## Analytics & Tracking

### Built-in Tracking Parameters

All deeplinks automatically track:
- `source`: Where the user came from (e.g., `hospital_rph`)
- `campaign`: Which campaign/page triggered the link
- `doctorId`: Which doctor was selected
- Conversion events (link clicked, booking completed)

### UTM Parameters

Add standard UTM parameters for your own analytics:

```
https://yourbookingsite.com/?doctorId=dr-rajkumar
  &source=hospital_rph
  &campaign=cardiology
  &utm_source=partner_hospital
  &utm_medium=website
  &utm_campaign=march_promo
```

### Google Analytics Integration

Track deeplink clicks in your GA:

```html
<script>
function trackAndRedirect(doctorId, campaign) {
  // Google Analytics event
  gtag('event', 'booking_deeplink_click', {
    'event_category': 'Booking',
    'event_label': doctorId,
    'campaign_name': campaign,
  });
  
  // Redirect after short delay
  setTimeout(() => {
    window.location.href = `https://yourbookingsite.com/?doctorId=${doctorId}&campaign=${campaign}`;
  }, 100);
}
</script>

<button onclick="trackAndRedirect('dr-rajkumar', 'homepage')">
  Book Now
</button>
```

---

## Best Practices

### 1. Link Expiry
- Use **10 minutes** (600 seconds) for time-sensitive campaigns
- Use **24 hours** (86400 seconds) for email campaigns
- Never exceed 7 days

### 2. Campaign Naming
Use descriptive, consistent campaign names:
- ✅ Good: `homepage_cta`, `cardiology_banner`, `email_march_2026`
- ❌ Bad: `test`, `link1`, `abc`

### 3. User Experience
- Open links in **same tab** (not new window) for seamless flow
- Show loading indicator if generating signed link takes time
- Provide fallback contact info if link fails

### 4. Mobile Optimization
- Ensure buttons are **tap-friendly** (min 44x44px)
- Test on iOS Safari and Android Chrome
- Consider deep-linking to mobile app if available

### 5. Performance
- Cache signed URLs if possible (respect expiry time)
- Use batch API for generating multiple links
- Load deeplink generation asynchronously

---

## Troubleshooting

### Problem: Link doesn't open booking modal

**Solutions:**
- Verify doctor ID is correct (check with partner manager)
- Ensure URL format is exactly: `?doctorId=xxx` (not `#doctorId` or `/doctorId`)
- Check browser console for JavaScript errors
- Clear browser cache and try again

### Problem: "Link expired" error (signed links)

**Solutions:**
- Check the `expiresAt` timestamp
- Regenerate a fresh signed link
- Increase `expiresInSec` parameter when generating

### Problem: "Invalid signature" error (signed links)

**Solutions:**
- Don't modify the signed URL (copy it exactly)
- Check if URL was truncated (e.g., in SMS/email)
- Regenerate the link from API

### Problem: Wrong doctor appears

**Solutions:**
- Verify doctor ID matches your hospital's roster
- Check for typos in doctor ID parameter
- Contact support to verify doctor ID mapping

### Problem: Tracking not working

**Solutions:**
- Verify `source` and `campaign` parameters are included
- Check that partner analytics integration is enabled
- Wait 24-48 hours for data to appear in reports

---

## API Reference

### Generate Signed Deeplink

**POST** `/api/partners/deeplink`

**Headers:**
```
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY
```

**Request Body:**
```typescript
{
  hospitalId: string;      // Your hospital ID (required)
  doctorId: string;        // Target doctor ID (required)
  clinicId?: string;       // Optional clinic/location ID
  expiresInSec?: number;   // Expiry time 60-86400 (default: 600)
  campaign?: string;       // Campaign identifier (max 100 chars)
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    signedUrl: string;     // Full deeplink URL
    expiresAt: string;     // ISO 8601 timestamp
    expiresInSec: number;  // Seconds until expiry
  }
}
```

**Error Codes:**
- `400` - Invalid request parameters
- `401` - Unauthorized (invalid API key)
- `429` - Rate limit exceeded
- `500` - Server error

---

### Batch Generate Deeplinks

**POST** `/api/partners/deeplink/batch`

**Request Body:**
```typescript
{
  links: Array<{
    hospitalId: string;
    doctorId: string;
    clinicId?: string;
    expiresInSec?: number;
    campaign?: string;
  }>  // Max 100 items
}
```

**Response:**
```typescript
{
  success: boolean;
  data: {
    results: Array<{
      success: boolean;
      doctorId: string;
      signedUrl?: string;
      expiresAt?: string;
      error?: string;
    }>;
    totalRequested: number;
    successful: number;
    failed: number;
  }
}
```

---

### Validate Signed Deeplink

**GET** `/api/booking/deeplink/validate?signed={SIGNED_PAYLOAD}`

**Response (Success):**
```typescript
{
  success: boolean;
  data: {
    doctorId: string;
    clinicId?: string;
    hospitalId: string;
    campaign?: string;
    source: string;
  }
}
```

**Response (Error):**
```typescript
{
  success: false;
  error: {
    code: "DEEPLINK_EXPIRED" | "INVALID_SIGNATURE" | "INVALID_DEEPLINK";
    message: string;
  }
}
```

---

## Support

**Partner Support:**  
📧 Email: partners@yourbookingsite.com  
📞 Phone: +91-XXX-XXX-XXXX  
💬 Partner Portal: https://partners.yourbookingsite.com

**Documentation:**  
🔗 https://docs.yourbookingsite.com/deeplinks

**Office Hours:**  
Monday-Friday, 9 AM - 6 PM IST

---

## Frequently Asked Questions

**Q: Can I use deeplinks in SMS/WhatsApp?**  
A: Yes! Use signed deeplinks to ensure security. Keep URLs under 200 characters for SMS.

**Q: Do deeplinks work on mobile apps?**  
A: Currently web-only. Mobile app deep-linking coming soon.

**Q: Can I customize the booking form?**  
A: Doctor/department can be prefilled. Full customization available for enterprise partners.

**Q: How do I track conversion rates?**  
A: Access your partner portal dashboard to view click-through and booking completion rates by campaign.

**Q: Is there a rate limit?**  
A: 100 requests/minute for deeplink generation. Contact us for higher limits.

**Q: Can I generate deeplinks offline?**  
A: For signed links, no (requires API call). Simple links can be generated offline.

---

**Last Updated:** March 2026  
**Version:** 1.0.0
