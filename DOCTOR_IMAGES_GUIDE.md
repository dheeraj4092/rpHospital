# 👨‍⚕️ Doctor Images Guide - Local Loading Only

## 📸 Overview

Doctor photos are loaded **locally from the `/public` folder** - simple, fast, and reliable!

**No backend storage • No external URLs • Just local files**

---

## ✨ 3-Step Process

### 1️⃣ Add Image to `/public` Folder
```bash
# Copy doctor photo to public directory
cp /path/to/photo.jpg public/dr-doctor-name.png
```

**Naming:** `dr-firstname-lastname.png` (lowercase with hyphens)

### 2️⃣ Update Backend Data
Edit `backend/src/data/store.ts`:
```typescript
const doctor: Doctor = {
  name: 'Dr. Doctor Name',
  // ... other fields
  photoUrl: '/dr-doctor-name.png', // ← Start with / for public folder
  // ...
};
```

### 3️⃣ Restart Backend Server
```bash
cd backend
npm run dev
```

**Done!** Photo loads automatically. 🎉

---

## 📝 Example: Adding Dr. Vanitha's Photo

```bash
# 1. Copy image
cp ~/Downloads/vanitha-photo.jpg public/dr-vanitha.png

# 2. Edit backend/src/data/store.ts
# Find doctor2 object and update:
photoUrl: '/dr-vanitha.png',

# 3. Restart backend
cd backend
npm run dev
```

Open website → Dr. Vanitha's photo appears!

---

## 📁 File Structure

```
rkhospital/
├── public/                      # ← Doctor photos go here
│   ├── dr-rajendraprasad.png   # ✅ Already exists
│   ├── dr-vanitha.png          # Add for Dr. Vanitha
│   └── dr-john-smith.png       # Add more doctors
│
└── backend/src/data/store.ts   # ← Update photoUrl here
```

---

## 🎯 Image Requirements

✅ **Do:**
- Use professional headshots
- Size: 400x400px to 800x800px
- Under 500KB file size
- PNG or JPG format
- Lowercase naming: `dr-name.png`
- Square or portrait orientation

❌ **Don't:**
- Large files (>1MB)
- Casual photos
- Special characters in filename
- Very small images (<300px)

---

## �️ No Photo? No Problem!

If photo is missing, the system shows:
- **Initials** of doctor's name
- **Styled background** (brand colors)
- **Professional appearance**

Example: `Dr. Vanitha A` → Shows **"VA"**

---

## ✅ Current Status

| Doctor | Photo File | Status |
|--------|-----------|--------|
| Dr. Rajendra Prasad Boddula | `/dr-rajendraprasad.png` | ✅ Available |
| Dr. Vanitha A | `/dr-vanitha.png` | ⚠️ Add photo |

---

## 🔍 Verifying Changes

After adding an image:

1. **Check file exists:**
   ```bash
   ls -lh public/dr-*.png
   ```

2. **Restart backend** (data loads on startup)

3. **Open website:** http://localhost:5176/

4. **Check Doctors section** - Image displays

5. **Browser console** - No 404 errors

---

## 💡 Tips

1. **Compress images:** Use [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
2. **Crop to square:** Focus on face and upper body
3. **Good lighting:** Professional photos work best
4. **Consistent style:** Similar backgrounds for all doctors
5. **Keep originals:** Save high-res versions separately

### Quick Optimization
```bash
# Resize and compress (requires ImageMagick)
convert input.jpg -resize 600x600^ -gravity center \
  -extent 600x600 -quality 85 public/dr-name.png
```

---

## 🚨 Troubleshooting

### Photo Not Showing?
- ✅ File exists in `/public/dr-name.png`
- ✅ Filename matches in `store.ts`
- ✅ Path starts with `/` (not `./`)
- ✅ Backend restarted
- ✅ Browser hard refresh (Cmd+Shift+R)

### Photo Looks Bad?
- ✅ Increase resolution (min 400x400px)
- ✅ Use square/portrait orientation
- ✅ Better lighting in original
- ✅ Try different photo

---

## 🔄 Updating Photos

**Same filename (easiest):**
1. Replace file in `/public` folder
2. Hard refresh browser
3. Done!

**New filename:**
1. Add to `/public`
2. Update `photoUrl` in backend
3. Restart backend

---

## 💾 System Details

**Storage:** Local `/public` folder  
**Serving:** Vite dev server  
**Database:** In-memory backend  
**Method:** Traditional file serving  

**Simple, fast, reliable!** ✨
