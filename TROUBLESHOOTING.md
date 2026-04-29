# 🔧 CBT Platform - Troubleshooting Guide

## Common Issues & Solutions

### Issue 1: "Cannot find module" errors

**Symptoms:**
- Import errors in console
- Red underlines in VS Code
- Build fails

**Solutions:**
1. Delete `node_modules` and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

2. Restart VS Code TypeScript server:
- Press `Ctrl+Shift+P` (Windows) or `Cmd+Shift+P` (Mac)
- Type "TypeScript: Restart TS Server"
- Press Enter

---

### Issue 2: Login doesn't redirect to dashboard

**Symptoms:**
- Click "Sign in" but nothing happens
- Stay on login page
- No errors in console

**Solutions:**
1. Check browser console for errors (F12)
2. Verify auth store is working:
```javascript
// In browser console:
localStorage.getItem('auth-storage')
```

3. Clear browser cache and localStorage:
```javascript
// In browser console:
localStorage.clear()
// Then refresh page
```

4. Check if user is being set:
```javascript
// Add console.log in LoginPage.tsx after login:
console.log("User logged in:", mockUser)
```

---

### Issue 3: Sidebar or Topbar not showing

**Symptoms:**
- Dashboard loads but no sidebar
- No topbar visible
- Just blank page

**Solutions:**
1. Check if DashboardLayout is being used:
- Open browser DevTools (F12)
- Check Elements tab
- Look for sidebar and topbar elements

2. Verify route configuration:
- Check `src/router/index.tsx`
- Ensure DashboardLayout is wrapping the route

3. Check CSS:
- Verify `src/index.css` is loaded
- Check for CSS conflicts
- Inspect element styles in DevTools

---

### Issue 4: Build takes too long or hangs

**Symptoms:**
- `npm run build` runs forever
- Terminal shows spinning indicator
- No progress after 5 minutes

**Solutions:**
1. Cancel and try again:
```bash
# Press Ctrl+C to cancel
# Then run again:
npm run build
```

2. Clear build cache:
```bash
rm -rf dist
rm -rf node_modules/.vite
npm run build
```

3. Check for circular dependencies:
```bash
npx madge --circular src
```

4. Increase Node memory:
```bash
# Windows:
set NODE_OPTIONS=--max-old-space-size=4096
npm run build

# Mac/Linux:
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

---

### Issue 5: TypeScript errors in VS Code

**Symptoms:**
- Red squiggly lines everywhere
- "Cannot find name" errors
- Type errors

**Solutions:**
1. Restart TypeScript server (see Issue 1)

2. Check tsconfig.json is correct

3. Verify all dependencies are installed:
```bash
npm install
```

4. Check import paths use `@/` alias:
```typescript
// Correct:
import { useAuthStore } from "@/stores/auth.store"

