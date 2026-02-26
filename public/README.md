# Doctor Images Directory

This folder contains doctor profile images that are displayed on the website.

## 📸 Image Guidelines

### Requirements:
- **Format:** JPG, PNG, or WebP
- **Size:** 800x600px recommended (aspect ratio ~4:3)
- **File Size:** Keep under 500KB for optimal performance
- **Quality:** Professional headshot with clean background

### Naming Convention:
Use lowercase with hyphens:
```
dr-firstname-lastname.jpg
```

**Examples:**
- `dr-rajendra-prasad.jpg` ✅
- `dr-vanitha.jpg` ✅
- `DR_John_Doe.JPG` ❌ (use lowercase and hyphens)

---

## 🚀 How to Add a New Doctor Image

### Step 1: Add the Image File
Place the doctor's photo in this folder:
```bash
# Example: Adding Dr. Vanitha's photo
cp /path/to/vanitha-photo.jpg public/dr-vanitha.jpg
```

### Step 2: Update Backend Data
Edit `backend/src/data/store.ts` and set the `photoUrl`:

```typescript
const doctor: Doctor = {
  name: 'Dr. Vanitha A',
  // ... other fields
  photoUrl: '/dr-vanitha.jpg', // ← Update this line
  // ... rest of fields
};
```

### Step 3: Restart Backend
```bash
cd backend
npm run dev
```

The image will now appear on the website!

---

## 📋 Current Images

| File | Doctor | Status |
|------|--------|--------|
| `dr-rajendra-prasad.jpg` | Dr. Rajendra Prasad Boddula | ✅ Active |
| `dr-vanitha.jpg` | Dr. Vanitha A | ⏳ Pending |

---

## 💡 Tips

1. **Image Optimization:** Use tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/) to compress images before uploading

2. **Consistent Style:** Try to maintain consistent photo style:
   - Similar backgrounds
   - Similar lighting
   - Professional attire
   - Head and shoulders framing

3. **Fallback Display:** If no image is provided, the system automatically shows the doctor's initials in a colored circle

4. **Cache Busting:** If you replace an image with the same name, you may need to hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)

---

## 🔄 Future Enhancements

For a more dynamic system, consider implementing:
- Upload API endpoint with multer middleware
- Image processing/resizing on upload
- Cloud storage (Cloudinary, AWS S3)
- Admin panel for managing images

For now, the traditional method keeps things simple and maintainable.