// Wrong:
import { useAuthStore } from "../stores/auth.store"
```

---

### Issue 6: CSS variables not working

**Symptoms:**
- Colors look wrong
- Default browser colors showing
- No green/orange theme

**Solutions:**
1. Verify `src/index.css` has CSS variables:
```css
:root {
  --primary: 141 78% 29%;
  --accent: 33 100% 50%;
  /* ... etc */
}
```

2. Check Tailwind is configured:
```bash
# Verify tailwind.config.js exists
ls tailwind.config.js
```

3. Restart dev server:
```bash
# Press Ctrl+C
npm run dev
```

4. Clear browser cache (Ctrl+Shift+Delete)

---

### Issue 7: "Access denied" or wrong dashboard

**Symptoms:**
- Login as Student but see Teacher dashboard
- Can't access certain pages
- Redirected to wrong page

**Solutions:**
1. Check role is set correctly:
```javascript
// In browser console:
const auth = JSON.parse(localStorage.getItem('auth-storage'))
console.log(auth.state.user.role)
```

2. Clear auth and login again:
```javascript
localStorage.clear()
// Refresh and login again
```

3. Verify PrivateRoute is checking role correctly:
- Check `src/router/guards.tsx`
- Ensure role comparison is correct

---

### Issue 8: Hot reload not working

**Symptoms:**
- Make changes but page doesn't update
- Need to manually refresh
- Changes don't appear

**Solutions:**
1. Check Vite dev server is running:
```bash
# Should see:
# VITE v8.x.x ready in xxx ms
# ➜ Local: http://localhost:5173/
```

2. Restart dev server:
```bash
# Press Ctrl+C
npm run dev
```

3. Check file is saved (Ctrl+S)

4. Try hard refresh:
- Windows: Ctrl+Shift+R
- Mac: Cmd+Shift+R

---

### Issue 9: Demo mode not working

**Symptoms:**
- Mock data not loading
- API calls failing
- Real API errors

**Solutions:**
1. Check MSW is initialized:
```javascript
// In browser console, should see:
// [MSW] Mocking enabled.
```

2. Verify `.env` file:
```env
VITE_DEMO_MODE=true
```

3. Check MSW worker is registered:
- Open DevTools > Application > Service Workers
- Should see MSW worker

4. Restart dev server after changing .env

---

### Issue 10: Page is blank/white screen

**Symptoms:**
- Nothing shows on page
- Just white screen
- No errors visible

**Solutions:**
1. Open browser console (F12):
- Look for red error messages
- Check Console tab

2. Common causes:
- JavaScript error (check console)
- Missing component import
- Syntax error in JSX

3. Check React DevTools:
- Install React DevTools extension
- Check component tree
- Look for error boundaries

4. Verify main.tsx is correct:
```typescript
// Should have:
ReactDOM.createRoot(document.getElementById("root")!)
```

---

## Quick Fixes

### Clear Everything and Start Fresh
```bash
# 1. Stop dev server (Ctrl+C)

# 2. Clear all caches
rm -rf node_modules
rm -rf dist
rm -rf .vite
rm package-lock.json

# 3. Reinstall
npm install

# 4. Start dev server
npm run dev

# 5. Clear browser cache (Ctrl+Shift+Delete)

# 6. Hard refresh (Ctrl+Shift+R)
```

### Reset Auth State
```javascript
// In browser console:
localStorage.clear()
sessionStorage.clear()
// Then refresh page
```

### Check All Services Running
```bash
# Dev server should show:
VITE v8.x.x ready in xxx ms
➜ Local: http://localhost:5173/
➜ Network: use --host to expose

# If not, restart:
npm run dev
```

---

## Debugging Tips

### 1. Use Console Logs
```typescript
// Add to components:
console.log("Component rendered", { user, role, path })
```

### 2. Use React DevTools
- Install React DevTools browser extension
- Inspect component props and state
- Check component hierarchy

### 3. Use Network Tab
- Open DevTools > Network
- Check API calls (should be mocked by MSW)
- Look for 404 or 500 errors

### 4. Use Breakpoints
- Open DevTools > Sources
- Click line number to add breakpoint
- Refresh page to trigger breakpoint

### 5. Check File Paths
```typescript
// Verify imports use correct paths:
import { Component } from "@/components/Component" // ✅
import { Component } from "../components/Component" // ❌
```

---

## Getting Help

### Before Asking for Help:
1. ✅ Check this troubleshooting guide
2. ✅ Check browser console for errors
3. ✅ Try clearing cache and restarting
4. ✅ Verify all files are saved
5. ✅ Check you're on the right branch

### When Asking for Help, Include:
1. Error message (full text)
2. Browser console screenshot
3. What you were trying to do
4. What you expected to happen
5. What actually happened
6. Steps to reproduce

---

## Useful Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting errors
npm run lint

# Clear all caches
rm -rf node_modules dist .vite package-lock.json

# Reinstall dependencies
npm install

# Update dependencies
npm update
```

---

## Browser DevTools Shortcuts

### Windows:
- Open DevTools: `F12` or `Ctrl+Shift+I`
- Console: `Ctrl+Shift+J`
- Hard Refresh: `Ctrl+Shift+R`
- Clear Cache: `Ctrl+Shift+Delete`

### Mac:
- Open DevTools: `Cmd+Option+I`
- Console: `Cmd+Option+J`
- Hard Refresh: `Cmd+Shift+R`
- Clear Cache: `Cmd+Shift+Delete`

---

*Last Updated: April 25, 2026*
*If issue persists, check IMPLEMENTATION_COMPLETE.md for setup instructions*
